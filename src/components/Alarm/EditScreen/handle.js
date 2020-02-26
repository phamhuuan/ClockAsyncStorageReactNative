function numberToDay(number) {
	switch (number) {
		case 0:
			return 'Chủ nhật';
		case 1:
			return 'Thứ 2';
		case 2:
			return 'Thứ 3';
		case 3:
			return 'Thứ 4';
		case 4:
			return 'Thứ 5';
		case 5:
			return 'Thứ 6';
		case 6:
			return 'Thứ 7';
	}
}

export function handleDay(arrayDay) {
	let tmp = '';
	let i;
	let tmpNumber = 0;
	for (i = 0; i < 7; i++) {
		if (arrayDay[i]) {
			tmpNumber++;
			i === 6
				? (tmp = tmp + numberToDay(i))
				: (tmp = tmp + numberToDay(i) + ' ');
		} else {
			tmpNumber--;
		}
		if (tmpNumber === 7) {
			return 'Hàng ngày';
		} else if (tmpNumber === -7) {
			return 'Không lặp lại';
		}
	}
	return tmp;
}
