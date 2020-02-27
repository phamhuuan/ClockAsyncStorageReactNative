/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import TimeInterval from 'react-native-clock-interval';
import ClockFace from './ClockFace';
function pad(num) {
	return num < 10 ? `0${num}` : num;
}
function formatTime({hour, minute}) {
	return `${pad(hour)}:${pad(minute)}`;
}

export default function Clock(props) {
	const {item} = props;
	const [hour, setHour] = useState(new Date().getHours());
	const [minute, setMinute] = useState(new Date().getMinutes());
	return (
		<View>
			<View style={styles.layer}>
				<ClockFace size={70} />
			</View>
			<View style={styles.layer}>
				<Text style={{fontSize: 10}}>{formatTime({hour, minute})}</Text>
				<Text style={{fontSize: 10}}>
					{formatTime({hour: item.hour, minute: item.minute})}
				</Text>
			</View>
			<TimeInterval
				disabled={false}
				allowLineDrag={true}
				componentSize={80}
				indicatorSize={10}
				step={1}
				lineColor={`rgb(${item.red},${item.green},${item.blue})`}
				lineWidth={5}
				start={{hour, minute}}
				stop={{hour: item.hour, minute: item.minute}}
				onRelease={() => {}}
				startIndicator={() => {}}
				stopIndicator={() => {}}
			/>
		</View>
	);
}
