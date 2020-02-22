/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';

export default function Header() {
	const edit = useSelector(state => state.editReducer.edit);
	const start = useSelector(state => state.countdownReducer.start);
	const dispatch = useDispatch();
	function onFinish() {
		dispatch({type: 'FINISH'});
	}
	function onEdit() {
		dispatch({type: 'EDIT'});
	}
	function onEditOrFinish() {
		edit ? onFinish() : onEdit();
	}
	return (
		<View style={styles.header}>
			<View style={{flex: 2}} />
			<View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.headerText}>Hẹn giờ</Text>
			</View>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				{start ? null : (
					<TouchableOpacity onPress={onEditOrFinish}>
						<Text>{edit ? 'Finish' : 'Edit'}</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
