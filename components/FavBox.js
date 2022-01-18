import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeFavs, addFavs } from '../redux/actions/favs';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import favReducer from '../redux/reducers/favReducer';
import WeatherIcon from '../view/WeatherIcon';

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

    const boxFavState = (id) => {
        if (favs.findIndex(idChecker, id) != -1) {
            actions.removeFavs(id)
            setIsFav(false)
        }
        if (isFav) {
            actions.removeFavs(id)
            setIsFav(false)
        }
    }

    return (
        <View style={styles.ContainTempVille}>
            <View style={styles.ContainTempVilleTop}>
                <View style={styles.TempVilleText}>
                    <Text style={styles.TempText}>{city.actualWeather}°</Text>
                    <Text style={styles.TextVilleHumVent}>{city.ville}</Text>
                    <Text style={styles.NomPays}>{city.pays}</Text>
                    <TouchableOpacity
                        onPress={(id) => boxFavState(city.id)}
                    >
                        <FavIcon cityId={city.id} />
                    </TouchableOpacity>
                </View>
                <View>
                    <WeatherIcon name={city.descriptionDuTemps} style={styles.iconTemp} />
                </View>
            </View>

            <View style={styles.ContainValeurHumidVent}>
                <View style={styles.ValeurHumidVent}>
                    <Ionicons name='water-outline' size={25} color='#657994' style={styles.iconSup} />
                    <Text style={styles.TextVilleHumVent}>{city.humidite}%</Text>
                </View>

                <View style={styles.ValeurHumidVent}>
                    <Image source={require('../assets/img/wind.png')} style={styles.iconVent} />
                    <Text style={styles.TextVilleHumVent}>{city.vitesseVent} m/s</Text>
                </View>
            </View>
        </View>
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
        width: 160,
        height: 160,
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