import jsonp from 'common/js/jsonp.js';
import {commonParams, options} from './config';
import axios from 'axios';

export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams);

    return jsonp(url, data, options);
}

export function getRecommendMusicList () {
    const url = 'http://dgfd.lihulab.net/personalized';

    return axios.get(url)
      .then((response) => {
        //   console.log(response.data);
          return Promise.resolve(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
}