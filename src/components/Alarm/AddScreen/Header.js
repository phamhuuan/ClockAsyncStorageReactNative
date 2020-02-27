/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
export default function Header() {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const name = useSelector(state => state.addAlarmReducer.name);
	const repeatAlarm = useSelector(state => state.addAlarmReducer.repeatAlarm);
	const repeatSound = useSelector(state => state.addAlarmReducer.repeatSound);
	const soundName = useSelector(state => state.addAlarmReducer.soundName);
	const hour = useSelector(state => state.addAlarmReducer.hour);
	const minute = useSelector(state => state.addAlarmReducer.minute);
	const isOn = useSelector(state => state.addAlarmReducer.isOn);
	const soundPath = useSelector(state => state.addAlarmReducer.soundPath);
	const repeatTime = useSelector(state => state.editAlarmReducer.repeatTime);
	const vibrate = useSelector(state => state.addAlarmReducer.vibrate);
	function onAddItem() {
		dispatch({type: 'RESET_SETTING'});
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
		dispatch({type: 'RESET_CHOOSE'});
		navigation.push('Báo thức');
	}
	function onCancel() {
		dispatch({type: 'RESET_SETTING'});
		dispatch({type: 'RESET_CHOOSE'});
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
				<Text style={styles.headerText}>Thêm bộ báo thức</Text>
			</View>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity onPress={onAddItem}>
					<Text style={{color: 'tomato'}}>{'Save'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
