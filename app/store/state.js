import { playMode } from 'common/js/config.js';
import { loadSearch, loadFavorite, loadRecent } from 'common/js/cache.js';

const state = {
    singer: {},
    // 是否正在播放
    playing: false,
    // 全屏
    fullScreen: true,
    // 播放列表
    playList: [],
    // 顺序播放列表
    sequenceList: [],
    // 播放模式
    mode: playMode.sequence,
    // 当前播放
    currentIndex: -1,
    // 歌单信息
    musicmenu: {},
    // 搜索值
    query: '',
    // 返回路由
    singerBackRoute: '/findmusic/singer',
    // 搜索历史
    searchHistory: loadSearch(),
    // 我喜欢的音乐列表
    favoriteList: loadFavorite(),
    // 最近播放歌曲列表
    recentPlayList: loadRecent(),
    // 歌曲评论是否展示
    showSongComment: false,
    // 歌单评论是否展示
    showMenuComment: false,
    // blur input
    blurInput: false
};

export default state;
