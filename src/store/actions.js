import * as types from './mutation-types';
import {playMode} from 'common/js/config.js';
import {shuffle} from 'common/js/util.js';

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