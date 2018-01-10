import axios from 'axios';
import {baseUrl} from './config.js';

export function getRankList (idx) {
    var ret = new Promise((resolve, reject) => {
        const url = baseUrl + '/top/list?idx=' + idx;

        axios.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    return ret;
}