import {
	scheduleNotification,
	cancelNotification,
} from '../components/Countdown/MainScreen/handle';

const initNavigation = {
	navigation: undefined,
};

const initTime = {
	selectedHours: 0,
	selectedMinutes: 2,
	selectedSeconds: 0,
};

const initTimePicker = {
	hours: 0,
	minutes: 15,
	seconds: 0,
};

const initSelectedItem = {
	selectedItemId: 0,
	selectedItem: undefined,
};

const initCountdownState = {
	start: false,
	pause: false,
	time: 0,
	expectedTime: null,
};

const initEdit = {
	edit: false,
};

const initPress = {
	press: false,
};

const initSelectedPage = {
	selectedPage: 0,
};

const initData = {
	dataRaw: [
		{
			id: 1,
			time: 120,
			name: 'Đánh răng',
		},
		{
			id: 2,
			time: 900,
			name: 'Skin care',
		},
		{
			id: 3,
			time: 600,
			name: 'Hấp trứng',
		},
		{
			id: 4,
			name: null,
		},
	],
};

const initTextInputValue = {
	textInputValue: 'Hẹn giờ',
};

const initSelection = {
	start: 0,
	end: 7,
};

export function navigationReducer(state = initNavigation, action) {
	switch (action.type) {
		case 'NAVIGATION':
			return {...state, navigation: action.value};
	}
	return state;
}

export function timeReducer(state = initTime, action) {
	switch (action.type) {
		case 'HOURS':
			return {...state, selectedHours: action.value};
		case 'MINUTES':
			return {...state, selectedMinutes: action.value};
		case 'SECONDS':
			return {...state, selectedSeconds: action.value};
	}
	return state;
}

export function countdownReducer(state = initCountdownState, action) {
	let tmpNow, tmp;
	switch (action.type) {
		case 'START_COUNTDOWN':
			tmp = new Date().getTime();
			tmpNow = Math.round(tmp / 1000);
			scheduleNotification(new Date(tmp + action.value * 1000), action.value);
			return {
				...state,
				time: action.value,
				start: true,
				expectedTime: tmpNow + action.value,
			};
		case 'CANCEL_COUNTDOWN':
			cancelNotification('0');
			return {
				...state,
				start: false,
				pause: false,
				time: 0,
				expectedTime: null,
			};
		case 'PAUSE_COUNTDOWN':
			cancelNotification('0');
			return {...state, pause: true};
		case 'COUNTINUE_COUNTDOWN':
			tmpNow = Math.round(new Date().getTime() / 1000);
			scheduleNotification(
				new Date((tmpNow + state.time) * 1000),
				action.value,
			);
			return {...state, pause: false, expectedTime: tmpNow + state.time};
		case 'COUNTDOWN':
			if (state.time <= 1) {
				return {
					...state,
					start: false,
					pause: false,
					time: 0,
					expectedTime: null,
				};
			} else {
				tmp = state.expectedTime - Math.round(new Date().getTime() / 1000);
				return {...state, time: tmp};
			}
	}
	return state;
}

export function selectedItemReducer(state = initSelectedItem, action) {
	switch (action.type) {
		case 'SELECT_ITEM':
			return {
				...state,
				selectedItemId: action.item.id,
				selectedItem: action.item,
			};
		case 'CLEAR_SELECT_ITEM':
			return {...state, selectedItemId: 0, selectedItem: undefined};
	}
	return state;
}

export function editReducer(state = initEdit, action) {
	switch (action.type) {
		case 'EDIT':
			return {...state, edit: true};
		case 'FINISH':
			return {...state, edit: false};
	}
	return state;
}

export function pressReducer(state = initPress, action) {
	switch (action.type) {
		case 'PRESS':
			return {...state, press: true};
	}
	return state;
}

export function selectedPageReducer(state = initSelectedPage, action) {
	switch (action.type) {
		case 'SELECT_PAGE':
			return {...state, selectedPage: action.value};
	}
	return state;
}

export function dataReducer(state = initData, action) {
	let length, data;
	switch (action.type) {
		case 'ADD_ITEM':
			length = state.dataRaw.length;
			state.dataRaw[length - 1] = {
				id: action.id,
				name: action.name,
				time: action.time,
			};
			state.dataRaw[length] = {
				id: length + 1,
				name: null,
			};
			return {...state, dataRaw: state.dataRaw};
		case 'DELETE_ITEM':
			data = state.dataRaw.filter(dataRaw => dataRaw.id !== action.item.id);
			let id = 1;
			data = data.map(tmpdata => {
				tmpdata.id = id++;
				return tmpdata;
			});
			return {...state, dataRaw: data};
		case 'EDIT_ITEM':
			data = state.dataRaw.map(tmpdata => {
				if (tmpdata.id === action.id) {
					tmpdata.name = action.name;
					tmpdata.time = action.time;
				}
				return tmpdata;
			});
			return {...state, dataRaw: data};
	}
	return state;
}

export function textInputReducer(state = initTextInputValue, action) {
	switch (action.type) {
		case 'CLEAR_TEXT_INPUT':
			return {...state, textInputValue: 'Hẹn giờ'};
		case 'SET_TEXT':
			return {...state, textInputValue: action.value};
	}
	return state;
}

export function selectionReducer(state = initSelection, action) {
	switch (action.type) {
		case 'SET_SELECTION':
			return {...state, start: action.start, end: action.end};
		case 'RESET_SELECTION':
			return {...state, start: 0, end: 7};
	}
	return state;
}

export function addCountdownReducer(state = initTimePicker, action) {
	switch (action.type) {
		case 'ADD_HOURS':
			return {...state, hours: action.value};
		case 'ADD_MINUTES':
			return {...state, minutes: action.value};
		case 'ADD_SECONDS':
			return {...state, seconds: action.value};
		case 'RESET_TIME_PICKER':
			return {...state, hours: 0, minutes: 15, seconds: 0};
	}
	return state;
}
