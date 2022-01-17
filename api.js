import React from "react";
import axios from 'axios';
import { API_KEY, API_URL } from "./constants";

export default function getCityWeather(ville) {
    axios.get(API_URL + 'q=' + ville + '&appid=' + API_KEY + '&units=metric')
        .then(response => {
            console.log("Donnée météo chargées");
            return response.data;
        }).catch(error => {
            console.log("Echec du chargement des données météo");
            return {};
        });
} 