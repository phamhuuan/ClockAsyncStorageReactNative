/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Picker} from 'react-native';
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
	const repeatTime = useSelector(state => state.addAlarmReducer.repeatTime);
	const vibrate = useSelector(state => state.addAlarmReducer.vibrate);
	const red = useSelector(state => state.addColorReducer.red);
	const green = useSelector(state => state.addColorReducer.green);
	const blue = useSelector(state => state.addColorReducer.blue);
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
			{1 + 0 === 1 ? null : (
				<TouchableOpacity
					onPress={() =>
						vibrate
							? dispatch({type: 'SET_UNVIBRATE'})
							: dispatch({type: 'SET_VIBRATE'})
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
										? dispatch({type: 'SET_UNVIBRATE'})
										: dispatch({type: 'SET_VIBRATE'})
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
									? dispatch({type: 'SET_UNREPEAT_SOUND'})
									: dispatch({type: 'SET_REPEAT_SOUND'})
							}
							value={repeatSound}
						/>
					</View>
				</View>
			</TouchableOpacity>
			{repeatSound ? (
				<TouchableOpacity>
					<View style={styles.settingView}>
						<View style={{flex: 4}}>
							<Text style={styles.settingText}>Thời gian báo lại</Text>
						</View>
						<View style={{flex: 1}}>
							<Picker
								style={{height: 20, width: 200}}
								selectedValue={repeatTime}
								onValueChange={itemValue =>
									dispatch({type: 'SET_REPEAT_TIME', value: itemValue})
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
			) : null}
			<TouchableOpacity
				onPress={() =>
					navigation.push('Cài đặt thêm báo thức', {nextPage: 'color'})
				}>
				<View style={styles.settingView}>
					<View style={{flex: 4}}>
						<Text style={styles.settingText}>Màu sắc</Text>
					</View>
					<View
						style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<View
							style={{
								height: 20,
								width: 20,
								backgroundColor: `rgb(${red}, ${green}, ${blue})`,
							}}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
