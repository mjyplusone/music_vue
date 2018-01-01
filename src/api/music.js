import jsonp from 'common/js/jsonp.js';
import {commonParams, options} from './config';
import axios from 'axios';

export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams);

    return jsonp(url, data, options);
}

// 推荐歌单
export function getRecommendMusicList () {
    const url = 'http://musicapi.leanapp.cn/personalized';

    return axios.get(url)
      .then((response) => {
        //   console.log(response.data);
          return Promise.resolve(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
}

// 歌单
export function getMusicMenuList () {
    const url = 'http://musicapi.leanapp.cn/top/playlist';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// 精品歌单
export function getTopMusicMenuList () {
    const url = 'http://musicapi.leanapp.cn/top/playlist/highquality';

    return axios.get(url)
    .then((response) => {
        return Promise.resolve(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

export function getMusicMenu (menuid) {
    const url = 'http://musicapi.leanapp.cn/playlist/detail?id=' + menuid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}