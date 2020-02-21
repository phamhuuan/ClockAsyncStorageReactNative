/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';

export default function Control() {
	const dispatch = useDispatch();
	const selectedHours = useSelector(state => state.timeReducer.selectedHours);
	const selectedMinutes = useSelector(
		state => state.timeReducer.selectedMinutes,
	);
	const selectedSeconds = useSelector(
		state => state.timeReducer.selectedSeconds,
	);
	const start = useSelector(state => state.countdownReducer.start);
	const pause = useSelector(state => state.countdownReducer.pause);
	const edit = useSelector(state => state.editReducer.edit);
	function onStart() {
		dispatch({
			type: 'START_COUNTDOWN',
			value: 3600 * selectedHours + 60 * selectedMinutes + selectedSeconds,
		});
	}
	function onCancel() {
		dispatch({type: 'CANCEL_COUNTDOWN'});
	}
	function onPause() {
		dispatch({type: 'PAUSE_COUNTDOWN'});
	}
	function onContinue() {
		dispatch({
			type: 'COUNTINUE_COUNTDOWN',
			value: 3600 * selectedHours + 60 * selectedMinutes + selectedSeconds,
		});
	}
	function onStartOrCancel() {
		start ? onCancel() : onStart();
	}
	function onPauseOrContinue() {
		pause ? onContinue() : onPause();
	}
	return (
		<View style={[styles.controlView, {opacity: edit ? 0.2 : 1}]}>
			<View
				style={{
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					position: 'absolute',
					zIndex: edit ? 1 : -1,
				}}
			/>
			<View style={styles.buttonView}>
				<TouchableOpacity
					onPress={onStartOrCancel}
					style={[styles.button, {backgroundColor: '#ff4d4d'}]}>
					<Text>{start ? 'Cancel' : 'Start'}</Text>
				</TouchableOpacity>
			</View>
			<View style={{height: 50, width: 20}} />
			<View style={styles.buttonView}>
				<TouchableOpacity
					disabled={start ? false : true}
					onPress={onPauseOrContinue}
					style={[
						styles.button,
						{backgroundColor: '#0099ff', opacity: start ? 1 : 0.2},
					]}>
					<Text>{pause ? 'Continue' : 'Pause'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
