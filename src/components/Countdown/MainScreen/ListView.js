/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import ViewPager from '@react-native-community/viewpager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import ListItem from './ListItem';
import AddItem from './AddItem';

let datas = [];
function page(i, data) {
	return (
		<View key={i} style={{flex: 1}}>
			<FlatList
				data={data}
				horizontal={false}
				numColumns={3}
				renderItem={({item}) =>
					item.name === null ? <AddItem /> : <ListItem item={item} />
				}
				keyExtractor={key => key.id.toString()}
			/>
		</View>
	);
}
function showData(dataRaw) {
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
function showButton(selectedPage, viewPager) {
	function onChosePage(id) {
		viewPager.current.setPageWithoutAnimation(id);
	}
	return (
		<FlatList
			data={datas}
			keyExtractor={key => key.id.toString()}
			horizontal={true}
			renderItem={({item}) => (
				<MaterialCommunityIcons
					onPress={() => onChosePage(item.id)}
					key={item.id}
					name={item.id === selectedPage ? 'circle' : 'circle-outline'}
					size={20}
					color="red"
				/>
			)}
		/>
	);
}
export default function ListView() {
	const viewPager = useRef();
	const selectedPage = useSelector(
		state => state.selectedPageReducer.selectedPage,
	);
	const dataRaw = useSelector(state => state.dataReducer.dataRaw);
	const dispatch = useDispatch();
	function onPageSelected(event) {
		dispatch({type: 'SELECT_PAGE', value: event.nativeEvent.position});
	}
	return (
		<View style={styles.listView}>
			<ViewPager
				style={{flex: 1}}
				initialPage={selectedPage}
				ref={viewPager}
				onPageSelected={onPageSelected}>
				{showData(dataRaw)}
			</ViewPager>
			<View style={{alignItems: 'center'}}>
				{showButton(selectedPage, viewPager)}
			</View>
		</View>
	);
}
