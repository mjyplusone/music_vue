import axios from 'axios';

export function getRankList (idx) {
    var ret = new Promise((resolve, reject) => {
        const url = 'http://musicapi.leanapp.cn/top/list?idx=' + idx;

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