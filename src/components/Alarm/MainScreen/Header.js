/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
export default function Header() {
	const navigation = useNavigation();
	return (
		<View style={styles.header}>
			<View style={{flex: 2}} />
			<View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.headerText}>Báo thức</Text>
			</View>
			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
				}}>
				<TouchableOpacity onPress={() => navigation.push('Thêm báo thức')}>
					<Ionicons name="ios-add" size={40} color="tomato" />
				</TouchableOpacity>
			</View>
		</View>
	);
}
