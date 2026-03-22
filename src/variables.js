module.exports = function (self) {
	self.setVariableDefinitions([
		// Device
		{ variableId: 'device_name', name: 'Device Name' },

		// mpv / Video
		{ variableId: 'mpv_alive', name: 'Video Player: Process Alive (true/false)' },
		{ variableId: 'mpv_playing', name: 'Video Player: Stream Playing (true/false)' },
		{ variableId: 'mpv_idle', name: 'Video Player: Idle (true/false)' },
		{ variableId: 'mpv_stream_url', name: 'Video Player: Stream URL' },

		// PCO Overlay
		{ variableId: 'overlay_enabled', name: 'Overlay: Enabled (true/false)' },
		{ variableId: 'overlay_is_live', name: 'Overlay: PCO Service Is Live (true/false)' },
		{ variableId: 'overlay_finished', name: 'Overlay: Service Finished / Overtime (true/false)' },
		{ variableId: 'overlay_countdown', name: 'Overlay: Countdown Timer (HH:MM:SS)' },
		{ variableId: 'overlay_plan_title', name: 'Overlay: PCO Plan Title' },
		{ variableId: 'overlay_item_title', name: 'Overlay: PCO Item Title' },
		{ variableId: 'overlay_message', name: 'Overlay: Overlay Message' },

		// System
		{ variableId: 'system_cpu_percent', name: 'System: CPU Usage %' },
		{ variableId: 'system_memory_percent', name: 'System: Memory Usage %' },
		{ variableId: 'system_temperature', name: 'System: CPU Temperature °C' },
		{ variableId: 'system_uptime', name: 'System: Uptime' },

		// Network
		{ variableId: 'network_connection_type', name: 'Network: Connection Type (ethernet/wifi/hotspot/none)' },
		{ variableId: 'network_ip', name: 'Network: IP Address' },
		{ variableId: 'network_ssid', name: 'Network: WiFi SSID' },
		{ variableId: 'network_signal', name: 'Network: WiFi Signal Strength' },
	])
}

