function objToFD(obj: Record<string, string | number | boolean | Blob>) {
	const fd = new FormData();
	Object.entries(obj).forEach(([key, value]) => {
		if (value instanceof Blob) {
			fd.append(key, value);
		} else {
			fd.append(key, value.toString());
		}
	});
	return fd;
}

export { objToFD };
