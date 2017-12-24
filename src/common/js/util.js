function getRandom (min, max) {
    // 返回min和max之间包括min和max的随机整数
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle (list) {
    // 先复制一份！！！原来传入的state不可修改
    let arr = list.slice();
    for (let i = 0; i < arr.length; i++) {
        // 索引0-i间任意一个和索引为i的交换，以此打乱数组
        let j = getRandom(0, i);
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}