/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {handleTime} from './handle';

export default function ShowTime() {
	const time = useSelector(state => state.stopWatchReducer.time);
	const isStart = useSelector(state => state.stopWatchReducer.isStart);
	const dispatch = useDispatch();
	useEffect(() => {
		let interval;
		if (isStart) {
			interval = setInterval(() => {
				dispatch({type: 'TIMING'});
			}, 50);
		}
		return () => clearInterval(interval);
	}, [dispatch, isStart]);
	return (
		<View style={styles.body}>
			<Text style={{fontSize: 50}}>{handleTime(time / 100)}</Text>
		</View>
	);
}
