/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import StartOrStop from './StartOrStop';
import ResetOrAddLap from './ResetOrAddLap';
import SortByLap from './SortByLap';
import SortByResult from './SortByResult';

export default function Control() {
	return (
		<View style={styles.controlView}>
			<View style={{flexDirection: 'row'}}>
				<StartOrStop />
				<View style={{height: 50, width: 20}} />
				<ResetOrAddLap />
			</View>
			<View style={{height: 20}} />
			<View style={{flexDirection: 'row'}}>
				<SortByLap />
				<View style={{height: 50, width: 20}} />
				<SortByResult />
			</View>
		</View>
	);
}
