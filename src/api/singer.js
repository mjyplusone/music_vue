import axios from 'axios';

export function getSinger () {
    const url = 'http://musicapi.leanapp.cn/top/artists';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSingerDetail (singerid) {
    const url = 'http://musicapi.leanapp.cn/artists?id=' + singerid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}