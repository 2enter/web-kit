async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

async function randSleep(minMs: number, maxMs: number) {
	await sleep(Math.random() * (maxMs - minMs) + minMs);
}

export { sleep, randSleep };
