import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './components/BottomTabs';
import { connect } from 'react-redux';
import { changeFavs } from './redux/actions/favs';
import { bindActionCreators } from 'redux';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store/configureStore';
import MainApp from './components/MainApp';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <MainApp /> */}
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
});