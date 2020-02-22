/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function AddItem() {
	const edit = useSelector(state => state.editReducer.edit);
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.push('Thêm bộ hẹn giờ')}
			disabled={edit ? true : false}
			style={{opacity: edit ? 0.2 : 1}}>
			<View
				style={{
					width: Dimensions.get('window').width / 3 - 10,
					height: (Dimensions.get('window').height - 150) * 0.2 - 20,
					borderWidth: 1,
					borderRadius: 5,
					borderColor: 'gray',
					margin: 5,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Ionicons name="ios-add" size={40} color="tomato" />
			</View>
		</TouchableOpacity>
	);
}
