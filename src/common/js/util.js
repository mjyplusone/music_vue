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