import {
	scheduleNotification,
	cancelNotification,
} from '../components/Countdown/handle';

const initTime = {
	selectedHours: 0,
	selectedMinutes: 2,
	selectedSeconds: 0,
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
			return initCountdownState;
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
				return initCountdownState;
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
