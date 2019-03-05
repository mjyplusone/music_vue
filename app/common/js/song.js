import { getLyrics } from 'api/song.js';

export default class Song {
    constructor ({ id, name, singer, album, picUrl, musicUrl }) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.picUrl = picUrl;
        this.musicUrl = musicUrl;
    }
    getLyrics () {
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }

        return new Promise((resolve, reject) => {
            getLyrics(this.id).then((res) => {
                if (res.code === 200) {
                    this.lyric = res.lrc.lyric;
                    resolve(this.lyric);
                } else {
                    // reject('no lyric');
                    console.log('aha no lyric');
                }
            });
        });
    }
}

export function createSong (song) {
    return new Song({
        id: song.id,
        name: song.name,
        singer: allSinger(song.ar),
        album: song.al.name,
        picUrl: song.al.picUrl,
        musicUrl: `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    });
}

function allSinger (ar) {
    let allsinger = [];
    if (!ar) {
        return;
    }
    ar.forEach((singer) => {
        allsinger.push(singer.name);
    });
    return allsinger.join('/');
}

export function createRecommendSong (song) {
    return new Song({
        id: song.id,
        name: song.name,
        singer: allSinger(song.song.artists),
        album: song.song.album.name,
        picUrl: song.song.album.picUrl,
        musicUrl: `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    });
}

export function createSearchSong (song) {
    return new Song({
        id: song.id,
        name: song.name,
        singer: allSinger(song.artists),
        album: song.album.name,
        picUrl: song.artists[0].img1v1Url || song.album.artist.img1v1Url,
        musicUrl: `http://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    });
}
