import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityPage from "./cityPage";
import FicheVille from "./ficheVille";

const Stack = createNativeStackNavigator();

export default function CityView() {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({ headerShown: false })}
        >
            <Stack.Screen name="cityPage" component={CityPage} />
            <Stack.Screen name="ficheVille" component={FicheVille} />
        </Stack.Navigator>
    );
}