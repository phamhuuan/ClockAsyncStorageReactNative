/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

export default function SortByResult() {
	const buttonName = useSelector(state => state.sortReducer.buttonName);
	const dispatch = useDispatch();

	function onSortTime() {
		switch (buttonName) {
			case 'Best to worst':
				dispatch({type: 'SORT_BEST_TO_WORST'});
				break;
			case 'Worst to best':
				dispatch({type: 'SORT_WORST_TO_BEST'});
				break;
		}
	}
	return (
		<View style={styles.buttonView}>
			<TouchableOpacity
				onPress={onSortTime}
				style={[styles.resetButton, {backgroundColor: '#ff8500'}]}>
				<Text>{buttonName}</Text>
			</TouchableOpacity>
		</View>
	);
}
