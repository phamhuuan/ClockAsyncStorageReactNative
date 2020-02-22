/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {handleTime} from './handle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

function ListItemEdit(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const {item} = props;
	const edit = useSelector(state => state.editReducer.edit);
	return (
		<View style={{flex: 1, opacity: edit ? 1 : 0}}>
			<View style={{flex: 1}}>
				<TouchableOpacity
					onPress={() => dispatch({type: 'DELETE_ITEM', item})}
					style={{
						height: 20,
						width: 20,
						marginLeft: 80,
						marginTop: 5,
						borderColor: 'tomato',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<SimpleLineIcons name="minus" color="tomato" size={20} />
				</TouchableOpacity>
			</View>
			<View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity
					onPress={() => navigation.push('Sửa bộ hẹn giờ', {item})}
					style={{
						height: 36,
						width: 36,
						alignSelf: 'center',
						borderWidth: 1,
						borderRadius: 18,
						borderColor: 'tomato',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<SimpleLineIcons name="pencil" color="tomato" size={20} />
				</TouchableOpacity>
			</View>
			<View style={{flex: 1}} />
		</View>
	);
}
export default function ListItem(props) {
	const edit = useSelector(state => state.editReducer.edit);
	const {item} = props;
	const selectedItemId = useSelector(
		state => state.selectedItemReducer.selectedItemId,
	);
	const dispatch = useDispatch();
	function onSelectItem(selectedItem) {
		dispatch({type: 'HOURS', value: Math.floor(selectedItem.time / 3600)});
		dispatch({
			type: 'MINUTES',
			value: Math.floor(
				(selectedItem.time -
					3600 * Math.floor(selectedItem.time / 3600) -
					(selectedItem.time % 60)) /
					60,
			),
		});
		dispatch({type: 'SECONDS', value: selectedItem.time % 60});
		dispatch({type: 'SELECT_ITEM', item: selectedItem});
		dispatch({type: 'PRESS'});
	}
	return (
		<TouchableOpacity
			disabled={edit ? true : false}
			onPress={() => onSelectItem(item)}>
			<View
				style={{
					width: Dimensions.get('window').width / 3 - 10,
					height: (Dimensions.get('window').height - 150) * 0.2 - 20,
					borderWidth: 1,
					borderRadius: 5,
					borderColor: edit
						? 'gray'
						: selectedItemId === item.id
						? 'tomato'
						: 'gray',
					margin: 5,
				}}>
				<View
					style={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						position: 'absolute',
						zIndex: edit ? 1 : -1,
					}}>
					<ListItemEdit item={item} />
				</View>
				<View style={{flex: 1, opacity: edit ? 0.2 : 1}}>
					<View
						style={{
							height: 30,
							width: Dimensions.get('window').width / 3 - 10,
							padding: 5,
						}}>
						<Text
							style={{
								fontWeight: 'bold',
								color: edit
									? 'black'
									: selectedItemId === item.id
									? 'tomato'
									: 'black',
							}}>
							{item.name}
						</Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<AntDesign
								name="clockcircleo"
								color={
									edit
										? 'black'
										: selectedItemId === item.id
										? 'tomato'
										: 'black'
								}
								size={20}
							/>
						</View>
						<View
							style={{
								flex: 2,
								paddingLeft: 10,
								justifyContent: 'center',
							}}>
							<Text
								style={{
									color: edit
										? 'black'
										: selectedItemId === item.id
										? 'tomato'
										: 'black',
								}}>
								{handleTime(item.time)}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}
