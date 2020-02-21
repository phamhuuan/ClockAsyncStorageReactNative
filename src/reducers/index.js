import {stopWatchReducer, sortReducer} from './StopWatchReducer';
import {
	timeReducer,
	countdownReducer,
	selectedItemReducer,
	editReducer,
	pressReducer,
	selectedPageReducer,
} from './CountdownReducer';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
	stopWatchReducer,
	sortReducer,
	countdownReducer,
	timeReducer,
	selectedItemReducer,
	editReducer,
	pressReducer,
	selectedPageReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['editReducer', 'pressReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
