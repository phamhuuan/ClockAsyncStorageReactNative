import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = {
	container: {
		flex: 1,
	},
	header: {
		height: 65,
		backgroundColor: '#eceff1',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	listView: {
		flex: 1,
	},
	itemView: {
		height: 80,
		alignItems: 'center',
		backgroundColor: '#eceff1',
		alignSelf: 'center',
		margin: 5,
	},
	swipeout: {borderRadius: 40, height: 80, width: width, elevation: 2},
	item: {
		height: 80,
		width: width,
		borderBottomLeftRadius: 40,
		borderTopLeftRadius: 40,
		borderColor: 'red',
	},
	timeView: {
		flex: 2,
		justifyContent: 'flex-end',
		paddingLeft: 90,
	},
	switchView: {
		flex: 1.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
};

export default styles;
