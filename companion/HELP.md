# OCH Pi-Decoder

Control and monitor a [OCH Pi-Decoder](https://github.com/albin-user/och-pi-decoder) — a Raspberry Pi-based video decoder with Planning Center Online (PCO) countdown overlay integration.

## Configuration

| Field | Description |
|-------|-------------|
| **Host** | IP address or hostname of the Pi-Decoder (e.g. `192.168.1.100` or `pi-decoder.local`) |
| **Port** | Web server port (default: `80`) |
| **Poll Interval** | How often to fetch status in seconds (default: `3`) |

## Actions

### Video Control
- **Stop Video** — Stop playback and show idle screen
- **Restart Video** — Restart the video player process
- **Restart Overlay** — Restart the PCO overlay updater
- **Restart All** — Restart both video player and overlay

### CEC TV Control (via HDMI)
- **TV Power On** — Power on the TV
- **TV Standby** — Put the TV in standby
- **Switch to Pi Input** — Switch TV to the Pi's HDMI input
- **Switch HDMI Port** — Switch TV to a specific HDMI port (1–4)
- **Volume Up** — TV volume up
- **Volume Down** — TV volume down
- **Mute Toggle** — Toggle TV mute

### System
- **Reboot Pi** — Reboot the Raspberry Pi (~90 s downtime)
- **Shutdown Pi** — Shut down the Pi (requires physical access to restart)

## Feedbacks

- **Stream Playing** — Green when video stream is active
- **Stream Idle / Down** — Red when stream is stopped or down
- **mpv Process Alive** — Whether the video player process is running
- **PCO Overlay Active** — Whether a live PCO service is being tracked
- **PCO Live** — Whether Planning Center reports a live service
- **Network Connection Type** — Matches a specific connection type (ethernet/wifi/hotspot/none)
- **TV Power On** — Green when CEC reports TV is on

## Variables

All variables are updated on every poll cycle (default every 3 seconds).

| Variable | Description |
|----------|-------------|
| `$(albin-och-pi-decoder:mpv_alive)` | mpv process running (true/false) |
| `$(albin-och-pi-decoder:mpv_playing)` | Stream is playing (true/false) |
| `$(albin-och-pi-decoder:mpv_idle)` | mpv is idle (true/false) |
| `$(albin-och-pi-decoder:mpv_stream_url)` | Current stream URL |
| `$(albin-och-pi-decoder:overlay_enabled)` | Overlay enabled (true/false) |
| `$(albin-och-pi-decoder:overlay_is_live)` | PCO service is live (true/false) |
| `$(albin-och-pi-decoder:overlay_countdown)` | Countdown timer (HH:MM:SS) |
| `$(albin-och-pi-decoder:overlay_plan_title)` | Current PCO plan name |
| `$(albin-och-pi-decoder:overlay_item_title)` | Current PCO item name |
| `$(albin-och-pi-decoder:system_cpu_percent)` | CPU usage % |
| `$(albin-och-pi-decoder:system_temperature)` | CPU temperature °C |
| `$(albin-och-pi-decoder:system_uptime)` | System uptime string |
| `$(albin-och-pi-decoder:network_connection_type)` | Connection type (ethernet/wifi/hotspot/none) |
| `$(albin-och-pi-decoder:network_ip)` | Current IP address |
| `$(albin-och-pi-decoder:network_signal)` | WiFi signal strength |
| `$(albin-och-pi-decoder:device_name)` | Device name configured on the Pi |
| `$(albin-och-pi-decoder:cec_power_status)` | TV power status (on/standby/unknown) |

## Notes

- All endpoints are unauthenticated — only the IP address is required.
- The Pi-Decoder and the Companion machine must be on the same network (or reachable via routing).
- CEC TV power status is polled separately every 10 seconds to avoid CEC bus congestion.
- Use the `Reboot Pi` and `Shutdown Pi` actions with care — a confirmation prompt is recommended.

