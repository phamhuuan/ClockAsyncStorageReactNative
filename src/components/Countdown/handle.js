export function handleTime(time) {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 3600);
	hours = hours < 10 ? '0' + `${hours}` : `${hours}`;
	minutes = minutes < 10 ? '0' + `${minutes}` : `${minutes}`;
	seconds = seconds < 10 ? '0' + `${seconds}` : `${seconds}`;
	return hours + ':' + minutes + ':' + seconds;
}
