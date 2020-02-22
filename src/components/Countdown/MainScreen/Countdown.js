import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import TimePicker from './TimePicker';
import Control from './Control';
import ShowTime from './ShowTime';
import {useSelector} from 'react-redux';
import ListView from './ListView';

export default function Countdown() {
	const start = useSelector(state => state.countdownReducer.start);
	return (
		<View style={styles.container}>
			<Header />
			{start ? (
				<ShowTime />
			) : (
				<View style={styles.body}>
					<TimePicker />
					<ListView />
				</View>
			)}
			<Control />
		</View>
	);
}
