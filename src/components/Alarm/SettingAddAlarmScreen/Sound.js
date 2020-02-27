import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import ChooseSound from './ChooseSound';
export default function Sound() {
	return (
		<View style={styles.container}>
			<Header />
			<ChooseSound />
		</View>
	);
}
