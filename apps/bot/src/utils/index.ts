export function parseTime(string: string): number {
	const time = string.match(/(\d+[dhms])/g);
	if (!time) return 0;
	let ms = 0;
	for (const t of time) {
		const unit = t[t.length - 1];
		const amount = Number(t.slice(0, -1));
		if (unit === 'd') ms += amount * 24 * 60 * 60 * 1000;
		else if (unit === 'h') ms += amount * 60 * 60 * 1000;
		else if (unit === 'm') ms += amount * 60 * 1000;
		else if (unit === 's') ms += amount * 1000;
	}
	return ms;
}




type TimeRecord = Record<string, number>;




const formatToMs = (date: string) => {
    let result = 0;

    const matches = date.matchAll(stringToMsRegex);

    for (const [, value, unit] of matches) {
        const unitValue = TimeUnitsAliases[unit!.toLowerCase()];
        if (unitValue === undefined) continue;
        result += sanitizeNumber(value!) * unitValue;
    }

    return result;
};
