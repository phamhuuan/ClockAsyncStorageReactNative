/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {WheelPicker} from 'react-native-wheel-picker-android';
import * as wheelState from './wheelState';
import {useDispatch, useSelector} from 'react-redux';

function TimeWheel(props) {
	const {select, data, onSelect} = props;
	return (
		<WheelPicker
			style={{width: 80}}
			isCyclic={true}
			selectedItemTextColor="#ff7800"
			selectedItemTextSize={24}
			itemTextColor="gray"
			itemTextSize={16}
			selectedItem={select}
			data={data}
			onItemSelected={onSelect}
		/>
	);
}

export default function TimePicker() {
	const dispatch = useDispatch();
	const hour = useSelector(state => state.editAlarmReducer.hour);
	const minute = useSelector(state => state.editAlarmReducer.minute);
	function onSelectHours(value) {
		dispatch({type: 'EDIT_ALARM_HOUR', value});
	}
	function onSelectMinutes(value) {
		dispatch({type: 'EDIT_ALARM_MINUTE', value});
	}
	return (
		<View style={styles.timePicker}>
			<WheelPicker style={{flex: 1}} data={['']} selectedItemTextSize={24} />
			<TimeWheel
				select={hour}
				data={wheelState.hours}
				onSelect={item => onSelectHours(item)}
			/>
			<TimeWheel
				select={minute}
				data={wheelState.minutes}
				onSelect={item => onSelectMinutes(item)}
			/>
			<WheelPicker style={{flex: 1}} data={['']} selectedItemTextSize={24} />
		</View>
	);
}
