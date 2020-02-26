/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import TimeView from './TimeView';
import SwitchView from './SwitchView';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function Item(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const {item} = props;
	function gotoEditScreen() {
		dispatch({type: 'SET_ALARM_INFO', item: item});
		navigation.push('Sửa báo thức');
	}
	return (
		<View style={[styles.itemView, {backgroundColor: 'transparent'}]}>
			<View style={[styles.swipeout, {backgroundColor: '#ffffff'}]}>
				<TouchableOpacity onPress={gotoEditScreen}>
					<View
						style={[
							{flexDirection: 'row', height: 80, opacity: item.isOn ? 1 : 0.1},
						]}>
						<TimeView item={item} />
						<SwitchView item={item} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
