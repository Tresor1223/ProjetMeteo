import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { API_KEY, API_URL, APIPREVISION_KEY, APIPREVISION_URL } from "../constants";
import WeatherIcon from './WeatherIcon';
import moment from 'moment';

export default class FicheVille extends React.Component {
    state = {
        actualWeather: 0,
        ville: '',
        cnt: 4,
        temps: '',
        humidite: '',
        pressionAtmospherique: '',
        vitesseVent: '',
        J1: '',
        tempJ1: '',
        tempminJ1: '',
        tempmaxJ1: '',
        J2: '',
        tempJ2: '',
        tempminJ2: '',
        tempmaxJ2: '',
        J3: '',
        tempJ3: '',
        tempminJ3: '',
        tempmaxJ3: '',
    }
    componentDidMount() {
        if (typeof (this.props.route.params) != 'undefined') {
            this.state.ville = this.props.route.params.CityName;
        }
        this.getCityWeather();
        this.getCityWeatherPrevision();

    }
    componentDidUpdate() {

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
            }).catch(error => {
                console.log("Echec du chargement des données météo");
                console.log(error);
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

                    tempsJ1: response.data.list[1].weather[0].description,
                    tempsJ2: response.data.list[2].weather[0].description,
                    tempsJ3: response.data.list[3].weather[0].description,


                });
                console.log("TempsJ1: " + this.state.tempsJ1);
                console.log("TempsJ2: " + this.state.tempsJ2);
                console.log("TempsJ3: " + this.state.tempsJ3);
            }).catch(error => {
                console.log("Echec du chargement des données météo");
            });
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.ContainInfoTop}>
                    <Text style={styles.TextNomVile}>{this.state.ville}</Text>
                    <WeatherIcon name={this.state.temps} style={styles.iconTempsKilFait} />
                    <Text style={styles.TextTemp}>{this.state.actualWeather}°</Text>
                    <Text style={styles.Temps}>{this.state.temps}</Text>
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
                        <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                        <Text style={styles.TextInfoSup}>{this.state.vitesseVent}m/s</Text>
                    </View>
                </View>


                <Text style={styles.Day}>Prévisions</Text>

                <View>
                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J1}</Text>
                        <WeatherIcon name={this.state.tempsJ1} style={styles.iconVent} />
                        <View style={styles.TempMaxMin}>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ1}°</Text>
                            <Text style={styles.TextTempHeure}>{this.state.tempmaxJ1}°</Text>
                        </View>
                    </View>

                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J2}</Text>
                        <WeatherIcon name={this.state.tempsJ2} style={styles.iconVent} />
                        <View style={styles.TempMaxMin}>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ2}°</Text>
                            <Text style={styles.TextTempHeure}>{this.state.tempminJ2}°</Text>
                        </View>
                    </View>

                    <View style={styles.PrevisionTemp}>
                        <Text style={styles.TextTempHeure}>{this.state.J3}</Text>
                        <WeatherIcon name={this.state.tempsJ3} style={styles.iconVent} />
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
    ContainInfoTop: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    TextNomVile: {
        fontSize: 25,
        color: 'white',
        ////fontFamily: 'Montserrat'y,
        marginBottom: 10,
    },
    TextTemp: {
        fontSize: 45,
        color: 'white',
        //fontFamily: 'Montserrat-Bold',
        marginBottom: 10,
    },

    Temps: {
        fontSize: 17,
        color: 'white',
        backgroundColor: '#343168',
        width: 170,
        //fontFamily: 'Montserrat',
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
        //fontFamily: 'Montserrat',
        fontSize: 18,
        paddingLeft: 10,
    },
    iconVent: {
        resizeMode: 'contain',
        width: 20,
        height: 30,
        //tintColor: '#657994',
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
        //fontFamily: 'Montserrat',
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
    },

    TextTempHeure: {
        //fontFamily: 'Montserrat',
        color: 'white',

    },

    TempHeure: {
        color: 'white',
        //fontFamily: 'Montserrat',
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