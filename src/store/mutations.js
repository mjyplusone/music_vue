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
    }
};

export default mutations;