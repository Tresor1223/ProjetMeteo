import React from 'react';
import { TouchableOpacity, StatusBar, View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_KEY, API_URL, APIPREVISION_KEY, APIPREVISION_URL } from "../constants";
import axios from 'axios';
import GeoDBCitiesSearch from 'react-native-geodb';
import WeatherIcon from './WeatherIcon';


export default class CityPage extends React.Component {
    state = {
        ville: 'Yamoussoukro',
        searchText: '',
        actualWeather: 0,
        humidite: '',
        pressionAtmospherique: '',
        vitesseVent: '',
        pays: '',
        dataSource: [
            { 'ville': 'Abidjan', 'temp': 0 },
            { 'ville': 'Man', 'temp': 0 },
            { 'ville': 'Bouaké', 'temp': 0 },
            { 'ville': 'San-Pédro', 'temp': 0 },
            { 'ville': 'Paris', 'temp': 0 },
            { 'ville': 'Bruxelles', 'temp': 0 },

        ],
    }
    componentDidMount() {
        this.getCityWeather();

    }
    async getCityWeather() {
        var tempVille = this.state.dataSource;
        for (var i = 0; i < tempVille.length; i++) {
            tempVille[i] = await axios.get(API_URL + 'q=' + tempVille[i].ville + '&appid=' + API_KEY + '&units=metric&lang=FR')
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
        this.setState({
            dataSource: tempVille
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.view}>
                    <StatusBar style='light' />
                    <View style={styles.header}>
                        <GeoDBCitiesSearch
                            languageCode='fr'
                            //debounce={200}
                            hidePoweredBy
                            showActivityIndicator
                            placeholder="Rechercher les villes"
                            placeholderColor="#333"
                            onSelectItem={(data) => {
                                console.log(data.city);
                                this.props.navigation.navigate('ficheVille', {
                                    CityName: data.city,
                                    CountryName: data.country,
                                });
                            }}
                            styles={{
                                textInputContainer: {
                                    width: 320,
                                    height: 60,
                                    backgroundColor: 'white',
                                    borderRadius: 25,
                                    color: 'white',
                                    fontFamily: 'Poppins',
                                    fontSize: 18,
                                    alignItems: 'center',
                                },
                                contentContainer: {
                                    //borderRadius: 25,
                                    backgroundColor: '#121212',
                                },
                                separator: {
                                    alignItems: 'center',
                                },
                                itemContent: {
                                    color: 'white',
                                },
                                itemText: {
                                    color: 'white',
                                },
                                textInput: {
                                    backgroundColor: 'transparent',
                                    width: '100%',
                                    fontSize: 16,
                                    color: 'black',
                                },
                            }}

                            //emptyListImagePlaceholder={require('../../../assets/emptyList.png')}
                            query={{
                                // key: GEODB_API_KEY,
                                api: 'geo',
                                types: 'cities'
                            }}
                            params={{
                                language: 'en',
                                limit: 10,
                                offset: 0
                            }}
                        />
                    </View>

                </View>


                <View style={styles.body}>
                    <FlatList
                        data={this.state.dataSource}
                        contentContainerStyle={styles.grid}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.ContainTempVille}
                                onPress={() => {
                                    this.props.navigation.navigate('ficheVille', {
                                        CityName: item.ville,
                                    });
                                }}
                            >
                                <View style={styles.ContainTempVille}>
                                    <View style={styles.ContainTempVilleTop}>
                                        <View style={styles.TempVilleText}>
                                            <Text style={styles.TempText}>{item.temp}°</Text>
                                            <Text style={styles.TextVilleHumVent}>{item.ville}</Text>
                                            <Text style={styles.NomPays}>{item.pays}</Text>


                                        </View>
                                        <View>
                                            <WeatherIcon name={item.descriptionDuTemps} style={styles.iconTemp} />
                                        </View>
                                    </View>

                                    <View style={styles.ContainValeurHumidVent}>
                                        <View style={styles.ValeurHumidVent}>
                                            <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                                            <Text style={styles.TextVilleHumVent}>{item.humidite}%</Text>
                                        </View>

                                        <View style={styles.ValeurHumidVent}>
                                            <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                                            <Text style={styles.TextVilleHumVent}>{item.vitesseVent} m/s</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        //Setting the number of column
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View >
        );
    }
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