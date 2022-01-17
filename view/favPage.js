import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_KEY, API_URL, APIPREVISION_KEY, APIPREVISION_URL } from "../constants";
import axios from 'axios';
import GeoDBCitiesSearch from 'react-native-geodb';
import WeatherIcon from './WeatherIcon';
import { useSelector, useDispatch } from 'react-redux';
import removeFavs, { addFavs } from '../redux/actions/favs';
import { bindActionCreators } from 'redux';


export default FavPage = ({ navigation, route }) => {
    const { favoris } = useSelector(state => state.favReducer);
    const dispatch = useDispatch();
    const actions = bindActionCreators({
        addFavs,
        removeFavs,
    }, dispatch);
    const [villes, setVilles] = useState(
        {
            source: [
                { 'ville': 'Abidjan', 'temp': 0 },
                { 'ville': 'Man', 'temp': 0 },
                { 'ville': 'Bouaké', 'temp': 0 },
                { 'ville': 'San-Pédro', 'temp': 0 },
                { 'ville': 'Paris', 'temp': 0 },
                { 'ville': 'Bruxelles', 'temp': 0 },
            ],
        });
    /*
const getCitiesWeather = () => {
    var tempVille = villes.source;
    for (var i = 0; i < tempVille.length; i++) {
        tempVille[i] = axios.get(API_URL + 'q=' + tempVille[i].ville + '&appid=' + API_KEY + '&units=metric&lang=FR')
            .then(response => {
                //tempVille[i].temp = response.data.main.temp;
                console.log(response.data.main.temp);
                // Valeurs à afficher
                console.log("descriptionDuTemps: " + response.data.weather[0].description);
                return {
                    'ville': tempVille[i].ville,
                    'temp': Math.round(response.data.main.temp),
                    'humidite': Math.round(response.data.main.humidity),
                    'pressionAtmospherique': Math.round(response.data.main.pressure),
                    'vitesseVent': Math.round(response.data.wind.speed),
                    'pays': response.data.sys.country,
                    'descriptionDuTemps': response.data.weather[0].description,
                };
            }).catch(error => {
                console.log(error);
                console.log("Echec du chargement des données météoSSSSS");
                return 'error';
            });
    }
    setVilles({
        source: tempVille
    });
}
*/
    const renderFavoris = (favoris, index) => {
        return (
            <TouchableOpacity
                style={styles.ContainTempVille}
                onPress={() => {
                    navigation.navigate('ficheVille', {
                        CityName: favoris.ville,
                    });
                }}
            >
                <View style={styles.ContainTempVille}>
                    <View style={styles.ContainTempVilleTop}>
                        <View style={styles.TempVilleText}>
                            <Text style={styles.TempText}>{favoris.temp}°</Text>
                            <Text style={styles.TextVilleHumVent}>{favoris.ville}</Text>
                            <Text style={styles.NomPays}>{favoris.pays}</Text>
                        </View>
                        <View>
                            <WeatherIcon name={favoris.descriptionDuTemps} style={styles.iconTemp} />
                        </View>
                    </View>

                    <View style={styles.ContainValeurHumidVent}>
                        <View style={styles.ValeurHumidVent}>
                            <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                            <Text style={styles.TextVilleHumVent}>{favoris.humidite}%</Text>
                        </View>

                        <View style={styles.ValeurHumidVent}>
                            <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                            <Text style={styles.TextVilleHumVent}>{favoris.vitesseVent} m/s</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container} >
            <StatusBar style='light' />

            <View style={styles.body}>
                <FlatList
                    data={favoris}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item, index }) => renderFavoris(item, index)}
                    //Setting the number of column
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
    },

    ValeurHumidVent: {
        display: 'flex',
        flexDirection: 'row',
        padding: 8,

        //width: '100%',
    },

    ContainValeurHumidVent: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    iconTemp: {
        resizeMode: 'contain',
        width: 50,
        height: 60,
        //tintColor: '#657994',
        marginRight: 10,
        marginTop: 10,
    },

    ContainTempVilleTop: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    TextVilleHumVent: {
        color: 'white',
    },

    ContainTempVille: {
        backgroundColor: '#354b60',
        width: '47%',
        height: 170,
        borderRadius: 15,
        justifyContent: 'space-around',
        margin: 5,
    },

    TempVilleText: {
        height: '70%',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 5,
    },

    TempText: {
        color: 'white',
        fontSize: 25,
    },
    view: {
        flex: 0.8,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        display: 'flex',
        flex: 0.4,
        alignItems: 'center',
        width: '100%',
        height: 70,
        //backgroundColor: 'red',
        borderRadius: 20,
    },

    iconVent: {
        resizeMode: 'contain',
        width: 20,
        height: 30,
        tintColor: '#657994',
    },

    searchbar: {
        display: 'flex',
        flex: 0.6,
        width: '100%',
        height: 70,
        backgroundColor: '#121212',
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },

    Containsearchbar: {
        width: '100%',
        marginBottom: 20,
    },

    grid: {
        //backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
    },

    NomPays: {
        color: '#657994'
    }

});