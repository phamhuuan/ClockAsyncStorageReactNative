/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {store, persistedStore} from './src/reducers';
function MyApp() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistedStore}>
				<App />
			</PersistGate>
		</Provider>
	);
}
AppRegistry.registerComponent(appName, () => MyApp);
