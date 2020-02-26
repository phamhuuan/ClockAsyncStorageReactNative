import React from 'react';
import {useRoute} from '@react-navigation/native';
import RepeatAlarm from './RepeatAlarm';
import Name from './Name';
import Sound from './Sound';
export default function Alarm() {
	const route = useRoute();
	switch (route.params.nextPage) {
		case 'repeatAlarm':
			return <RepeatAlarm />;
		case 'name':
			return <Name />;
		case 'sound':
			return <Sound />;
		default:
			return null;
	}
}
