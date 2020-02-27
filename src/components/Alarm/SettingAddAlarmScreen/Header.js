/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SoundPlayer from 'react-native-sound-player';
export default function HeaderRepeatAlarm() {
	const navigation = useNavigation();
	function onGoBack() {
		SoundPlayer.stop();
		navigation.push('Thêm báo thức', {nextPage: 'add'});
	}
	return (
		<View style={styles.header}>
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity onPress={onGoBack}>
					<AntDesign name="left" size={20} color="gray" />
				</TouchableOpacity>
			</View>
			<View style={{flex: 9, justifyContent: 'center'}}>
				<TouchableOpacity onPress={onGoBack}>
					<Text style={styles.headerText}>Quay lại</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
