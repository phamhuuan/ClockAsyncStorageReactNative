import {stopWatchReducer, sortReducer} from './StopWatchReducer';
import {
	navigationReducer,
	timeReducer,
	countdownReducer,
	selectedItemReducer,
	editReducer,
	pressReducer,
	selectedPageReducer,
	dataReducer,
	textInputReducer,
	selectionReducer,
	addCountdownReducer,
} from './CountdownReducer';
import {
	alarmReducer,
	addAlarmReducer,
	editAlarmReducer,
	chooseSoundReducer,
} from './AlarmReducer';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
	navigationReducer,
	stopWatchReducer,
	sortReducer,
	countdownReducer,
	timeReducer,
	selectedItemReducer,
	editReducer,
	pressReducer,
	selectedPageReducer,
	dataReducer,
	textInputReducer,
	selectionReducer,
	addCountdownReducer,
	alarmReducer,
	addAlarmReducer,
	editAlarmReducer,
	chooseSoundReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: [
		'editReducer',
		'pressReducer',
		'navigationReducer',
		'textInputReducer',
		'selectionReducer',
		'addCountdownReducer',
		'addAlarmReducer',
		'editAlarmReducer',
		'chooseSoundReducer',
	],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
