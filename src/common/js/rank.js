export default class Rank {
    constructor ({id, name, picUrl, songs, artists}) {
        this.id = id;
        this.name = name;
        this.picUrl = picUrl;
        this.songs = songs;
        this.artists = artists;
    }
}

export function createRank (rank) {
    return new Rank({
        id: rank.id,
        name: rank.name,
        picUrl: rank.coverImgUrl,
        songs: [rank.tracks[0].name, rank.tracks[1].name, rank.tracks[2].name],
        artists: [Allsinger(rank.tracks[0].artists), Allsinger(rank.tracks[1].artists), Allsinger(rank.tracks[2].artists)]
        // artists: [Allsinger(rank.tracks[0].ar), Allsinger(rank.tracks[1].ar), Allsinger(rank.tracks[2].ar)]
    });
}

function Allsinger (artists) {
    let allsinger = [];
    if (!artists) {
        return;
    }
    artists.forEach((item) => {
        allsinger.push(item.name);
    });
    return allsinger.join('/');
}