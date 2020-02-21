import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import ListResult from './ListResult';
import ShowTime from './ShowTime';
import Control from './Control';

export default function StopWatch() {
	return (
		<View style={styles.container}>
			<Header />
			<ShowTime />
			<ListResult />
			<Control />
		</View>
	);
}
