/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import InputName from './InputName';
import TimePicker from './TimePicker';

export default function Countdown() {
	return (
		<View style={styles.container}>
			<Header />
			<InputName />
			<TimePicker />
			<View style={{flex: 2.2}} />
		</View>
	);
}
