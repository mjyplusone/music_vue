import axios from 'axios';
import { baseUrl } from './config.js';

export function getSinger () {
    const url = baseUrl + '/top/artists';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSingerDetail (singerid) {
    const url = baseUrl + '/artists?id=' + singerid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSingerInfo (singerid) {
    const url = baseUrl + '/artist/desc?id=' + singerid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSingerAlbum (singerid) {
    const url = baseUrl + '/artist/album?id=' + singerid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
