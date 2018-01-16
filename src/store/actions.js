import * as types from './mutation-types';
import {playMode} from 'common/js/config.js';
import {shuffle} from 'common/js/util.js';
import {saveSearch, deleteSearch, saveFavorite, deleteFavorite} from 'common/js/cache.js';

export const selectPlay = function ({commit, state}, {song, index}) {
    commit(types.SET_SEQUENCELIST, song);
    if (state.mode === playMode.random) {
        let randomList = shuffle(song);
        index = randomList.findIndex((item) => {
            return item.id === song[index].id;
        });
        commit(types.SET_PLAYLIST, randomList);
    } else {
        commit(types.SET_PLAYLIST, song);
    }
    commit(types.SET_CURRENTINDEX, index);
    commit(types.SET_FULLSCREEN, true);
    commit(types.SET_PLAYING, true);
};

function findIndex (list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    });
  }

export const insertSong = function ({commit, state}, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    // 记录当前歌曲
    let currentSong = playList[currentIndex];
    // 查找列表是否已经有要插入的歌,并返回其索引
    let pindex = findIndex(playList, song);
    // 在当前索引的下一个插入歌曲
    currentIndex++;
    playList.splice(currentIndex, 0, song);

    // 列表中已经有待插入的歌曲
    if (pindex > -1) {
        // 然后从列表中删除之前已经有的这首歌
        // 当前插入歌曲索引大于之前存在歌曲的索引,直接删除之前存在的歌曲,然后当前插入歌曲的currentIndex减1
        if (currentIndex > pindex) {
            playList.splice(pindex, 1);
            currentIndex--;
        } else {
            // 当前插入歌曲索引小于之前存在歌曲的索引,原来存在的歌曲索引增加1
            // 删除原来存在的歌曲
            playList.splice(pindex + 1, 1);
        }
    }

    // sequenList中应该插入的位置
    let currentSIndex = findIndex(sequenceList, currentSong) + 1;
    // 查找squenceList中是否已经有要插入的歌,并返回其索引
    let sindex = findIndex(sequenceList, song);
    // sequenceList中插入歌曲
    sequenceList.splice(currentSIndex, 0, song);

    // squenceList中已经有待插入的歌曲
    if (sindex > -1) {
        if (currentSIndex > sindex) {
            sequenceList.splice(sindex, 1);
        } else {
            sequenceList.splice(sindex + 1, 1);
        }
    }

    // 提交到vuex
    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCELIST, sequenceList);
    commit(types.SET_CURRENTINDEX, currentIndex);
    commit(types.SET_FULLSCREEN, true);
    commit(types.SET_PLAYING, true);
};

export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCHHISTORY, saveSearch(query));
};

export const deleteSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCHHISTORY, deleteSearch(query));
};

export const deleteSong = function ({commit, state}, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;

    // 找到要删除歌曲在playList中的索引
    let pindex = findIndex(playList, song);
    // 在playList中删除这首歌
    playList.splice(pindex, 1);

    // 找到要删除歌曲在sequenceList中的索引
    let sindex = findIndex(sequenceList, song);
    // 在sequenceList中删除这首歌
    sequenceList.splice(sindex, 1);

    // 如果当前播放歌曲在删除歌曲的后面 或 currentIndex是最后一首歌
    if (currentIndex > pindex || currentIndex === playList.length) {
        currentIndex--;
    }

    // 提交到vuex
    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCELIST, sequenceList);
    commit(types.SET_CURRENTINDEX, currentIndex);

    // 如果把整个列表删完了
    if (!playList.length) {
        // 要把playing状态置为false
        commit(types.SET_PLAYING, false);
        // fullScreen也要置为false,退出播放器
        commit(types.SET_FULLSCREEN, false);
    }
};

// 清空列表
export const clearSongList = function ({commit}) {
    commit(types.SET_PLAYLIST, []);
    commit(types.SET_SEQUENCELIST, []);
    commit(types.SET_CURRENTINDEX, -1);
    commit(types.SET_PLAYING, false);
    commit(types.SET_FULLSCREEN, false);
};

// 保存到我喜欢的音乐列表
export const saveFavoriteList = function ({commit}, song) {
    commit(types.SET_FAVORITELIST, saveFavorite(song));
};

// 从我喜欢的音乐列表中删除
export const deleteFavoriteList = function ({commit}, song) {
    commit(types.SET_FAVORITELIST, deleteFavorite(song));
};
