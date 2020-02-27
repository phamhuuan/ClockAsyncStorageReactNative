/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSelector, useDispatch} from 'react-redux';

function ControlColor(props) {
	const {text, value, onValueChange} = props;
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
			}}>
			<Text>{text}</Text>
			<Slider
				onValueChange={newValue => onValueChange(newValue)}
				maximumValue={255}
				minimumValue={0}
				value={value}
				step={1}
				style={{width: 200, marginLeft: 5, marginRight: 5}}
			/>
			<Text>{value}</Text>
		</View>
	);
}

export default function Color() {
	const red = useSelector(state => state.addColorReducer.red);
	const green = useSelector(state => state.addColorReducer.green);
	const blue = useSelector(state => state.addColorReducer.blue);
	const dispatch = useDispatch();
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<View style={{height: 350, width: 300}}>
				<View style={{flex: 3}}>
					<ControlColor
						text="R"
						value={red}
						onValueChange={value => dispatch({type: 'SET_RED', value})}
					/>
					<ControlColor
						text="G"
						value={green}
						onValueChange={value => dispatch({type: 'SET_GREEN', value})}
					/>
					<ControlColor
						text="B"
						value={blue}
						onValueChange={value => dispatch({type: 'SET_BLUE', value})}
					/>
				</View>
				<View
					style={{
						flex: 3,
						backgroundColor: `rgb(${red}, ${green}, ${blue})`,
					}}
				/>
			</View>
		</View>
	);
}
