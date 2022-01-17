import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/test';
import HomePage from './view/homePage';
import BottomTabs from './components/BottomTabs';

export default function App() {
  return (
    <View style={styles.container}>

      <StatusBar style="light" />
      <BottomTabs />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#1c2a35',
  },
});