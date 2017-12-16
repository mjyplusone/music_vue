export default class Song {
    constructor ({id, name, singer, album, picUrl, musicUrl}) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.picUrl = picUrl;
        this.musicUrl = musicUrl;
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