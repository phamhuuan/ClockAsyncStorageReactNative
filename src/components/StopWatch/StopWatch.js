import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import {handleData, handleTime} from './handle';
import ListResult from './ListResult';
import ShowTime from './ShowTime';
import Control from './Control';
import {useSelector, useDispatch} from 'react-redux';
export default function StopWatch() {
	const time = useSelector(state => state.stopWatchReducer.time);
	const isStart = useSelector(state => state.stopWatchReducer.isStart);
	const reset = useSelector(state => state.stopWatchReducer.reset);
	const lap = useSelector(state => state.stopWatchReducer.lap);
	const id = useSelector(state => state.sortReducer.id);
	const buttonName = useSelector(state => state.sortReducer.buttonName);
	const dispatch = useDispatch();
	useEffect(() => {
		let interval;
		if (isStart) {
			interval = setInterval(() => {
				dispatch({type: 'TIMING'});
			}, 50);
		}
		return () => clearInterval(interval);
	}, [dispatch, isStart]);
	function onStartOrStop() {
		isStart ? dispatch({type: 'STOP'}) : dispatch({type: 'START'});
	}
	function onResetOrAddLap() {
		isStart ? dispatch({type: '+LAP'}) : dispatch({type: 'RESET'});
	}
	function onSortLap() {
		dispatch({type: 'SORT_BY_LAP'});
	}
	function onSortTime() {
		switch (buttonName) {
			case 'Best to worst':
				dispatch({type: 'SORT_BEST_TO_WORST'});
				break;
			case 'Worst to best':
				dispatch({type: 'SORT_WORST_TO_BEST'});
				break;
		}
	}
	return (
		<View style={styles.container}>
			<Header />
			<ShowTime stopWatch={handleTime(time / 100)} />
			<ListResult data={handleData(lap, id)} />
			<Control
				onStartOrStop={onStartOrStop}
				isStart={isStart}
				onResetOrAddLap={onResetOrAddLap}
				onSortLap={onSortLap}
				reset={reset}
				onSortTime={onSortTime}
				buttonName={buttonName}
			/>
		</View>
	);
}
