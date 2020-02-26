/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Switch} from 'react-native-switch';
import {useSelector, useDispatch} from 'react-redux';
import {handleDay} from '../handle';
import {useNavigation} from '@react-navigation/native';

export default function Setting() {
	const navigation = useNavigation();
	const name = useSelector(state => state.addAlarmReducer.name);
	const repeatAlarm = useSelector(state => state.addAlarmReducer.repeatAlarm);
	const repeatSound = useSelector(state => state.addAlarmReducer.repeatSound);
	const soundName = useSelector(state => state.addAlarmReducer.soundName);
	const dispatch = useDispatch();
	return (
		<View style={{flex: 3.2, borderTopWidth: 1}}>
			<TouchableOpacity
				onPress={() =>
					navigation.push('Cài đặt thêm báo thức', {nextPage: 'repeatAlarm'})
				}>
				<View style={styles.settingView}>
					<View style={{flex: 6}}>
						<Text style={styles.settingText}>Lặp lại</Text>
					</View>
					<View style={{flex: 3, marginRight: 5}}>
						<Text style={{fontSize: 12, textAlign: 'right'}}>
							{handleDay(repeatAlarm)}
						</Text>
					</View>
					<View style={{flex: 1}}>
						<FontAwesome5 name="angle-double-right" size={20} color="gray" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.push('Cài đặt thêm báo thức', {nextPage: 'name'})
				}>
				<View style={styles.settingView}>
					<View style={{flex: 6}}>
						<Text style={styles.settingText}>Tên hẹn giờ</Text>
					</View>
					<View style={{flex: 3, marginRight: 5}}>
						<Text style={{fontSize: 12, textAlign: 'right'}}>{name}</Text>
					</View>
					<View style={{flex: 1}}>
						<FontAwesome5 name="angle-double-right" size={20} color="gray" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.push('Cài đặt thêm báo thức', {nextPage: 'sound'})
				}>
				<View style={styles.settingView}>
					<View style={{flex: 6}}>
						<Text style={styles.settingText}>Âm báo</Text>
					</View>
					<View style={{flex: 3, marginRight: 5}}>
						<Text style={{fontSize: 12, textAlign: 'right'}}>{soundName}</Text>
					</View>
					<View style={{flex: 1}}>
						<FontAwesome5 name="angle-double-right" size={20} color="gray" />
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					repeatSound
						? dispatch({type: 'SET_UNREPEAT_SOUND'})
						: dispatch({type: 'SET_REPEAT_SOUND'})
				}>
				<View style={styles.settingView}>
					<View style={{flex: 4}}>
						<Text style={styles.settingText}>Báo lại</Text>
					</View>
					<View style={{flex: 1}}>
						<Switch
							activeText={''}
							inActiveText={''}
							onValueChange={() =>
								repeatSound
									? dispatch({type: 'SET_UNREPEAT_SOUND'})
									: dispatch({type: 'SET_REPEAT_SOUND'})
							}
							value={repeatSound}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
