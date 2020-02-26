import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import AddScreen from './AddScreen';
import SettingAddAlarmScreen from './SettingAddAlarmScreen';
import EditScreen from './EditScreen';
import SettingEditAlarmScreen from './SettingEditScreen';

const Stack = createStackNavigator();

export default function CountdownScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Báo thức"
				component={MainScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Thêm báo thức"
				component={AddScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Cài đặt thêm báo thức"
				component={SettingAddAlarmScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Sửa báo thức"
				component={EditScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Cài đặt sửa báo thức"
				component={SettingEditAlarmScreen}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	);
}
