import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeFavs, addFavs } from '../redux/actions/favs';
import { StyleSheet } from 'react-native';
import favReducer from '../redux/reducers/favReducer';

const FavBox = ({ city }) => {

    const [isFav, setIsFav] = useState(false)
    const { favs } = useSelector(state => state.favReducer)
    const dispatch = useDispatch()

    const actions = bindActionCreators({
        addFavs,
        removeFavs,
    }, dispatch)

    function idChecker(cityInstance) {
        return cityInstance.id == this
    }

    const FavIcon = (props) => {

        const cityId = props.cityId
        if (favs.findIndex(idChecker, cityId) != -1) {
            return <Ionicons name='heart' size={25} color='#657994' style={styles.iconSup} />
        } if (isFav) {
            return <Ionicons name='heart' size={25} color='#657994' style={styles.iconSup} />
        } else {
            return <Ionicons name='heart-outline' size={25} color='#657994' style={styles.iconSup} />
        }

    }

    const boxFavState = (id, ville, temp, humidite, pressionAtmospherique, vitesseVent, pays, descriptionDuTemps) => {
        if (favs.findIndex(idChecker, id) != -1) {
            actions.removeFavs(id)
            setIsFav(false)
        } else if (isFav) {
            actions.removeFavs(id)
            setIsFav(false)
        } else {
            actions.addFavs({ id: id, ville: ville, temp: temp, humidite: humidite, pressionAtmospherique: pressionAtmospherique, vitesseVent: vitesseVent, pays: pays, descriptionDuTemps: descriptionDuTemps })
            setIsFav(true)
        }
    }

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
                        'id': response.data.id,
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

    return (
        <TouchableOpacity
            style={styles.ContainTempVille}
            onPress={() => {
                navigation.navigate('ficheVille', {
                    CityName: city.ville,
                });
            }}
        >
            <View style={styles.ContainTempVille}>
                <View style={styles.ContainTempVilleTop}>
                    <View style={styles.TempVilleText}>
                        <Text style={styles.TempText}>{favs.temp}°</Text>
                        <Text style={styles.TextVilleHumVent}>{favs.ville}</Text>
                        <Text style={styles.NomPays}>{favs.pays}</Text>
                        <TouchableOpacity
                        //onPress={(id, ville, temp, humidite, pressionAtmospherique, vitesseVent, pays, descriptionDuTemps) => boxFavState(city.id, city.ville, city.temp, city.humidite, city.pressionAtmospherique, city.vitesseVent, city.pays, city.descriptionDuTemps)}
                        >
                            <FavIcon cityId={city.id} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <WeatherIcon name={favs.descriptionDuTemps} style={styles.iconTemp} />
                    </View>
                </View>

                <View style={styles.ContainValeurHumidVent}>
                    <View style={styles.ValeurHumidVent}>
                        <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                        <Text style={styles.TextVilleHumVent}>{favs.humidite}%</Text>
                    </View>

                    <View style={styles.ValeurHumidVent}>
                        <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                        <Text style={styles.TextVilleHumVent}>{favs.vitesseVent} m/s</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FavBox;

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