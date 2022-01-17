import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomTabs from './BottomTabs';

export default function MainApp() {
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