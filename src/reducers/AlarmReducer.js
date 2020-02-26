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
					.substring(12),
				hour: action.hour,
				minute: action.minute,
				isOn: action.isOn,
				name: action.name,
				repeatAlarm: action.repeatAlarm,
				repeatSound: action.repeatSound,
				soundName: action.soundName,
				soundPath: action.soundPath,
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
		case 'ADD_ALARM_HOUR':
			return {...state, hour: action.value};
		case 'ADD_ALARM_MINUTE':
			return {...state, minute: action.value};
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
				soundName: '',
				soundPath: '',
			};
	}
	return state;
}
