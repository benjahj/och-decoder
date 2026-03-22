module.exports = function (self) {
	self.setActionDefinitions({
		// ── CEC TV Control ───────────────────────────────────────────────────────
		cec_tv_on: {
			name: 'CEC: TV Power On',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/on')
					self.log('debug', 'CEC: TV powered on')
				} catch (e) {
					self.log('error', `CEC TV On failed: ${e.message}`)
				}
			},
		},

		cec_tv_standby: {
			name: 'CEC: TV Standby (Off)',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/standby')
					self.log('debug', 'CEC: TV standby')
				} catch (e) {
					self.log('error', `CEC TV Standby failed: ${e.message}`)
				}
			},
		},

		cec_active_source: {
			name: 'CEC: Switch TV to Pi Input',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/active-source')
					self.log('debug', 'CEC: switched to Pi input')
				} catch (e) {
					self.log('error', `CEC active-source failed: ${e.message}`)
				}
			},
		},

		cec_switch_input: {
			name: 'CEC: Switch to HDMI Port',
			options: [
				{
					id: 'port',
					type: 'number',
					label: 'HDMI Port (1–4)',
					default: 1,
					min: 1,
					max: 4,
				},
			],
			callback: async (event) => {
				try {
					await self.apiPost('/api/cec/input', { port: event.options.port })
					self.log('debug', `CEC: switched to HDMI port ${event.options.port}`)
				} catch (e) {
					self.log('error', `CEC switch input failed: ${e.message}`)
				}
			},
		},

		cec_volume_up: {
			name: 'CEC: Volume Up',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/volume-up')
				} catch (e) {
					self.log('error', `CEC volume-up failed: ${e.message}`)
				}
			},
		},

		cec_volume_down: {
			name: 'CEC: Volume Down',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/volume-down')
				} catch (e) {
					self.log('error', `CEC volume-down failed: ${e.message}`)
				}
			},
		},

		cec_mute: {
			name: 'CEC: Toggle Mute',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/cec/mute')
				} catch (e) {
					self.log('error', `CEC mute failed: ${e.message}`)
				}
			},
		},

		// ── Video Controls ───────────────────────────────────────────────────────
		video_stop: {
			name: 'Video: Stop Playback',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/stop/video')
					self.log('debug', 'Video stopped')
				} catch (e) {
					self.log('error', `Stop video failed: ${e.message}`)
				}
			},
		},

		video_restart: {
			name: 'Video: Restart Player',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/restart/video')
					self.log('debug', 'Video player restarted')
				} catch (e) {
					self.log('error', `Restart video failed: ${e.message}`)
				}
			},
		},

		overlay_restart: {
			name: 'Overlay: Restart PCO Overlay',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/restart/overlay')
					self.log('debug', 'Overlay restarted')
				} catch (e) {
					self.log('error', `Restart overlay failed: ${e.message}`)
				}
			},
		},

		restart_all: {
			name: 'Video + Overlay: Restart All',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/restart/all')
					self.log('debug', 'Restarted video + overlay')
				} catch (e) {
					self.log('error', `Restart all failed: ${e.message}`)
				}
			},
		},

		// ── System ───────────────────────────────────────────────────────────────
		system_reboot: {
			name: 'System: Reboot Pi (~90s downtime)',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/reboot')
					self.log('warn', 'Pi reboot initiated')
				} catch (e) {
					self.log('error', `Reboot failed: ${e.message}`)
				}
			},
		},

		system_shutdown: {
			name: 'System: Shutdown Pi',
			options: [],
			callback: async () => {
				try {
					await self.apiPost('/api/shutdown')
					self.log('warn', 'Pi shutdown initiated')
				} catch (e) {
					self.log('error', `Shutdown failed: ${e.message}`)
				}
			},
		},
	})
}

