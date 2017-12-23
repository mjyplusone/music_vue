import axios from 'axios';

export function getLyrics (songId) {
    // const url = 'http://dgfd.lihulab.net/lyric?id=' + songId;
    const url = 'http://musicapi.leanapp.cn/lyric?id=' + songId;
    // const url = '../../static/lyric.json';   // 访问本地json

    return axios.get(url)
        .then((response) => {
            // console.log(response.data);
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}