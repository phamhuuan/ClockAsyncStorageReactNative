/* eslint-disable react-native/no-inline-styles */
// without using async storage
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

function handlColor(index, total, opacity) {
	if (index === total && index === 1) {
		return `rgba(0,255,0,${opacity})`;
	} else {
		if (index <= total / 2) {
			return `rgba(${0 +
				Math.round((2 * 255 * (index - 1)) / total)},255,0,${opacity})`;
		} else if (index === (total + 1) / 2) {
			return `rgba(255,255,0,${opacity})`;
		} else {
			return `rgba(255,${0 +
				Math.round((2 * 255 * (total - index)) / total)},0,${opacity})`;
		}
	}
}

function handleData(data, id) {
	let tmp = data.sort((a, b) => {
		if (a.time !== b.time) {
			return a.time > b.time;
		}
		return a.lap > b.lap;
	});
	let length = data.length;
	tmp = tmp.map(
		(a, i = 1) =>
			(a = {
				...a,
				color: handlColor(i, length),
				index: i++,
			}),
	);
	switch (id) {
		case 0:
			return (tmp = tmp.sort((a, b) => a.lap > b.lap));
		case 1:
			return (tmp = tmp.sort((a, b) => a.time > b.time));
		case 2:
			return (tmp = tmp.sort((a, b) => a.time < b.time));
	}
}

function handleTime(time) {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 3600);
	return (
		(hours < 10 ? '0' + hours : hours) +
		':' +
		(minutes < 10 ? '0' + minutes : minutes) +
		':' +
		(seconds < 10 ? '0' + seconds : seconds)
	);
}

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
			interval = setInterval(() => dispatch({type: 'TIMING'}), 1000);
		}
		return () => clearInterval(interval);
	}, [dispatch, isStart]);
	function onStart() {
		dispatch({type: 'START'});
	}
	function onStop() {
		dispatch({type: 'STOP'});
	}
	function onReset() {
		dispatch({type: 'RESET'});
	}
	function onAddLap() {
		dispatch({type: '+LAP'});
	}
	function onStartOrStop() {
		isStart ? onStop() : onStart();
	}
	function onResetOrAddLap() {
		isStart ? onAddLap() : onReset();
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
	let stopWatch = handleTime(time);
	let data = handleData(lap, id);
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Bấm giờ</Text>
			</View>
			<View style={styles.body}>
				<Text style={{fontSize: 50}}>{stopWatch}</Text>
			</View>
			<View style={styles.result}>
				<FlatList
					data={data}
					keyExtractor={item => item.lap.toString()}
					renderItem={({item}) => (
						<View
							style={[
								styles.listResult,
								{backgroundColor: handlColor(item.index + 1, data.length, 0.5)},
							]}>
							<View style={{flex: 1, alignItems: 'center'}}>
								<Text style={{color: '#000'}}>Lap {item.lap}</Text>
							</View>
							<View style={{flex: 2}} />
							<View style={{flex: 1}}>
								<Text style={{color: '#000'}}>{handleTime(item.time)}</Text>
							</View>
						</View>
					)}
				/>
			</View>
			<View style={styles.controlView}>
				<View style={{flexDirection: 'row'}}>
					<View style={styles.buttonView}>
						<TouchableOpacity
							onPress={onStartOrStop}
							style={[
								styles.startButton,
								{backgroundColor: isStart ? 'green' : 'red'},
							]}>
							<Text>{isStart ? 'Pause' : 'Start'}</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: 50, width: 20}} />
					<View style={styles.buttonView}>
						<TouchableOpacity
							onPress={onResetOrAddLap}
							disabled={reset}
							style={[styles.resetButton, {opacity: reset ? 0.2 : 1}]}>
							<Text>{isStart ? '+Lap' : 'Reset'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{height: 20}} />
				<View style={{flexDirection: 'row'}}>
					<View style={styles.buttonView}>
						<TouchableOpacity
							onPress={onSortLap}
							style={[styles.startButton, {backgroundColor: '#ff8500'}]}>
							<Text>Sort by lap</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: 50, width: 20}} />
					<View style={styles.buttonView}>
						<TouchableOpacity
							onPress={onSortTime}
							style={[styles.resetButton, {backgroundColor: '#ff8500'}]}>
							<Text>{buttonName}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 65,
		backgroundColor: '#eceff1',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	body: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	controlView: {
		flex: 2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonView: {
		height: 50,
		width: 100,
		borderRadius: 20,
	},
	result: {
		height: 250,
		width: 250,
		alignSelf: 'center',
	},
	startButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	resetButton: {
		flex: 1,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	listResult: {
		height: 50,
		width: 250,
		marginVertical: 4,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
});
