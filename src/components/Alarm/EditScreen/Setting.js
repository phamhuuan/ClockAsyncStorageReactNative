/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Picker} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Switch} from 'react-native-switch';
import {useSelector, useDispatch} from 'react-redux';
import {handleDay} from './handle';
import {useNavigation} from '@react-navigation/native';

export default function Setting() {
	const navigation = useNavigation();
	const name = useSelector(state => state.editAlarmReducer.name);
	const repeatAlarm = useSelector(state => state.editAlarmReducer.repeatAlarm);
	const repeatSound = useSelector(state => state.editAlarmReducer.repeatSound);
	const soundName = useSelector(state => state.editAlarmReducer.soundName);
	const repeatTime = useSelector(state => state.editAlarmReducer.repeatTime);
	const vibrate = useSelector(state => state.editAlarmReducer.vibrate);
	const dispatch = useDispatch();
	return (
		<View style={{flex: 3.2, borderTopWidth: 1}}>
			<TouchableOpacity
				onPress={() =>
					navigation.push('Cài đặt sửa báo thức', {nextPage: 'repeatAlarm'})
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
					navigation.push('Cài đặt sửa báo thức', {nextPage: 'name'})
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
					navigation.push('Cài đặt sửa báo thức', {nextPage: 'sound'})
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
			{true === 1 ? null : (
				<TouchableOpacity
					onPress={() =>
						vibrate
							? dispatch({type: 'EDIT_UNVIBRATE'})
							: dispatch({type: 'EDIT_VIBRATE'})
					}>
					<View style={styles.settingView}>
						<View style={{flex: 4}}>
							<Text style={styles.settingText}>Rung</Text>
						</View>
						<View style={{flex: 1}}>
							<Switch
								activeText={''}
								inActiveText={''}
								onValueChange={() =>
									vibrate
										? dispatch({type: 'EDIT_UNVIBRATE'})
										: dispatch({type: 'EDIT_VIBRATE'})
								}
								value={vibrate}
							/>
						</View>
					</View>
				</TouchableOpacity>
			)}
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
									? dispatch({type: 'EDIT_UNREPEAT_SOUND'})
									: dispatch({type: 'EDIT_REPEAT_SOUND'})
							}
							value={repeatSound}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={!repeatSound}
				style={{opacity: repeatSound ? 1 : 0}}>
				<View style={styles.settingView}>
					<View style={{flex: 4}}>
						<Text style={styles.settingText}>Thời gian báo lại</Text>
					</View>
					<View style={{flex: 1}}>
						<Picker
							style={{height: 20, width: 200}}
							selectedValue={repeatTime}
							onValueChange={itemValue =>
								dispatch({type: 'EDIT_REPEAT_TIME', value: itemValue})
							}>
							<Picker.Item label="2 phút" value={2} />
							<Picker.Item label="3 phút" value={3} />
							<Picker.Item label="5 phút" value={5} />
							<Picker.Item label="10 phút" value={10} />
							<Picker.Item label="15 phút" value={15} />
						</Picker>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
