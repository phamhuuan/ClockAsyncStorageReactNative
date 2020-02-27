import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import Color from './Color';
export default function PickColor() {
	return (
		<View style={styles.container}>
			<Header />
			<Color />
		</View>
	);
}
