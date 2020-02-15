import storage from '../storage';
import {useState} from 'react';
async function saveToStorage(key, value) {
	await storage.set(key, value);
}

const stopWatchInitialState = {
	time: 0,
	isStart: false,
	reset: true,
	lap: [],
};

const sortInitialState = {
	id: 0,
	buttonName: 'Best to worst',
};

export function stopWatchReducer(state = stopWatchInitialState, action) {
	let x = new Date();
	switch (action.type) {
		case 'TIMING':
			return {...state, time: x};
		case 'START':
			x = x.getTime().toString();
			saveToStorage('current-time', x);
			return {...state, isStart: true, reset: false};
		case 'STOP':
			return {...state, isStart: false};
		case 'RESET':
			return stopWatchInitialState;
		case '+LAP':
			return {
				...state,
				lap: [
					...state.lap,
					{
						lap: state.lap.length + 1,
						time: state.time,
						color: 'rgb(0,255,0)',
						index: 1,
					},
				],
				time: 0,
			};
	}
	return state;
}

export function sortReducer(state = sortInitialState, action) {
	switch (action.type) {
		case 'SORT_BY_LAP':
			return {...state, id: 0};
		case 'SORT_BEST_TO_WORST':
			return {...state, id: 1, buttonName: 'Worst to best'};
		case 'SORT_WORST_TO_BEST':
			return {...state, id: 2, buttonName: 'Best to worst'};
	}
	return state;
}
