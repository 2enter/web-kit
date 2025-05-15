export function rangeMap(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
	if (start1 === stop1) return start2;

	if (value < start1 || value > stop1) throw new Error('Value out of range');

	return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}

export function averageOf(...numbers: number[]): number {
	if (numbers.length === 0) throw new Error('No numbers provided');

	return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}

export function distanceBetween(a: number[], b: number[]): number {
	if (a.length !== b.length) throw new Error('Arrays must have the same length');

	return Math.sqrt(a.reduce((acc, val, i) => acc + Math.pow(val - b[i], 2), 0));
}

export function sumOf(...numbers: number[]): number {
	if (numbers.length === 0) throw new Error('No numbers provided');

	return numbers.reduce((acc, num) => acc + num, 0);
}

export function productOf(...numbers: number[]): number {
	if (numbers.length === 0) throw new Error('No numbers provided');

	return numbers.reduce((acc, num) => acc * num, 1);
}

export function arrayCalc(a: number[], b: number[], operator: (a: number, b: number) => number) {
	if (a.length !== b.length) throw new Error('Arrays must have the same length');

	return a.map((val, i) => operator(val, b[i]));
}
