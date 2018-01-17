import axios from 'axios';
import {baseUrl} from './config.js';

export function getSongComment (songid, offset) {
    const url = baseUrl + '/comment/music?id=' + songid + '&offset=' + offset;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getAlbumComment (albumid, offset) {
    const url = baseUrl + '/comment/album?id=' + albumid + '&offset=' + offset;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getMenuComment (menuid, offset) {
    const url = baseUrl + '/comment/playlist?id=' + menuid + '&offset=' + offset;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}