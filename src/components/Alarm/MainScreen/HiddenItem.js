/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {useDispatch} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default function HiddenItem(props) {
	const {item} = props;
	const dispatch = useDispatch();
	return (
		<Animated.View
			style={{
				height: 80,
				width: 80,
				alignItems: 'center',
				alignSelf: 'flex-end',
				marginTop: 5,
				justifyContent: 'center',
				borderRadius: 40,
				backgroundColor: '#ffe6e6',
				elevation: 3,
			}}>
			<TouchableOpacity
				onPress={() => dispatch({type: 'DELETE_ALARM', id: item.id})}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<EvilIcons name="trash" color="tomato" size={60} />
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
}
