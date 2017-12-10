import axios from 'axios';

export function getSinger () {
    const url = 'http://dgfd.lihulab.net/top/artists';

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getSingerDetail (singerid) {
    const url = 'http://dgfd.lihulab.net/artists?id=' + singerid;

    return axios.get(url)
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}