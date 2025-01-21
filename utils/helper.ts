export function truncateString(input: string, num:number = 50) {
	if (input?.length > num) {
		return input?.substring(0, num) + "...";
	} else {
		return input;
	}
}

export function countNum(val: number | any) {
	const num = Number(val);

	if (num >= 1000000) {
		return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
	} else {
		return num.toFixed(0);
	}
}

export function formatDate(date: string) {
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	return formattedDate;
}

export function formatTime(date: string) {
	const formattedTime = new Date(date).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
	return formattedTime;
}
