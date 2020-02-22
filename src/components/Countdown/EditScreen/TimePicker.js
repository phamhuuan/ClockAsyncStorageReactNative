/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {WheelPicker} from 'react-native-wheel-picker-android';
import * as wheelState from './wheelState';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

function TimeWheel(props) {
	const {select, data, onSelect} = props;
	return (
		<WheelPicker
			style={{width: 60}}
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
	const route = useRoute();
	useEffect(() => {
		const time = route.params.item.time;
		dispatch({type: 'ADD_HOURS', value: Math.floor(time / 3600)});
		dispatch({
			type: 'ADD_MINUTES',
			value: (time - 3600 * Math.floor(time / 3600) - (time % 60)) / 60,
		});
		dispatch({type: 'ADD_SECONDS', value: time % 60});
	}, [dispatch, route.params.item.time]);
	const hours = useSelector(state => state.addCountdownReducer.hours);
	const minutes = useSelector(state => state.addCountdownReducer.minutes);
	const seconds = useSelector(state => state.addCountdownReducer.seconds);
	const dispatch = useDispatch();
	useEffect(() => {
		if (hours === 0 && minutes === 0 && seconds === 0) {
			dispatch({type: 'ADD_SECONDS', value: 1});
		}
	}, [dispatch, hours, minutes, seconds]);
	function onSelectHours(value) {
		dispatch({type: 'ADD_HOURS', value});
	}
	function onSelectMinutes(value) {
		dispatch({type: 'ADD_MINUTES', value});
	}
	function onSelectSeconds(value) {
		dispatch({type: 'ADD_SECONDS', value});
	}
	return (
		<View style={styles.timePicker}>
			<TimeWheel
				select={hours}
				data={wheelState.hours}
				onSelect={item => onSelectHours(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textHours}
			/>
			<TimeWheel
				select={minutes}
				data={wheelState.minutes}
				onSelect={item => onSelectMinutes(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textMinutes}
			/>
			<TimeWheel
				select={seconds}
				data={wheelState.seconds}
				onSelect={item => onSelectSeconds(item)}
			/>
			<WheelPicker
				style={{flex: 1}}
				selectedItemTextColor="#ff7800"
				selectedItemTextSize={24}
				data={wheelState.textSeconds}
			/>
		</View>
	);
}
