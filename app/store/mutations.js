import * as types from './mutation-types.js';

const mutations = {
    // 使用常量替代 Mutation 事件类型,使eslint发挥作用
    [types.SET_SINGER] (state, singer) {
        state.singer = singer;
    },
    [types.SET_PLAYING] (state, flag) {
        state.playing = flag;
    },
    [types.SET_FULLSCREEN] (state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAYLIST] (state, list) {
        state.playList = list;
    },
    [types.SET_SEQUENCELIST] (state, list) {
        state.sequenceList = list;
    },
    [types.SET_PLAYMODE] (state, mode) {
        state.mode = mode;
    },
    [types.SET_CURRENTINDEX] (state, index) {
        state.currentIndex = index;
    },
    [types.SET_MUSICMENU] (state, musicmenu) {
        state.musicmenu = musicmenu;
    },
    [types.SET_QUERY] (state, query) {
        state.query = query;
    },
    [types.SET_SINGERBACKROUTE] (state, singerbackroute) {
        state.singerBackRoute = singerbackroute;
    },
    [types.SET_SEARCHHISTORY] (state, searchhistory) {
        state.searchHistory = searchhistory;
    },
    [types.SET_FAVORITELIST] (state, favoritelist) {
        state.favoriteList = favoritelist;
    },
    [types.SET_RECENTPLAYLIST] (state, recentplaylist) {
        state.recentPlayList = recentplaylist;
    },
    [types.SET_SHOWSONGCOMMENT] (state, flag) {
        state.showSongComment = flag;
    },
    [types.SET_SHOWMENUCOMMENT] (state, flag) {
        state.showMenuComment = flag;
    },
    [types.SET_BLURINPUT] (state, flag) {
        state.blurInput = flag;
    }
};

export default mutations;