import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../view/homePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CityView from '../view/cityView';
import FavPage from '../view/favPage';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // Icones des boutons
                    if (route.name === 'Accueil') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Villes') {
                        iconName = focused
                            ? 'ios-flag'
                            : 'ios-flag-outline';
                    } else if (route.name === 'Favoris') {
                        iconName = focused
                            ? 'ios-heart'
                            : 'ios-heart-outline';
                    } else if (route.name === 'FicheVille') {
                        iconName = focused
                            ? 'ios-document'
                            : 'ios-document-outline';
                    }

                    //Affichage
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#e567a4', // Couleur avec focus
                tabBarInactiveTintColor: '#343168', // Couleur sans le focus
            })
            }>
                <Tab.Screen name="Accueil" component={HomePage} />
                <Tab.Screen name="Villes" component={CityView} />
                <Tab.Screen name="Favoris" component={FavPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        width: '100%',
        height: 70,
        backgroundColor: '#121212',
        borderTopColor: 'transparent',
        //marginBottom: 20,
        shadowColor: 'transparent',
    },
});