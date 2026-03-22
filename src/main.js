const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.pollTimer = null
		this.cecPollTimer = null
		this.state = {}
	}

	async init(config) {
		this.config = config
		this.state = {}

		this.updateStatus(InstanceStatus.Connecting)
		this.updateActions()
		this.updateFeedbacks()
		this.updateVariableDefinitions()

		this.startPolling()
	}

	async destroy() {
		this.stopPolling()
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		this.stopPolling()
		this.startPolling()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Host (IP or hostname)',
				width: 8,
				default: '192.168.1.100',
				regex: Regex.HOSTNAME,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Port',
				width: 4,
				default: '80',
				regex: Regex.PORT,
			},
			{
				type: 'number',
				id: 'poll_interval',
				label: 'Poll Interval (seconds)',
				width: 4,
				default: 3,
				min: 1,
				max: 60,
			},
		]
	}

	baseUrl() {
		const host = this.config?.host || '192.168.1.100'
		const port = this.config?.port || '80'
		return `http://${host}:${port}`
	}

	async apiGet(path) {
		const url = `${this.baseUrl()}${path}`
		const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
		if (!response.ok) throw new Error(`HTTP ${response.status}`)
		return response.json()
	}

	async apiPost(path, body = null) {
		const url = `${this.baseUrl()}${path}`
		const opts = {
			method: 'POST',
			signal: AbortSignal.timeout(5000),
		}
		if (body) {
			opts.headers = { 'Content-Type': 'application/json' }
			opts.body = JSON.stringify(body)
		}
		const response = await fetch(url, opts)
		if (!response.ok) throw new Error(`HTTP ${response.status}`)
		return response.json()
	}

	startPolling() {
		if (!this.config?.host) {
			this.updateStatus(InstanceStatus.BadConfig, 'Host not configured')
			return
		}

		const intervalMs = (this.config?.poll_interval || 3) * 1000

		// Main status poll
		this.pollTimer = setInterval(() => this.pollStatus(), intervalMs)
		this.pollStatus() // poll immediately on start

		// CEC power status poll every 10s (avoid CEC bus congestion)
		this.cecPollTimer = setInterval(() => this.pollCecStatus(), 10000)
		this.pollCecStatus()
	}

	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer)
			this.pollTimer = null
		}
		if (this.cecPollTimer) {
			clearInterval(this.cecPollTimer)
			this.cecPollTimer = null
		}
	}

	async pollStatus() {
		try {
			const data = await this.apiGet('/api/status')
			this.updateStatus(InstanceStatus.Ok)
			this.state.status = data
			this.updateVariables(data)
			this.checkFeedbacks()
		} catch (err) {
			this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			this.state.status = null
		}
	}

	async pollCecStatus() {
		try {
			const data = await this.apiGet('/api/cec/power-status')
			this.state.cec = data
			this.checkFeedbacks('cec_tv_power')
		} catch (_) {
			this.state.cec = null
		}
	}

	updateVariables(data) {
		const vals = {
			mpv_alive: String(data?.mpv?.alive ?? ''),
			mpv_playing: String(data?.mpv?.playing ?? ''),
			mpv_idle: String(data?.mpv?.idle ?? ''),
			mpv_stream_url: String(data?.mpv?.stream_url ?? ''),
			overlay_enabled: String(data?.overlay?.enabled ?? ''),
			overlay_is_live: String(data?.overlay?.is_live ?? ''),
			overlay_finished: String(data?.overlay?.finished ?? ''),
			overlay_countdown: String(data?.overlay?.countdown ?? ''),
			overlay_plan_title: String(data?.overlay?.plan_title ?? ''),
			overlay_item_title: String(data?.overlay?.item_title ?? ''),
			overlay_message: String(data?.overlay?.message ?? ''),
			system_cpu_percent: String(data?.system?.cpu_percent ?? ''),
			system_memory_percent: String(data?.system?.memory_percent ?? ''),
			system_temperature: String(data?.system?.temperature ?? ''),
			system_uptime: String(data?.system?.uptime ?? ''),
			network_connection_type: String(data?.network?.connection_type ?? ''),
			network_ip: String(data?.network?.ip ?? ''),
			network_ssid: String(data?.network?.ssid ?? ''),
			network_signal: String(data?.network?.signal ?? ''),
			device_name: String(data?.name ?? ''),
		}
		this.setVariableValues(vals)
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)

