/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import SoundPlayer from 'react-native-sound-player';

function ListSound(props) {
	const {item} = props;
	const dispatch = useDispatch();
	const choose = useSelector(state => state.chooseSoundReducer.choose);
	const soundName = useSelector(state => state.editAlarmReducer.soundName);
	useEffect(() => {
		dispatch({type: 'SET_CHOOSE', choose: soundName});
	}, [dispatch, soundName]);
	return (
		<TouchableOpacity
			onPress={() => {
				dispatch({
					type: 'CHOOSE_SOUND',
					soundName: item.soundName,
					soundPath: item.soundPath,
				});
				dispatch({
					type: 'SET_CHOOSE',
					choose: item.soundName,
					soundPath: item.soundPath,
				});
				SoundPlayer.playSoundFile(
					item.soundPath.substr(0, item.soundPath.length - 4),
					'mp3',
				);
			}}>
			<View
				style={[
					styles.itemSound,
					{borderBottomColor: choose === item.soundName ? 'tomato' : 'gray'},
				]}>
				<Text
					style={{
						marginLeft: 10,
						fontWeight: 'bold',
						color: choose === item.soundName ? 'tomato' : 'black',
					}}>
					{item.soundName}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default function ChooseSound() {
	const data = useSelector(state => state.chooseSoundReducer.data);
	return (
		<View style={{flex: 1, marginTop: 20}}>
			<FlatList
				data={data}
				keyExtractor={key => key.soundPath}
				horizontal={false}
				numColumns={1}
				renderItem={({item}) => <ListSound item={item} />}
			/>
		</View>
	);
}
