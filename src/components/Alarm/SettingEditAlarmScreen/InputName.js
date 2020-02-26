/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
export default function InputName() {
	const dispatch = useDispatch();
	const textInputValue = useSelector(
		state => state.textInputReducer.textInputValue,
	);
	const start = useSelector(state => state.selectionReducer.start);
	const end = useSelector(state => state.selectionReducer.end);
	const name = useSelector(state => state.editAlarmReducer.name);
	useEffect(() => {
		dispatch({type: 'SET_TEXT', value: name});
		dispatch({
			type: 'SET_SELECTION',
			start: 0,
			end: name.length,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	return (
		<View style={{flex: 1, alignItems: 'center'}}>
			<TextInput
				style={styles.textInput}
				autoFocus={true}
				maxLength={25}
				value={textInputValue}
				onChangeText={text => {
					dispatch({
						type: 'SET_SELECTION',
						start: text.length,
						end: text.length,
					});
					dispatch({type: 'ALARM_NAME_EDIT', value: text});
					dispatch({type: 'SET_TEXT', value: text});
				}}
				selection={{start, end}}
				caretHidden={true}
				placeholder="Nhập tên bộ hẹn giờ"
			/>
		</View>
	);
}
