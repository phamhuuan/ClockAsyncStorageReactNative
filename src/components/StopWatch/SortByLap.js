/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';

export default function SortByLap() {
	const dispatch = useDispatch();
	function onSortLap() {
		dispatch({type: 'SORT_BY_LAP'});
	}
	return (
		<View style={styles.buttonView}>
			<TouchableOpacity
				onPress={onSortLap}
				style={[styles.startButton, {backgroundColor: '#ff8500'}]}>
				<Text>Sort by lap</Text>
			</TouchableOpacity>
		</View>
	);
}
