import {playMode} from 'common/js/config.js';
import {loadSearch, loadFavorite, loadRecent} from 'common/js/cache.js';

const state = {
    singer: {},
    playing: false,  // 是否正在播放
    fullScreen: true,  // 全屏
    playList: [],  // 播放列表
    sequenceList: [],  // 顺序播放列表
    mode: playMode.sequence,  // 播放模式
    currentIndex: -1,  // 当前播放
    musicmenu: {},  // 歌单信息
    query: '',  // 搜索值
    singerBackRoute: '/findmusic/singer',  // 返回路由
    searchHistory: loadSearch(),  // 搜索历史
    favoriteList: loadFavorite(),  // 我喜欢的音乐列表
    recentPlayList: loadRecent(),  // 最近播放歌曲列表
    showSongComment: false,  // 歌曲评论是否展示
    showMenuComment: false,  // 歌单评论是否展示
    blurInput: false  // blur input
};

export default state;