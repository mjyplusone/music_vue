import jsonp from 'common/js/jsonp.js';
import {commonParams, options} from './config';

export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams);

    return jsonp(url, data, options);
}