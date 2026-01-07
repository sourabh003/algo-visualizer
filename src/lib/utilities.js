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

/**
 * Generates an array of n distinct numbers.
 * @param {number} n - Number of items (max 70 in your case)
 * @param {boolean} shuffle - Whether to randomize the order
 */
export const generateDistinctArray = (n, shuffle = true) => {
  // 1. Create an array of sequential numbers [0, 1, 2, ... n-1]
  const arr = Array.from({ length: n }, (_, i) => i + 1);

  if (!shuffle) return arr;

  // 2. Fisher-Yates Shuffle algorithm for true randomness
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};