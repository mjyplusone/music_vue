export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {};
};

export const musicmenu = state => state.musicmenu;

export const query = state => state.query;

export const singerBackRoute = state => state.singerBackRoute;

export const searchHistory = state => state.searchHistory;

export const favoriteList = state => state.favoriteList;

export const recentPlayList = state => state.recentPlayList;

export const showSongComment = state => state.showSongComment;

export const showMenuComment = state => state.showMenuComment;

export const blurInput = state => state.blurInput;