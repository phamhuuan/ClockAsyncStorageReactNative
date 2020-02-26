/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {handleDay} from '../handle';

function parse(number) {
	return number < 10 ? `0${number}` : `${number}`;
}

export default function TimeView(props) {
	const {item} = props;
	return (
		<View style={{flex: 5}}>
			<View style={styles.timeView}>
				<Text style={{fontSize: 40}}>
					{parse(item.hour) + ':' + parse(item.minute)}
				</Text>
			</View>
			<View style={{flex: 1, paddingLeft: 90}}>
				<Text style={{fontSize: 10}}>{`${item.name}, ${handleDay(
					item.repeatAlarm,
				)}`}</Text>
			</View>
		</View>
	);
}
