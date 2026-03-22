const { combineRgb } = require('@companion-module/base')

module.exports = function (self) {
	self.setFeedbackDefinitions({
		// ── Stream / mpv ─────────────────────────────────────────────────────────
		mpv_playing: {
			name: 'Stream: Is Playing',
			type: 'boolean',
			label: 'Stream is active/playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.mpv?.playing === true
			},
		},

		mpv_idle: {
			name: 'Stream: Is Idle / Stopped',
			type: 'boolean',
			label: 'Stream is idle or not playing',
			defaultStyle: {
				bgcolor: combineRgb(200, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.mpv?.idle === true
			},
		},

		mpv_alive: {
			name: 'Video Player: Process Alive',
			type: 'boolean',
			label: 'mpv process is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 120, 220),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.mpv?.alive === true
			},
		},

		// ── PCO Overlay ──────────────────────────────────────────────────────────
		overlay_is_live: {
			name: 'PCO Overlay: Service Is Live',
			type: 'boolean',
			label: 'Planning Center reports a live service',
			defaultStyle: {
				bgcolor: combineRgb(220, 120, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.overlay?.is_live === true
			},
		},

		overlay_enabled: {
			name: 'PCO Overlay: Overlay Enabled',
			type: 'boolean',
			label: 'PCO overlay is enabled in config',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 180),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.overlay?.enabled === true
			},
		},

		overlay_finished: {
			name: 'PCO Overlay: Service Finished',
			type: 'boolean',
			label: 'PCO service has finished (overtime)',
			defaultStyle: {
				bgcolor: combineRgb(180, 0, 180),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status?.overlay?.finished === true
			},
		},

		// ── Network ──────────────────────────────────────────────────────────────
		network_connection_type: {
			name: 'Network: Connection Type Matches',
			type: 'boolean',
			label: 'Network connection type is the selected value',
			defaultStyle: {
				bgcolor: combineRgb(0, 80, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'Connection Type',
					default: 'ethernet',
					choices: [
						{ id: 'ethernet', label: 'Ethernet' },
						{ id: 'wifi', label: 'WiFi' },
						{ id: 'hotspot', label: 'Hotspot' },
						{ id: 'none', label: 'None' },
					],
				},
			],
			callback: (feedback) => {
				return self.state?.status?.network?.connection_type === feedback.options.type
			},
		},

		// ── CEC ──────────────────────────────────────────────────────────────────
		cec_tv_power: {
			name: 'CEC: TV Power Status',
			type: 'boolean',
			label: 'TV power state matches selected value',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'status',
					type: 'dropdown',
					label: 'Expected TV Power Status',
					default: 'on',
					choices: [
						{ id: 'on', label: 'On' },
						{ id: 'standby', label: 'Standby' },
						{ id: 'unknown', label: 'Unknown' },
					],
				},
			],
			callback: (feedback) => {
				return self.state?.cec?.status === feedback.options.status
			},
		},

		// ── Connection ───────────────────────────────────────────────────────────
		connection_ok: {
			name: 'Connection: Pi-Decoder Reachable',
			type: 'boolean',
			label: 'Module can reach the Pi-Decoder',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state?.status !== null && self.state?.status !== undefined
			},
		},
	})
}

