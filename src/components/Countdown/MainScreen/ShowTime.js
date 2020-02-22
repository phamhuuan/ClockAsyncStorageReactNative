/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {handleTime} from './handle';
import {useSelector, useDispatch} from 'react-redux';

export default function ShowTime() {
	const start = useSelector(state => state.countdownReducer.start);
	const pause = useSelector(state => state.countdownReducer.pause);
	const time = useSelector(state => state.countdownReducer.time);
	const dispatch = useDispatch();
	useEffect(() => {
		let interval;
		if (start && time >= 0 && !pause) {
			interval = setInterval(() => {
				dispatch({type: 'COUNTDOWN'});
			}, 300);
		}
		return () => clearInterval(interval);
	}, [dispatch, pause, start, time]);
	return (
		<View style={styles.countdown}>
			<View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontSize: 50}}>{handleTime(time)}</Text>
			</View>
			<View style={{flex: 2}} />
		</View>
	);
}
