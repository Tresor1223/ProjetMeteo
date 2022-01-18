import React from "react";
import { Image } from 'react-native';

export default class WeatherIcon extends React.Component {
    // Constructeur
    constructor(props) {
        super(props);
    }
    render() {
        var icon = <Image style={this.props.style} source={require('../assets/img/weather/sun.png')} />;
        // Charger une icône en fonction du nom
        switch (this.props.name) {
            case 'légère pluie':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/rain.png')} />;
                break;
            case 'pluie et neige':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/rain-snow.png')} />;
                break;
            case 'brouillard':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/wind-sun.png')} />;
                break;
            case 'brume':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/wind-sun.png')} />;
                break;
            case 'brume sèche':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/brume.png')} />;
                break;
            case 'Rain':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/rain.png')} />;
                break;
            case 'couvert':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/haze.png')} />;
                break;
            case 'nuageux':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/cloud.png')} />;
                break;
            case 'peu nuageux':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/cloud.png')} />;
                break;
            case 'Rain':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/rain2.png')} />;
                break;
            case 'ciel dégagé':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/sun.png')} />;
                break;
            case 'Snow':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/snow.png')} />;
                break;
            case 'partiellement nuageux':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/half-cloudy-sun.png')} />;
                break;
            case 'HalfCloudyMoon':
                icon = <Image style={this.props.style} source={require('../assets/img/weather/half-cloudy-moon.png')} />;
                break;
            default: break;
        }
        // Affichage
        return icon;
    }
}