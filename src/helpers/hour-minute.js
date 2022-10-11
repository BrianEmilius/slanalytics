export default function hourMinute(timestamp) {
	const date = new Date(+timestamp)

	return date.getUTCHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getUTCMinutes()
}