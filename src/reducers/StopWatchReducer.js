const stopWatchInitialState = {
	time: 0,
	isStart: false,
	reset: true,
	lap: [],
	startTime: null,
	totalTime: null,
};

const sortInitialState = {
	id: 0,
	buttonName: 'Best to worst',
};

export function stopWatchReducer(state = stopWatchInitialState, action) {
	let now = new Date();
	switch (action.type) {
		case 'TIMING':
			if (state.startTime !== 0) {
				now = now.getTime();
				return {
					...state,
					time: Math.round((state.totalTime + now - state.startTime) / 10),
				};
			} else {
				return {...state, time: Math.round(state.totalTime / 10)};
			}
		case 'START':
			now = now.getTime();
			return {...state, isStart: true, reset: false, startTime: now};
		case 'STOP':
			now = now.getTime();
			let tmp = now - state.startTime + state.totalTime;
			return {
				...state,
				isStart: false,
				time: Math.round(tmp / 10),
				totalTime: tmp,
			};
		case 'RESET':
			return stopWatchInitialState;
		case '+LAP':
			now = now.getTime();
			return {
				...state,
				lap: [
					...state.lap,
					{
						lap: state.lap.length + 1,
						time: state.time / 100,
						color: 'rgb(0,255,0)',
						index: 1,
					},
				],
				time: 0,
				startTime: now,
				totalTime: 0,
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
