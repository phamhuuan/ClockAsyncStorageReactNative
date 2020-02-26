import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import InputName from './InputName';
export default function Name() {
	return (
		<View style={styles.container}>
			<Header />
			<InputName />
		</View>
	);
}
