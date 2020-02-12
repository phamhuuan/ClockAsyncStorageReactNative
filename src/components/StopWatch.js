/* eslint-disable react-native/no-inline-styles */
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

function handleData(data) {
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
	return (tmp = tmp.sort((a, b) => a.lap > b.lap));
}

function handleTime(time) {
	let seconds = time % 60;
	let minutes = Math.floor(time / 60) % 60;
	let hours = Math.floor(time / 360);
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
	const dispatch = useDispatch();
	useEffect(() => {
		let interval;
		if (isStart) {
			interval = setInterval(() => dispatch({type: 'TIMING'}), 1000);
		}
		return () => clearInterval(interval);
	}, [dispatch, isStart]);
	function toggleStart() {
		isStart ? dispatch({type: 'STOP'}) : dispatch({type: 'START'});
	}
	function addLap() {
		dispatch({type: '+LAP'});
	}
	function resetTime() {
		dispatch({type: 'RESET'});
	}
	function onResetOrAddLap() {
		isStart ? addLap() : resetTime();
	}
	let stopWatch = handleTime(time);
	let data = handleData(lap);
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
				<View style={styles.buttonView}>
					<TouchableOpacity
						onPress={toggleStart}
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
		flex: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	controlView: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonView: {
		height: 50,
		width: 100,
		borderRadius: 20,
	},
	result: {
		height: 300,
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
