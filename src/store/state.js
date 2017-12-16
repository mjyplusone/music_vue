import {playMode} from 'common/js/config.js';

const state = {
    singer: {},
    playing: false,  // 是否正在播放
    fullScreen: true,  // 全屏
    playList: [],  // 播放列表
    sequenceList: [],  // 顺序播放列表
    mode: playMode.sequence,  // 播放模式
    currentIndex: -1  // 当前播放
};

export default state;