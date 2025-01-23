import moment from "moment"

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


export function secondsToTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsRemaining = Math.floor(seconds % 60);
	
	if (hours > 0) {
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
	} else {
		return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
	}
}
	


export function formatDateAgo(givenDate: string | any) {
	const date = moment(givenDate);
	const now = moment();
	const diff = now.diff(date);

	if (diff < 3600000) {
		// less than 1 hour
		const seconds = Math.floor(diff / 1000);
		return `${seconds} secs ago`;
	} else if (diff < 86400000) {
		// less than 1 day
		const minutes = Math.floor(diff / 60000);
		if (minutes < 60) {
			return `${minutes} mins ago`;
		} else {
			const hours = Math.floor(diff / 3600000);
			return `${hours} hours ago`;
		}
	} else {
		const days = Math.floor(diff / 86400000);
		return `${days} days ago`;
	}
	
}