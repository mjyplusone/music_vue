import axios from 'axios';

export function getRecommendBanner () {
    const url = 'http://musicapi.leanapp.cn/banner';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getRecommendSongs () {
    const url = 'http://musicapi.leanapp.cn/personalized/newsong';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}