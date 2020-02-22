import React, {useEffect} from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

export default function InputName() {
	const route = useRoute();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({type: 'SET_TEXT', value: route.params.item.name});
		dispatch({
			type: 'SET_SELECTION',
			start: 0,
			end: route.params.item.name.length,
		});
	}, [dispatch, route.params.item.name]);
	const textInputValue = useSelector(
		state => state.textInputReducer.textInputValue,
	);
	const start = useSelector(state => state.selectionReducer.start);
	const end = useSelector(state => state.selectionReducer.end);
	return (
		<View style={styles.textInputView}>
			<TextInput
				style={styles.textInput}
				autoFocus={true}
				maxLength={25}
				value={textInputValue}
				onChangeText={text => {
					dispatch({type: 'TYPING', text: text});
					dispatch({
						type: 'SET_SELECTION',
						start: text.length,
						end: text.length,
					});
				}}
				selection={{start, end}}
				caretHidden={true}
				placeholder="Nhập tên bộ hẹn giờ"
			/>
		</View>
	);
}
