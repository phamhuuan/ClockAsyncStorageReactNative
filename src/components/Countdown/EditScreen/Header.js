/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
export default function Header() {
	const navigation = useNavigation();
	const route = useRoute();
	const textInputValue = useSelector(
		state => state.textInputReducer.textInputValue,
	);
	const hours = useSelector(state => state.addCountdownReducer.hours);
	const minutes = useSelector(state => state.addCountdownReducer.minutes);
	const seconds = useSelector(state => state.addCountdownReducer.seconds);
	const dispatch = useDispatch();
	function onCancel() {
		dispatch({type: 'RESET_SELECTION'});
		dispatch({type: 'CLEAR_TEXT_INPUT'});
		navigation.goBack();
	}
	function onAddItem() {
		dispatch({type: 'RESET_SELECTION'});
		dispatch({type: 'CLEAR_TEXT_INPUT'});
		dispatch({
			type: 'EDIT_ITEM',
			id: route.params.item.id,
			name: textInputValue,
			time: 3600 * hours + 60 * minutes + seconds,
		});
		dispatch({type: 'HOURS', value: hours});
		dispatch({type: 'MINUTES', value: minutes});
		dispatch({type: 'SECONDS', value: seconds});
		dispatch({
			type: 'SELECT_ITEM',
			item: {
				id: route.params.item.id,
				name: textInputValue,
				time: 3600 * hours + 60 * minutes + seconds,
			},
		});
		dispatch({type: 'RESET_TIME_PICKER'});
		navigation.push('Hẹn giờ');
	}
	return (
		<View style={styles.header}>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity onPress={onCancel}>
					<Text style={{color: 'tomato'}}>{'Cancel'}</Text>
				</TouchableOpacity>
			</View>
			<View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.headerText}>Sửa bộ hẹn giờ</Text>
			</View>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity
					disabled={textInputValue === '' ? true : false}
					onPress={onAddItem}>
					<Text style={{color: textInputValue === '' ? 'gray' : 'tomato'}}>
						{'Save'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
