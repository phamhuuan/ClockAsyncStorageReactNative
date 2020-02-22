import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

export default function InputName() {
	const textInputValue = useSelector(
		state => state.textInputReducer.textInputValue,
	);
	const dispatch = useDispatch();
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
					dispatch({
						type: 'SET_SELECTION',
						start: text.length,
						end: text.length,
					});
					dispatch({type: 'TYPING', text: text});
				}}
				selection={{start, end}}
				caretHidden={true}
				placeholder="Nhập tên bộ hẹn giờ"
			/>
		</View>
	);
}
