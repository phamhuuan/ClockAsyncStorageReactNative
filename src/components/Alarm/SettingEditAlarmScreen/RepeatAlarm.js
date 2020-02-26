/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import ChooseDay from './ChooseDay';
export default function RepeatAlarm() {
	return (
		<View style={styles.container}>
			<Header />
			<View style={{height: 20}} />
			<ChooseDay />
		</View>
	);
}
