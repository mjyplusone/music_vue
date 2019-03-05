import jsonp from 'common/js/jsonp.js';
import { commonParams, options, baseUrl } from './config';
import axios from 'axios';

export function getHotKey () {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    });

    return jsonp(url, data, options);
}

export function search (query, type, offset) {
    const limit = 20;
    const url = baseUrl + '/search?keywords=' + query + '&type=' + type + '&offset=' + offset + '&limit=' + limit;
    console.log(url);

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function searchsuggest (query) {
    const url = baseUrl + '/search/suggest?keywords=' + query;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function searchmatch (query) {
    const url = baseUrl + '/search/multimatch?keywords=' + query;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
