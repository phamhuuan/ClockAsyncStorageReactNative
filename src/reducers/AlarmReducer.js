import {setAlarm, removeAlarm} from '../components/Alarm/handle';

const initAlarm = {
	data: [],
};

export function alarmReducer(state = initAlarm, action) {
	let data, tmp;
	switch (action.type) {
		case 'SET_ON':
			data = state.data.map(tmpdata => {
				if (tmpdata.id === action.id) {
					tmpdata.isOn = true;
					setAlarm(tmpdata);
				}
				return tmpdata;
			});
			return {...state, data: data};
		case 'SET_OFF':
			data = state.data.map(tmpdata => {
				if (tmpdata.id === action.id) {
					tmpdata.isOn = false;
					removeAlarm(tmpdata);
				}
				return tmpdata;
			});
			return {...state, data: data};
		case 'ADD_ALARM':
			tmp = {
				id: Math.random()
					.toString()
					.substring(13),
				hour: action.hour,
				minute: action.minute,
				isOn: action.isOn,
				name: action.name,
				repeatAlarm: action.repeatAlarm,
				repeatSound: action.repeatSound,
				soundName: action.soundName,
				soundPath: action.soundPath,
				repeatTime: action.repeatTime,
				vibrate: action.vibrate,
			};
			state.data.push(tmp);
			data = state.data.sort(
				(a, b) => a.hour * 60 + a.minute > b.hour * 60 + b.minute,
			);
			setAlarm(tmp);
			return {...state, data: data};
		case 'DELETE_ALARM':
			data = state.data.filter(a => {
				if (a.id !== action.id) {
					return a;
				} else {
					removeAlarm(a);
				}
			});
			return {...state, data: data};
	}
	return state;
}

const initAddAlarm = {
	id: 1,
	hour: 0,
	minute: 0,
	isOn: true,
	name: 'Báo thức',
	repeatAlarm: [false, false, false, false, false, false, false],
	repeatSound: false,
	soundName: 'Alarm 1',
	soundPath: 'alarm01.mp3',
	repeatTime: 2,
	vibrate: false,
};

export function addAlarmReducer(state = initAddAlarm, action) {
	switch (action.type) {
		case 'CHECK':
			state.repeatAlarm[action.day] = true;
			return {...state, repeatAlarm: state.repeatAlarm};
		case 'UNCHECK':
			state.repeatAlarm[action.day] = false;
			return {...state, repeatAlarm: state.repeatAlarm};
		case 'ALARM_NAME':
			state.name = action.value;
			return {...state, name: state.name};
		case 'SET_REPEAT_SOUND':
			return {...state, repeatSound: true};
		case 'SET_UNREPEAT_SOUND':
			return {...state, repeatSound: false};
		case 'SET_VIBRATE':
			return {...state, vibrate: true};
		case 'SET_UNVIBRATE':
			return {...state, vibrate: false};
		case 'ADD_ALARM_HOUR':
			return {...state, hour: action.value};
		case 'ADD_ALARM_MINUTE':
			return {...state, minute: action.value};
		case 'SET_REPEAT_TIME':
			return {...state, repeatTime: action.value};
		case 'CHOOSE_SOUND':
			return {
				...state,
				soundName: action.soundName,
				soundPath: action.soundPath,
			};
		case 'RESET_SETTING':
			return {
				...state,
				id: 1,
				hour: 0,
				minute: 0,
				isOn: true,
				name: 'Báo thức',
				repeatAlarm: [false, false, false, false, false, false, false],
				repeatSound: false,
				soundName: 'Alarm 1',
				soundPath: 'alarm01.mp3',
				repeatTime: 2,
				vibrate: false,
			};
	}
	return state;
}

const initEditAlarm = {
	id: 1,
	hour: 0,
	minute: 0,
	isOn: true,
	name: 'Báo thức',
	repeatAlarm: [false, false, false, false, false, false, false],
	repeatSound: false,
	soundName: 'Alarm 1',
	soundPath: 'alarm01.mp3',
	repeatTime: 2,
	vibrate: false,
};

export function editAlarmReducer(state = initEditAlarm, action) {
	switch (action.type) {
		case 'SET_ALARM_INFO':
			return {...state, ...action.item};
		case 'CHECK_EDIT':
			state.repeatAlarm[action.day] = true;
			return {...state, repeatAlarm: state.repeatAlarm};
		case 'UNCHECK_EDIT':
			state.repeatAlarm[action.day] = false;
			return {...state, repeatAlarm: state.repeatAlarm};
		case 'EDIT_ALARM_HOUR':
			return {...state, hour: action.value};
		case 'EDIT_ALARM_MINUTE':
			return {...state, minute: action.value};
		case 'ALARM_NAME_EDIT':
			state.name = action.value;
			return {...state, name: state.name};
		case 'EDIT_REPEAT_SOUND':
			return {...state, repeatSound: true};
		case 'EDIT_UNREPEAT_SOUND':
			return {...state, repeatSound: false};
		case 'EDIT_VIBRATE':
			return {...state, vibrate: true};
		case 'EDIT_UNVIBRATE':
			return {...state, vibrate: false};
		case 'EDIT_REPEAT_TIME':
			return {...state, repeatTime: action.value};
		case 'CLEAR_EDIT_ALARM':
			return {
				...state,
				id: 1,
				hour: 0,
				minute: 0,
				isOn: true,
				name: 'Báo thức',
				repeatAlarm: [false, false, false, false, false, false, false],
				repeatSound: false,
				soundName: 'Alarm 01',
				soundPath: 'alarm01.mp3',
				repeatTime: 2,
				vibrate: false,
			};
	}
	return state;
}

const initSound = {
	data: [
		{
			soundName: 'Alarm 01',
			soundPath: 'alarm01.mp3',
		},
		{
			soundName: 'Alarm 02',
			soundPath: 'alarm02.mp3',
		},
		{
			soundName: 'Alarm 03',
			soundPath: 'alarm03.mp3',
		},
		{
			soundName: 'Alarm 04',
			soundPath: 'alarm04.mp3',
		},
		{
			soundName: 'Alarm 05',
			soundPath: 'alarm05.mp3',
		},
		{
			soundName: 'Alarm 06',
			soundPath: 'alarm06.mp3',
		},
		{
			soundName: 'Alarm 07',
			soundPath: 'alarm07.mp3',
		},
		{
			soundName: 'Alarm 08',
			soundPath: 'alarm08.mp3',
		},
		{
			soundName: 'Alarm 09',
			soundPath: 'alarm09.mp3',
		},
	],
	choose: 'Alarm 01',
};

export function chooseSoundReducer(state = initSound, action) {
	switch (action.type) {
		case 'SET_CHOOSE':
			return {...state, choose: action.choose};
		case 'RESET_CHOOSE':
			return {...state, choose: 'Alarm 01'};
	}
	return state;
}
