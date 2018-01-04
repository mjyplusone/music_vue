import jsonp from 'common/js/jsonp.js';
import {commonParams, options} from './config';
import axios from 'axios';

export function getHotKey () {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    });

    return jsonp(url, data, options);
}

export function search (query) {
    const url = 'http://musicapi.leanapp.cn/search?keywords=' + query;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function searchsuggest (query) {
    const url = 'http://musicapi.leanapp.cn/search/suggest?keywords=' + query;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}