import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { API_KEY, API_URL, APIPREVISION_KEY, APIPREVISION_URL } from "../constants";
import WeatherIcon from './WeatherIcon';
import moment from 'moment';
import { addFavs, removeFavs } from '../redux/actions/favs';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import favReducer from '../redux/reducers/favReducer';

export default FicheVille = ({ navigation, route }) => {

    const [isFav, setIsFav] = useState(false)
    const { favs } = useSelector(state => state.favReducer)
    //console.log(favs)
    const dispatch = useDispatch()

    const actions = bindActionCreators({
        addFavs,
        removeFavs,
    }, dispatch)

    function idChecker(cityInstance) {
        //console.log('cityInstance ' + cityInstance.id)
        return cityInstance.id == this;
    }

    const FavIcon = (props) => {

        const cityId = props.cityId
        //console.log('cityId' + cityId)
        if (favs.findIndex(idChecker, cityId) != -1) {
            //console.log(ville.nom + ' est déjà dans les favoris')
            return <Ionicons name='heart' size={35} color='#e567a4' style={styles.iconSup} />
        } if (isFav) {
            //console.log(ville.nom + ' est déjà dans les favoris')
            return <Ionicons name='heart' size={35} color='#e567a4' style={styles.iconSup} />
        } else {
            //console.log(ville.nom + ' nest pas dans les favoris')
            return <Ionicons name='heart-outline' size={35} color='#e567a4' style={styles.iconSup} />
        }

    }

    const favState = (id, nom, actualWeather, humidite, pressionAtmospherique, vitesseVent, pays, descriptionDuTemps) => {
        if (favs.findIndex(idChecker, id) != -1) {
            actions.removeFavs(id)
            setIsFav(false)
        }
        if (isFav) {
            actions.removeFavs(id)
            setIsFav(false)
        } else {
            actions.addFavs({ id: id, ville: nom, actualWeather: actualWeather, humidite: humidite, pressionAtmospherique: pressionAtmospherique, vitesseVent: vitesseVent, pays: pays, descriptionDuTemps: descriptionDuTemps })
            setIsFav(true)
        }
    }
    const [ville, setVille] = useState(
        {
            id: 0,
            nom: route.params.CityName,
            actualWeather: 0,
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
    );

    const getCityWeather = () => {
        axios.get(API_URL + 'q=' + ville.nom + '&appid=' + API_KEY + '&units=metric&lang=FR')
            .then(response => {
                //console.log("Donnée météo chargées (ficheVille)");
                setVille(previousState => {
                    return {
                        ...previousState,
                        id: response.data.id,
                        actualWeather: Math.round(response.data.main.temp),
                        temps: response.data.weather[0].description,
                        humidite: response.data.main.humidity,
                        pressionAtmospherique: response.data.main.pressure,
                        vitesseVent: response.data.wind.speed,
                        iconTA: response.data.weather[0].icon,
                    }
                });
            }).catch(error => {
                console.log("Echec du chargement des données météo");
                console.log(error);
            });
    }

    const getCityWeatherPrevision = () => {
        axios.get(APIPREVISION_URL + 'q=' + ville.nom + '&cnt=' + ville.cnt + '&appid=' + APIPREVISION_KEY + '&units=metric&lang=FR')
            .then(response => {
                //console.log("Donnée prévisions chargées (ficheVille)");
                setVille(previousState => {
                    return {
                        ...previousState,
                        id: response.data.id,
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
                    }

                });
                // console.log("TempsJ1: " + ville.tempsJ1);
                // console.log("TempsJ2: " + ville.tempsJ2);
                // console.log("TempsJ3: " + ville.tempsJ3);
            }).catch(error => {
                console.log("Echec du chargement des données météo");
            });
    }


    useEffect(() => {
        getCityWeather();
        getCityWeatherPrevision();
    }, []);

    //const city = route.params.city;

    return (
        <View style={styles.container} >
            <View style={styles.ContainInfoTop}>
                <Text style={styles.TextNomVile}>{ville.nom}</Text>
                <WeatherIcon name={ville.temps} style={styles.iconTempsKilFait} />
                <Text style={styles.TextTemp}>{ville.actualWeather}°</Text>
                <Text style={styles.Temps}>{ville.temps}</Text>
            </View>



            <View style={styles.InfoSupVille}>
                <View style={styles.InfoSup}>
                    <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                    <Text style={styles.TextInfoSup}>{ville.humidite}%</Text>
                </View>

                <View style={styles.InfoSup}>
                    <Ionicons name='speedometer-outline' size={25} color='#657994' style={styles.iconSup} />
                    <Text style={styles.TextInfoSup}>{ville.pressionAtmospherique}hPa</Text>
                </View>

                <View style={styles.InfoSup}>
                    <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                    <Text style={styles.TextInfoSup}>{ville.vitesseVent}m/s</Text>
                </View>
            </View>


            <Text style={styles.Day}>Prévisions</Text>

            <View>
                <View style={styles.PrevisionTemp}>
                    <Text style={styles.TextTempHeure}>{ville.J1}</Text>
                    <WeatherIcon name={ville.tempsJ1} style={styles.iconPrevision} />
                    <View style={styles.TempMaxMin}>
                        <Text style={styles.TextTempHeure}>{ville.tempmaxJ1}°</Text>
                        <Text style={styles.TextTempHeure}>{ville.tempminJ1}°</Text>
                    </View>
                </View>

                <View style={styles.PrevisionTemp}>
                    <Text style={styles.TextTempHeure}>{ville.J2}</Text>
                    <WeatherIcon name={ville.tempsJ2} style={styles.iconPrevision} />
                    <View style={styles.TempMaxMin}>
                        <Text style={styles.TextTempHeure}>{ville.tempmaxJ2}°</Text>
                        <Text style={styles.TextTempHeure}>{ville.tempminJ2}°</Text>
                    </View>
                </View>

                <View style={styles.PrevisionTemp}>
                    <Text style={styles.TextTempHeure}>{ville.J3}</Text>
                    <WeatherIcon name={ville.tempsJ3} style={styles.iconPrevision} />
                    <View style={styles.TempMaxMin}>
                        <Text style={styles.TextTempHeure}>{ville.tempmaxJ3}°</Text>
                        <Text style={styles.TextTempHeure}>{ville.tempminJ3}°</Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    bottom: 10,
                    right: 20,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                }}
                onPress={(id, nom, actualWeather, humidite, pressionAtmospherique, vitesseVent, pays, descriptionDuTemps) => favState(route.params.city.id, ville.nom, ville.actualWeather, ville.humidite, ville.pressionAtmospherique, ville.vitesseVent, ville.pays, ville.descriptionDuTemps)}
            >
                <FavIcon cityId={route.params.city.id} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#121212',
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
        tintColor: '#657994',
    },
    iconPrevision: {
        resizeMode: 'contain',
        width: 20,
        height: 30,
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