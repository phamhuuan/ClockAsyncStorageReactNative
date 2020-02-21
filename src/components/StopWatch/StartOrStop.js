/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

export default function StartOrStop() {
	const isStart = useSelector(state => state.stopWatchReducer.isStart);
	const dispatch = useDispatch();
	function onStartOrStop() {
		isStart ? dispatch({type: 'STOP'}) : dispatch({type: 'START'});
	}
	return (
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
	);
}
