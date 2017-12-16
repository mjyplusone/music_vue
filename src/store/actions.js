import * as types from './mutation-types';

export const selectPlay = function ({commit, state}, {song, index}) {
   commit(types.SET_SEQUENCELIST, song);
   commit(types.SET_PLAYLIST, song);
   commit(types.SET_CURRENTINDEX, index);
   commit(types.SET_FULLSCREEN, true);
   commit(types.SET_PLAYING, true);
};