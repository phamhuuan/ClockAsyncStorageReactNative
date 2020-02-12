const initialState = {
	time: 0,
	isStart: false,
	reset: true,
	lap: [],
};

export function stopWatchReducer(state = initialState, action) {
	switch (action.type) {
		case 'TIMING':
			return {...state, time: state.time + 1};
		case 'START':
			return {...state, isStart: true, reset: false};
		case 'STOP':
			return {...state, time: 0, isStart: false};
		case 'RESET':
			return initialState;
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
			};
	}
	return state;
}
