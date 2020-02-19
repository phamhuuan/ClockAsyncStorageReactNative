/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Header from './Header';
import storage from '../../storage';
import TimePicker from './TimePicker';
import Control from './Control';
import ShowTime from './ShowTime';
import {scheduleNotification, cancelNotification} from './handle';
import ViewPager from '@react-native-community/viewpager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

let dataRaw = [
	{
		id: 1,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 2,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 3,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 4,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 5,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 6,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 7,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 8,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 9,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 10,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 11,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 12,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 13,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 14,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 15,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 16,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 17,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 18,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 19,
		time: 1400,
		name: 'Rán trứng',
	},
];
let datas = [];
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
	const expectedTime = useSelector(
		state => state.countdownReducer.expectedTime,
	);
	const dispatch = useDispatch();
	const viewPager = useRef();
	useEffect(() => {
		if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
			dispatch({type: 'SECONDS', value: 1});
		}
	}, [dispatch, selectedHours, selectedMinutes, selectedSeconds]);
	// useEffect(() => {
	// 	dispatch({type: 'GET_STATE_COUNTDOWN'});
	// }, [dispatch]);
	useEffect(() => {
		let interval;
		if (start && time >= 0 && !pause) {
			interval = setInterval(() => {
				dispatch({type: 'COUNTDOWN'});
			}, 300);
		}
		return () => clearInterval(interval);
	}, [dispatch, pause, start, time]);
	function onSelectHours(value) {
		dispatch({type: 'HOURS', value});
	}
	function onSelectMinutes(value) {
		dispatch({type: 'MINUTES', value});
	}
	function onSelectSeconds(value) {
		dispatch({type: 'SECONDS', value});
	}
	function onStart() {
		dispatch({
			type: 'START_COUNTDOWN',
			value: 3600 * selectedHours + 60 * selectedMinutes + selectedSeconds,
		});
	}
	function onCancel() {
		dispatch({type: 'CANCEL_COUNTDOWN'});
	}
	function onPause() {
		dispatch({type: 'PAUSE_COUNTDOWN'});
	}
	function onContinue() {
		dispatch({
			type: 'COUNTINUE_COUNTDOWN',
			value: 3600 * selectedHours + 60 * selectedMinutes + selectedSeconds,
		});
	}
	function onStartOrCancel() {
		start ? onCancel() : onStart();
	}
	function onPauseOrContinue() {
		pause ? onContinue() : onPause();
	}
	function page(i, data) {
		return (
			<View key={i} style={{flex: 1}}>
				<FlatList
					data={data}
					horizontal={false}
					numColumns={3}
					renderItem={({item}) => (
						<TouchableOpacity>
							<View
								style={{
									width: Dimensions.get('window').width / 3 - 10,
									height: (Dimensions.get('window').height - 150) * 0.2 - 20,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: 'gray',
									margin: 5,
								}}>
								<View
									style={{
										height: 30,
										width: Dimensions.get('window').width / 3 - 10,
										padding: 5,
									}}>
									<Text style={{fontWeight: 'bold'}}>{item.name}</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
					keyExtractor={key => key.id.toString()}
				/>
			</View>
		);
	}
	function showData() {
		let i;
		datas = [];
		for (i = 0; i < Math.ceil(dataRaw.length / 6); i++) {
			datas = [
				...datas,
				{data: dataRaw.slice(6 * i, 6 * i + 6), id: datas.length},
			];
		}
		return datas.map((data, index = 0) => page(index++, data.data));
	}
	function showButton() {
		return (
			<FlatList
				data={datas}
				keyExtractor={key => key.id.toString()}
				horizontal={true}
				renderItem={({item}) => (
					<MaterialCommunityIcons
						key={item.id}
						name={item.id === selectedPage ? 'circle' : 'circle-outline'}
						size={20}
						color="red"
					/>
				)}
			/>
		);
	}
	function onPageSelected(event) {
		setSelectedPage(event.nativeEvent.position);
	}
	return (
		<View style={styles.container}>
			<Header />
			{start ? (
				<ShowTime time={time} />
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
						<ViewPager
							style={{flex: 1}}
							ref={viewPager}
							onPageSelected={onPageSelected}>
							{showData()}
						</ViewPager>
						<View style={{alignItems: 'center'}}>{showButton()}</View>
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
