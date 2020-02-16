/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Header from './Header';
import {handleTime} from './handle';
import storage from '../../storage';
import TimePicker from './TimePicker';
import Control from './Control';

export default function Countdown() {
	const [selectedHours, setSelectedHours] = useState(0);
	const [selectedMinutes, setSelectedMinutes] = useState(2);
	const [selectedSeconds, setSelectedSeconds] = useState(0);
	const [start, setStart] = useState(false);
	const [pause, setPause] = useState(false);
	const [time, setTime] = useState(0);
	const [expectedTime, setExpectedTime] = useState(null);
	useEffect(() => {
		async function getExpectedTime() {
			let tmpExpectedTime = await storage.get('time-expected-countdown');
			tmpExpectedTime =
				tmpExpectedTime === null || tmpExpectedTime === 'NaN'
					? 0
					: JSON.parse(tmpExpectedTime);
			let tmpTimeLeft = await storage.get('time-left-countdown');
			let tmpNow = Math.round(new Date().getTime() / 1000);
			if (tmpNow >= tmpExpectedTime && tmpExpectedTime !== 0) {
				await storage.set('start-countdown', JSON.stringify(false));
				await storage.set('pause-countdown', JSON.stringify(false));
				setStart(false);
				setPause(false);
			} else if (tmpNow < tmpExpectedTime) {
				setTime(tmpExpectedTime - tmpNow);
				await storage.set(
					'time-left-countdown',
					JSON.stringify(tmpExpectedTime - tmpNow),
				);
				await storage.set('start-countdown', JSON.stringify(true));
				await storage.set('pause-countdown', JSON.stringify(false));
				setStart(true);
				setPause(false);
				setExpectedTime(tmpExpectedTime);
			} else if (JSON.parse(tmpTimeLeft) > 0 && tmpExpectedTime === 0) {
				setTime(JSON.parse(tmpTimeLeft));
				await storage.set('start-countdown', JSON.stringify(true));
				await storage.set('pause-countdown', JSON.stringify(true));
				setStart(true);
				setPause(true);
			}
		}
		getExpectedTime();
	}, []);
	useEffect(() => {
		let interval;
		if (start && time >= 0 && !pause) {
			interval = setInterval(() => {
				async function getTime() {
					if (time <= 1) {
						setTime(0);
						setStart(false);
						setPause(false);
						setExpectedTime(null);
						await storage.remove('time-left-countdown');
						await storage.set('start-countdown', JSON.stringify(false));
						await storage.set('pause-countdown', JSON.stringify(false));
						await storage.remove('time-expected-countdown');
					} else {
						let tmp = JSON.parse(await storage.get('time-left-countdown'));
						setTime(tmp - 1);
						await storage.set('time-left-countdown', JSON.stringify(tmp - 1));
					}
				}
				getTime();
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [expectedTime, pause, start, time]);
	function onSelectHours(item) {
		setSelectedHours(item);
	}
	function onSelectMinutes(item) {
		setSelectedMinutes(item);
	}
	function onSelectSeconds(item) {
		setSelectedSeconds(item);
	}
	function onStart() {
		async function handleOnStart() {
			let tmpTime =
				3600 * selectedHours + 60 * selectedMinutes + selectedSeconds;
			let tmpNow = Math.round(new Date().getTime() / 1000);
			await storage.set(
				'time-expected-countdown',
				JSON.stringify(tmpNow + tmpTime),
			);
			await storage.set('time-left-countdown', JSON.stringify(tmpTime));
			await storage.set('start-countdown', JSON.stringify(true));
			setExpectedTime(tmpNow + tmpTime);
			setTime(tmpTime);
			setStart(true);
		}
		handleOnStart();
	}
	function onCancel() {
		async function handleOnCancel() {
			await storage.set('start-countdown', JSON.stringify(false));
			await storage.set('pause-countdown', JSON.stringify(false));
			await storage.remove('time-left-countdown');
			await storage.remove('time-expected-countdown');
			setExpectedTime(null);
			setTime(0);
			setStart(false);
			setPause(false);
		}
		handleOnCancel();
	}
	function onPause() {
		async function handleOnPause() {
			await storage.set('time-left-countdown', JSON.stringify(time));
			await storage.set('pause-countdown', JSON.stringify(true));
			await storage.remove('time-expected-countdown');
			setPause(true);
		}
		handleOnPause();
	}
	function onContinue() {
		async function handleOnContinue() {
			let tmpNow = Math.round(new Date().getTime() / 1000);
			setExpectedTime(tmpNow + time);
			await storage.set(
				'time-expected-countdown',
				JSON.stringify(tmpNow + time),
			);
			await storage.set('pause-countdown', JSON.stringify(false));
			setPause(false);
		}
		handleOnContinue();
	}
	function onStartOrCancel() {
		start ? onCancel() : onStart();
	}
	function onPauseOrContinue() {
		pause ? onContinue() : onPause();
	}
	return (
		<View style={styles.container}>
			<Header />
			{start ? (
				<View style={styles.countdown}>
					<View
						style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: 50}}>{handleTime(time)}</Text>
					</View>
					<View style={{flex: 2}} />
				</View>
			) : (
				<View style={styles.body}>
					<TimePicker
						selectedHours={selectedHours}
						onSelectHours={onSelectHours}
						selectedMinutes={selectedMinutes}
						onSelectMinutes={onSelectMinutes}
						selectedSeconds={selectedSeconds}
						onSelectSeconds={onSelectSeconds}
					/>
					<View style={styles.listView}>
						<Text>Hi</Text>
					</View>
				</View>
			)}
			<Control
				onStartOrCancel={onStartOrCancel}
				onPauseOrContinue={onPauseOrContinue}
				start={start}
				pause={pause}
			/>
		</View>
	);
}
