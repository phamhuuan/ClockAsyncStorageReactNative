import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from './Header';
import TimePicker from './TimePicker';
import Control from './Control';
import ShowTime from './ShowTime';
import {useSelector, useDispatch} from 'react-redux';
import ListView from './ListView';

export default function Countdown() {
	const [selectedPage, setSelectedPage] = useState(0);
	const selectedHours = useSelector(state => state.timeReducer.selectedHours);
	const selectedMinutes = useSelector(
		state => state.timeReducer.selectedMinutes,
	);
	const selectedSeconds = useSelector(
		state => state.timeReducer.selectedSeconds,
	);
	const start = useSelector(state => state.countdownReducer.start);
	const pause = useSelector(state => state.countdownReducer.pause);
	const time = useSelector(state => state.countdownReducer.time);
	const dispatch = useDispatch();
	const viewPager = useRef();
	useEffect(() => {
		if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
			dispatch({type: 'SECONDS', value: 1});
		}
	}, [dispatch, selectedHours, selectedMinutes, selectedSeconds]);
	useEffect(() => {
		let interval;
		if (start && time >= 0 && !pause) {
			interval = setInterval(() => {
				dispatch({type: 'COUNTDOWN'});
			}, 300);
		}
		return () => clearInterval(interval);
	}, [dispatch, pause, start, time]);
	function onPageSelected(event) {
		setSelectedPage(event.nativeEvent.position);
	}
	function onChosePage(id) {
		viewPager.current.setPageWithoutAnimation(id);
	}
	return (
		<View style={styles.container}>
			<Header />
			{start ? (
				<ShowTime time={time} />
			) : (
				<View style={styles.body}>
					<TimePicker />
					<ListView
						onPageSelected={onPageSelected}
						viewPager={viewPager}
						selectedPage={selectedPage}
						onChosePage={onChosePage}
					/>
				</View>
			)}
			<Control />
		</View>
	);
}
