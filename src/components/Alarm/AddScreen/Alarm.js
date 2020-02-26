import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import TimePicker from './TimePicker';
import Setting from './Setting';
export default function Alarm() {
	return (
		<View style={styles.container}>
			<Header />
			<TimePicker />
			<Setting />
		</View>
	);
}
