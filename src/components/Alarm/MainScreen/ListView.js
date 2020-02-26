import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import Item from './Item';
import {SwipeListView} from 'react-native-swipe-list-view';
import HiddenItem from './HiddenItem';

export default function ListView() {
	const data = useSelector(state => state.alarmReducer.data);
	function renderItem({item}) {
		return <Item item={item} />;
	}
	function renderHiddenItem({item}) {
		return <HiddenItem item={item} />;
	}
	return (
		<View style={styles.listView}>
			<SwipeListView
				useFlatList={true}
				data={data}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-80}
				previewRowKey={'0'}
				stopRightSwipe={-80}
				previewOpenDelay={3000}
				disableRightSwipe={true}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}
