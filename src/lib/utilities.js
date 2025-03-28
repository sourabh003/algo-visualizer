export function generateUniqueArray(length, min = 1, max = 100) {
	const uniqueNumbers = new Set();

	while (uniqueNumbers.size < length) {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		uniqueNumbers.add(num);
	}

	return Array.from(uniqueNumbers);
}

export async function delay(time = 100) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}