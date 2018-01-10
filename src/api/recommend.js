import axios from 'axios';
import {baseUrl} from './config.js';

export function getRecommendBanner () {
    const url = baseUrl + '/banner';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getRecommendSongs () {
    const url = baseUrl + '/personalized/newsong';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}