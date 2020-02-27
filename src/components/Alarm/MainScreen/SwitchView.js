import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {Switch} from 'react-native-switch';
export default function SwitchView(props) {
	const dispatch = useDispatch();
	const {item} = props;
	return (
		<View style={styles.switchView}>
			<Switch
				activeText={''}
				inActiveText={''}
				backgroundActive={`rgb(${item.red},${item.green},${item.blue})`}
				backgroundInactive={'gray'}
				onValueChange={() =>
					item.isOn
						? dispatch({type: 'SET_OFF', id: item.id})
						: dispatch({type: 'SET_ON', id: item.id})
				}
				value={item.isOn}
			/>
		</View>
	);
}
