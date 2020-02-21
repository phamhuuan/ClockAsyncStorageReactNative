/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import ViewPager from '@react-native-community/viewpager';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import ListItem from './ListItem';
import AddItem from './AddItem';
let dataRaw = [
	{
		id: 1,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 2,
		time: 1200,
		name: 'Rán trứng',
	},
	{
		id: 3,
		time: 20,
		name: 'Rán trứng',
	},
	{
		id: 4,
		time: 320,
		name: 'Rán trứng',
	},
	{
		id: 5,
		time: 121,
		name: 'Rán trứng',
	},
	{
		id: 6,
		time: 696,
		name: 'Rán trứng',
	},
	{
		id: 7,
		time: 10000,
		name: 'Rán trứng',
	},
	{
		id: 8,
		time: 505,
		name: 'Rán trứng',
	},
	{
		id: 9,
		time: 452,
		name: 'Rán trứng',
	},
	{
		id: 10,
		time: 362,
		name: 'Rán trứng',
	},
	{
		id: 11,
		time: 263,
		name: 'Rán trứng',
	},
	{
		id: 12,
		time: 542,
		name: 'Rán trứng',
	},
	{
		id: 13,
		time: 225,
		name: 'Rán trứng',
	},
	{
		id: 14,
		time: 1400,
		name: 'Rán trứng',
	},
	{
		id: 15,
		time: 20000,
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
		name: null,
	},
];
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
function showButton(selectedPage, onChosePage) {
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
export default function ListView(props) {
	const {viewPager, onChosePage} = props;
	const selectedPage = useSelector(
		state => state.selectedPageReducer.selectedPage,
	);
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
				{showData()}
			</ViewPager>
			<View style={{alignItems: 'center'}}>
				{showButton(selectedPage, onChosePage)}
			</View>
		</View>
	);
}
