import axios from 'axios';
import {baseUrl} from './config.js';

export function getLyrics (songId) {
    const url = baseUrl + '/lyric?id=' + songId;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}