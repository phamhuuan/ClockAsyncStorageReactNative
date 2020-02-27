/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import styles from './styles';
import Header from './Header';
import ListView from './ListView';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {removeAlarm, setAlarm} from '../handle';
export default function Alarm() {
	const data = useSelector(state => state.alarmReducer.data);
	const dispatch = useDispatch();
	useEffect(() => {
		// hanle su kien bam nut tat tren thong bao
		PushNotification.registerNotificationActions(['Tắt']);
		DeviceEventEmitter.addListener('notificationActionReceived', function(
			action,
		) {
			const info = JSON.parse(action.dataJSON);
			console.log(info.id);
			const length = data.length;
			if (info.action === 'Tắt') {
				if (info.repeatType === null) {
					dispatch({type: 'SET_OFF', id: info.id});
					for (let i = 0; i < length; i++) {
						if (info.id === data[i].id) {
							removeAlarm(data[i]);
						}
					}
				} else {
					for (let i = 0; i < length; i++) {
						if (
							info.id.substr(0, info.id.length - 1) === data[i].id ||
							info.id.substr(0, info.id.length - 2) === data[i].id
						) {
							removeAlarm(data[i]);
							setAlarm(data[i]);
						}
					}
				}
			}
		});
	}, [data, dispatch]);
	return (
		<View style={styles.container}>
			<Header />
			<View style={{height: 20}} />
			<ListView />
		</View>
	);
}
