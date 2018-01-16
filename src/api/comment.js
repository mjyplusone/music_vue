import axios from 'axios';
import {baseUrl} from './config.js';

export function getSongComment (songid) {
    const url = baseUrl + '/comment/music?id=' + songid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getAlbumComment (albumid) {
    const url = baseUrl + '/comment/album?id=' + albumid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getMenuComment (menuid) {
    const url = baseUrl + '/comment/playlist?id=' + menuid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}