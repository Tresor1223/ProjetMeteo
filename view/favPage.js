import React from 'react';
import { StatusBar, View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import FavBox from '../components/FavBox';


export default FavPage = ({ navigation, route }) => {
    const { favoris } = useSelector(state => state.favReducer);
    // console.log(favoris)

    return (
        <View style={styles.container} >
            <StatusBar style='light' />

            <View style={styles.body}>
                <FlatList
                    data={favoris}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item, index }) => <FavBox ville={item} />}
                    //Setting the number of column
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                    keyExtractor={(item, index) => item.ville}
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