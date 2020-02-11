/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5';
import StopWatchScreen from './screens/StopWatchScreen';

const Tab = createBottomTabNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({route}) => ({
					tabBarIcon: ({focused}) => {
						if (route.name === 'Bấm giờ') {
							return (
								<FontAwesome5Pro
									name="stopwatch"
									size={focused ? 30 : 20}
									color={focused ? 'tomato' : 'gray'}
								/>
							);
						} else if (route.name === 'Bấm giờ giớ bầm') {
							return (
								<FontAwesome5Pro
									name="gift"
									size={focused ? 30 : 20}
									color={focused ? 'tomato' : 'gray'}
								/>
							);
						}
					},
				})}
				swipeEnabled={true}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
					style: {
						backgroundColor: 'white',
					},
				}}>
				<Tab.Screen name="Bấm giờ" component={StopWatchScreen} />
				{/* <Tab.Screen name="Bấm giờ giớ bầm" component={StopWatchScreen} /> */}
			</Tab.Navigator>
		</NavigationContainer>
	);
}
