/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

export default function ResetOrAddLap() {
	const isStart = useSelector(state => state.stopWatchReducer.isStart);
	const reset = useSelector(state => state.stopWatchReducer.reset);
	const dispatch = useDispatch();

	function onResetOrAddLap() {
		isStart ? dispatch({type: '+LAP'}) : dispatch({type: 'RESET'});
	}
	return (
		<View style={styles.buttonView}>
			<TouchableOpacity
				onPress={onResetOrAddLap}
				disabled={reset}
				style={[styles.resetButton, {opacity: reset ? 0.2 : 1}]}>
				<Text>{isStart ? '+Lap' : 'Reset'}</Text>
			</TouchableOpacity>
		</View>
	);
}
