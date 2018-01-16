// 操作和storage相关的逻辑
import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const MAX_SEARCH_LENGTH = 15;
const FAVORITE_KEY = '__favorite__';
const MAX_FAVORITE_LENGTH = 200;
const RECENT_KEY = '__recent__';
const MAX_RECENT_LENGTH = 100;

// 存储的数组,新传入的值,比较函数,最大值
function insertArray (arr, val, compare, maxLength) {
    const index = arr.findIndex(compare);
    // 如果原数组中有这条数据,并且是第一条数据
    if (index === 0) {
        return;
    }
    // 如果原数组中有这条数据,并且不是第一条数据
    if (index > 0) {
        // 删除这条数据
        arr.splice(index, 1);
    }
    // 在数组第一个位置插入这条数据
    arr.unshift(val);
    // 检查数组长度是否超过限制
    if (maxLength && arr.length > maxLength) {
        // pop数组最后一个值
        arr.pop();
    }
}

function deleteFromArray (arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// 搜索历史相关操作
// 把query插入到当前搜索历史列表中,保存到localStorage,并return新的数组
export function saveSearch (query) {
    // key default
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query;
    }, MAX_SEARCH_LENGTH);
    storage.set(SEARCH_KEY, searches);
    return searches;
}

export function loadSearch () {
    return storage.get(SEARCH_KEY, []);
}

export function deleteSearch (query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query;
    });
    storage.set(SEARCH_KEY, searches);
    return searches;
}

// 我喜欢的音乐列表相关操作
export function saveFavorite (song) {
    let songs = storage.get(FAVORITE_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, MAX_FAVORITE_LENGTH);
    storage.set(FAVORITE_KEY, songs);
    return songs;
}

export function deleteFavorite (song) {
    let songs = storage.get(FAVORITE_KEY, []);
    deleteFromArray(songs, (item) => {
        return item.id === song.id;
    });
    storage.set(FAVORITE_KEY, songs);
    return songs;
}

export function loadFavorite () {
    return storage.get(FAVORITE_KEY, []);
}

// 最近播放的歌曲列表相关操作
export function saveRecent (song) {
    let songs = storage.get(RECENT_KEY, []);
    insertArray(songs, song, (item) => {
        return item.id === song.id;
    }, MAX_RECENT_LENGTH);
    storage.set(RECENT_KEY, songs);
    return songs;
}

export function deleteRecent (song) {
    let songs = storage.get(RECENT_KEY, []);
    deleteFromArray(songs, (item) => {
        return item.id === song.id;
    });
    storage.set(RECENT_KEY, songs);
    return songs;
}

export function loadRecent () {
    return storage.get(RECENT_KEY, []);
}