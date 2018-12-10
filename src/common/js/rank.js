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
        songs: topList(rank.tracks, 0),
        // [rank.tracks[0].name, rank.tracks[1].name, rank.tracks[2].name],
        artists: topList(rank.tracks, 1)
        // [Allsinger(rank.tracks[0].ar), Allsinger(rank.tracks[1].ar), Allsinger(rank.tracks[2].ar)]
    });
}

function topList (list, tag) {
  let len = 3;
  let songs = [];
  let artists = [];
  for (let i = 0; i < len; i++) {
    if (list[i]) {
      songs.push(list[i].name);
      artists.push(Allsinger(list[i].ar));
    } else {
      break;
    }
  }
  return tag === 0 ? songs : artists;
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
