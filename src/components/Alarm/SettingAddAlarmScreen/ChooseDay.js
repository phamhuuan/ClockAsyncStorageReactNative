/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {CheckBox} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
export default function ChooseDay() {
	const dispatch = useDispatch();
	const repeatAlarm = useSelector(state => state.addAlarmReducer.repeatAlarm);
	const [count, setCount] = useState(0);
	function onToggle(day) {
		setCount(count + 1);
		return repeatAlarm[day]
			? dispatch({type: 'UNCHECK', day})
			: dispatch({type: 'CHECK', day});
	}
	return (
		<View style={{flex: 1}}>
			<TouchableOpacity onPress={() => onToggle(1)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ hai</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(1)}
							checked={repeatAlarm[1]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(2)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ ba</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(2)}
							checked={repeatAlarm[2]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(3)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ tư</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(3)}
							checked={repeatAlarm[3]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(4)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ năm</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(4)}
							checked={repeatAlarm[4]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(5)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ sáu</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(5)}
							checked={repeatAlarm[5]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(6)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Thứ bảy</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(6)}
							checked={repeatAlarm[6]}
						/>
					</View>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onToggle(0)}>
				<View style={styles.boxView}>
					<View style={{flex: 8, justifyContent: 'center', marginStart: 15}}>
						<Text style={{fontSize: 20}}>Chủ nhật</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', marginRight: 25}}>
						<CheckBox
							onIconPress={() => onToggle(0)}
							checked={repeatAlarm[0]}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}
