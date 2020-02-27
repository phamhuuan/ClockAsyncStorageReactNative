import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
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
	},
	boxView: {
		flexDirection: 'row',
		height: 70,
		backgroundColor: '#fefefe',
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 35,
	},
	textInput: {
		height: 50,
		width: 300,
		paddingBottom: -15,
		fontSize: 20,
		textAlign: 'center',
		color: 'tomato',
	},
	itemSound: {
		height: 50,
		width: width - 10,
		borderBottomWidth: 1,
		borderRadius: 5,
		margin: 5,
		justifyContent: 'center',
	},
};

export default styles;
