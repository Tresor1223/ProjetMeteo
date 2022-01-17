import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { API_KEY, API_URL, APIPREVISION_KEY, APIPREVISION_URL } from "../constants";
import moment from 'moment';
import { LinearGradient } from "expo-linear-gradient";
import WeatherIcon from './WeatherIcon';

export default class HomePage extends React.Component {
    state = {
        actualWeather: 0,
        ville: 'Abidjan',
        cnt: 4,
        temps: '',
        humidite: '',
        pressionAtmospherique: '',
        vitesseVent: '',
        J1: '',
        tempminJ1: '',
        tempmaxJ1: '',
        J2: '',
        tempminJ2: '',
        tempmaxJ2: '',
        J3: '',
        tempminJ3: '',
        tempmaxJ3: '',
        matin: '',
        soir: '',
        nuit: '',
        tempJ1: '',
        tempJ2: '',
        tempJ2: '',
        iconTA: '',


    }
    componentDidMount() {
        this.getCityWeather();
        this.getCityWeatherPrevision();
    }
    getCityWeather() {
        axios.get(API_URL + 'q=' + this.state.ville + '&appid=' + API_KEY + '&units=metric&lang=FR')
            .then(response => {
                console.log("Donnée météo chargées");
                this.setState({
                    actualWeather: Math.round(response.data.main.temp),
                    temps: response.data.weather[0].description,
                    humidite: response.data.main.humidity,
                    pressionAtmospherique: response.data.main.pressure,
                    vitesseVent: response.data.wind.speed,
                    iconTA: response.data.weather[0].icon,

                });
                console.log("Temps: " + this.state.temps);
            }).catch(error => {
                console.log("Echec du chargement des données météo");
            });
    }

    getCityWeatherPrevision() {
        axios.get(APIPREVISION_URL + 'q=' + this.state.ville + '&cnt=' + this.state.cnt + '&appid=' + APIPREVISION_KEY + '&units=metric&lang=FR')
            .then(response => {
                console.log("Donnée météo chargées");
                this.setState({
                    J1: moment(response.data.list[1].dt * 1000).format('dddd'),
                    tempminJ1: Math.round(response.data.list[1].temp.min),
                    tempmaxJ1: Math.round(response.data.list[1].temp.max),

                    J2: moment(response.data.list[2].dt * 1000).format('dddd'),
                    tempminJ2: Math.round(response.data.list[2].temp.min),
                    tempmaxJ2: Math.round(response.data.list[2].temp.max),

                    J3: moment(response.data.list[3].dt * 1000).format('dddd'),
                    tempminJ3: Math.round(response.data.list[3].temp.min),
                    tempmaxJ3: Math.round(response.data.list[3].temp.max),

                    matin: Math.round(response.data.list[0].temp.morn),
                    soir: Math.round(response.data.list[0].temp.eve),
                    nuit: Math.round(response.data.list[0].temp.night),
                    tempJ1: response.data.list[1].weather[0].description,
                    tempJ2: response.data.list[2].weather[0].description,
                    tempJ3: response.data.list[3].weather[0].description,


                });
                console.log("Temps J1: " + response.data.list[1].weather[0].description);
                console.log("Temps J2: " + response.data.list[2].weather[0].description);
                console.log("Temps J3: " + response.data.list[3].weather[0].description);
            }).catch(error => {
                console.log("Echec du chargement des données météo");
            });
    }


    render() {
        return (
            <View style={styles.container} >
                <View style={styles.InfoVille}>
                    <View style={styles.InfoVilleTemp}>
                        <Text style={styles.TextNomVile}>{this.state.ville}</Text>
                        <Text style={styles.TextTemp}>{this.state.actualWeather}°</Text>
                        <Text style={styles.Temps}>{this.state.temps}</Text>
                    </View>
                    <WeatherIcon name={this.state.temps} style={styles.iconTempsKilFait} />

                </View>

                <View style={styles.InfoSupVille}>
                    <View style={styles.InfoSup}>
                        <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                        <Text style={styles.TextInfoSup}>{this.state.humidite}%</Text>
                    </View>

                    <View style={styles.InfoSup}>
                        <Ionicons name='speedometer-outline' size={25} color='#657994' style={styles.iconSup} />
                        <Text style={styles.TextInfoSup}>{this.state.pressionAtmospherique}hPa</Text>
                    </View>

                    <View style={styles.InfoSup}>
                        <Image source={require('../assets/img/wind.png')} style={styles.iconVent1} />
                        <Text style={styles.TextInfoSup}>{this.state.vitesseVent}m/s</Text>
                    </View>
                </View>

                <Text style={styles.Day}>Aujourd'hui</Text>

                <View style={styles.ContainInfoTempHeure}>
                    <View style={styles.InfoTempHeure}>
                        <Text style={styles.TextTempHeure}>Matin</Text>
                        <Image source={require('../assets/img/morning.png')} style={styles.iconVent} />
                        <Text style={styles.TempHeure}>{this.state.matin}°</Text>
                    </View>

                    <View style={styles.InfoTempHeure}>
                        <Text style={styles.TextTempHeure}>Soir</Text>
                        <Image source={require('../assets/img/sea.png')} style={styles.iconVent} />
                        <Text style={styles.TempHeure}>{this.state.soir}°</Text>
                    </View>

                    <View style={styles.InfoTempHeure}>
                        <Text style={styles.TextTempHeure}>Nuit</Text>
                        <Image source={require('../assets/img/moon.png')} style={styles.iconVent} />
                        <Text style={styles.TempHeure}>{this.state.nuit}°</Text>
                    </View>
                </View>

                <Text style={styles.Day}>Prévisions</Text>

                <View>
                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J1}</Text>
                        <WeatherIcon name={this.state.tempJ1} style={styles.iconPrevision} />
                        <View style={styles.TempMaxMin}>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ1}°</Text>
                            <Text style={styles.TextTempHeure}>{this.state.tempmaxJ1}°</Text>
                        </View>
                    </View>

                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J2}</Text>
                        <WeatherIcon name={this.state.tempJ2} style={styles.iconPrevision} />
                        <View style={styles.TempMaxMin}>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ2}°</Text>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ2}°</Text>
                        </View>
                    </View>

                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J3}</Text>
                        <WeatherIcon name={this.state.tempJ3} style={styles.iconPrevision} />
                        <View style={styles.TempMaxMin}>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ3}°</Text>
                            <Text style={styles.TextTempHeure}>{this.state.tempmaxJ3}°</Text>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2a35',
        alignItems: 'flex-start',
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
    },
    TextNomVile: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
    },
    TextTemp: {
        fontSize: 45,
        color: 'white',
        marginBottom: 10,
    },

    Temps: {
        fontSize: 17,
        color: 'white',
        backgroundColor: '#343168',
        width: 170,
        borderRadius: 20,
        textAlign: 'center',
        padding: 5,
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    InfoSupVille: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        marginBottom: 15,
    },

    TextInfoSup: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 10,
    },
    iconVent: {
        resizeMode: 'contain',
        width: 20,
        height: 30,
        //tintColor: '#657994',
    },

    iconPrevision: {
        width: 40,
        height: 30,
        resizeMode: 'contain',
    },

    iconVent1: {
        resizeMode: 'contain',
        width: 20,
        height: 30,
        tintColor: '#657994',
    },

    InfoSup: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',

    },

    iconTempsKilFait: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },

    InfoVille: {
        display: 'flex',
        flexDirection: 'row',
    },

    Day: {
        color: '#677987',
        fontSize: 17,
        marginLeft: 4,
        marginBottom: 8,
        marginTop: 30,
    },

    InfoTempHeure: {
        display: 'flex',
        height: 100,
        width: 70,
        justifyContent: 'space-around',
        paddingLeft: 7,
    },

    ContainInfoTempHeure: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        width: '100%',
        justifyContent: 'space-between',
    },

    TextTempHeure: {
        color: 'white',

    },

    TempHeure: {
        color: 'white',
        fontSize: 20,
    },

    PrevisionTemp: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 7,
        marginBottom: 8,
    },

    TempMaxMin: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-around'
    }
});