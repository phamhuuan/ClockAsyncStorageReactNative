import PushNotification from 'react-native-push-notification';
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

function scheduleNotification(date, id, soundPath, repeatType, vibrate) {
	PushNotification.localNotificationSchedule({
		date: date,
		id: id,
		ticker: 'My Notification Ticker',
		autoCancel: true,
		largeIcon: 'ic_launcher',
		smallIcon: 'ic_notification',
		bigText: 'Đã đến giờ thức dậy',
		color: 'blue',
		vibrate: vibrate,
		vibration: 0,
		tag: 'some_tag',
		group: 'group',
		ongoing: false,
		alertAction: 'view',
		category: null,
		userInfo: null,
		title: 'Hẹn giờ',
		repeatType: repeatType,
		message: 'Đã đến giờ thức dậy',
		actions: "['Tắt']",
		playSound: true,
		soundName: soundPath,
	});
}

function cancelNotification(id) {
	PushNotification.cancelLocalNotifications({id: id});
}

export function setAlarm(alarm) {
	let now = new Date();
	let year = now.getFullYear();
	let date = now.getDate();
	let month = now.getMonth();
	let day = now.getDay();
	const hour = now.getHours();
	const minute = now.getMinutes();
	now.setFullYear(year);
	now.setMonth(month);
	now.setDate(date);
	now.setHours(alarm.hour);
	now.setMinutes(alarm.minute);
	now.setSeconds(0);
	now.setMilliseconds(0);
	let sum = 0;
	for (let i = 0; i < 7; i++) {
		if (alarm.repeatAlarm[i]) {
			if (day > i) {
				now = new Date(now.getTime() + 86400000 * (7 + i - day));
				scheduleNotification(
					now,
					`${alarm.id}${i}`,
					alarm.soundPath,
					'week',
					alarm.vibrate,
				);
			} else if (day < i) {
				now = new Date(now.getTime() + 86400000 * (day - i));
				scheduleNotification(
					now,
					`${alarm.id}${i}`,
					alarm.soundPath,
					'week',
					alarm.vibrate,
				);
			} else if (hour * 60 + minute < alarm.hour * 60 + alarm.minute) {
				scheduleNotification(
					now,
					`${alarm.id}${i}`,
					alarm.soundPath,
					'week',
					alarm.vibrate,
				);
			} else {
				now = new Date(now.getTime() + 86400000 * 7);
				scheduleNotification(
					now,
					`${alarm.id}${i}`,
					alarm.soundPath,
					'week',
					alarm.vibrate,
				);
			}
			if (alarm.repeatSound) {
				for (let j = 0; j < alarm.repeatTime * 2 - 1; j++) {
					scheduleNotification(
						new Date(now.getTime() + 30000 * (j + 1)),
						`${alarm.id}0${j}`,
						alarm.soundPath,
						'week',
					);
				}
			}
		}
		sum += alarm.repeatAlarm[i];
	}
	if (sum === 0) {
		if (hour * 60 + minute > alarm.hour * 60 + alarm.minute) {
			now = new Date(now.getTime() + 86400000);
			scheduleNotification(now, alarm.id, alarm.soundPath, null, alarm.vibrate);
		} else {
			now = new Date(now.getTime());
			scheduleNotification(now, alarm.id, alarm.soundPath, null, alarm.vibrate);
		}
		if (alarm.repeatSound) {
			for (let j = 0; j < alarm.repeatTime * 2 - 1; j++) {
				scheduleNotification(
					new Date(now.getTime() + 30000 * (j + 1)),
					`${alarm.id}0${j}`,
					alarm.soundPath,
					null,
				);
			}
		}
	}
}

export function removeAlarm(alarm) {
	let sum = 0;
	for (let i = 0; i < 7; i++) {
		if (alarm.repeatAlarm[i]) {
			cancelNotification(`${alarm.id}${i}`);
		}
		sum += alarm.repeatAlarm[i];
	}
	if (sum === 0) {
		cancelNotification(alarm.id);
	}
	if (alarm.repeatSound) {
		for (let i = 0; i < alarm.repeatTime * 2 - 1; i++) {
			cancelNotification(`${alarm.id}0${i}`);
		}
	}
}
