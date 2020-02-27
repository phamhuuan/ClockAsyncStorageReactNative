/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
export default function Header() {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const id = useSelector(state => state.editAlarmReducer.id);
	const name = useSelector(state => state.editAlarmReducer.name);
	const repeatAlarm = useSelector(state => state.editAlarmReducer.repeatAlarm);
	const repeatSound = useSelector(state => state.editAlarmReducer.repeatSound);
	const soundName = useSelector(state => state.editAlarmReducer.soundName);
	const hour = useSelector(state => state.editAlarmReducer.hour);
	const minute = useSelector(state => state.editAlarmReducer.minute);
	const isOn = useSelector(state => state.editAlarmReducer.isOn);
	const soundPath = useSelector(state => state.editAlarmReducer.soundPath);
	const repeatTime = useSelector(state => state.editAlarmReducer.repeatTime);
	const vibrate = useSelector(state => state.editAlarmReducer.vibrate);
	function onUpdate() {
		dispatch({type: 'DELETE_ALARM', id});
		dispatch({
			type: 'ADD_ALARM',
			name,
			repeatAlarm,
			repeatSound,
			soundName,
			hour,
			minute,
			isOn,
			soundPath,
			repeatTime,
			vibrate,
		});
		navigation.push('Báo thức');
	}
	function onCancel() {
		navigation.push('Báo thức');
	}
	return (
		<View style={styles.header}>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity onPress={onCancel}>
					<Text style={{color: 'tomato'}}>{'Cancel'}</Text>
				</TouchableOpacity>
			</View>
			<View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.headerText}>Sửa báo thức</Text>
			</View>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity onPress={onUpdate}>
					<Text style={{color: 'tomato'}}>{'Save'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
