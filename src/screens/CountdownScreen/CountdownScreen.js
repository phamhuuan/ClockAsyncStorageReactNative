import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import AddScreen from './AddScreen';
import EditScreen from './EditScreen';

const Stack = createStackNavigator();

export default function CountdownScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Hẹn giờ"
				component={MainScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Thêm bộ hẹn giờ"
				component={AddScreen}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Sửa bộ hẹn giờ"
				component={EditScreen}
				options={{headerShown: false}}
			/>
		</Stack.Navigator>
	);
}
