import {stopWatchReducer, sortReducer} from './StopWatchReducer';
import {timeReducer, countdownReducer} from './CountdownReducer';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
	stopWatchReducer,
	sortReducer,
	countdownReducer,
	timeReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
