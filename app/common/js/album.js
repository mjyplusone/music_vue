import { formatDate } from 'common/js/util.js';

export default class Album {
    constructor ({ id, name, picUrl, size, publishTime }) {
        this.id = id;
        this.name = name;
        this.picUrl = picUrl;
        this.size = size;
        this.publishTime = publishTime;
    }
}

export function createAlbum (album) {
    return new Album({
        id: album.id,
        name: album.name,
        picUrl: album.picUrl,
        size: album.size,
        publishTime: format(album.publishTime)
    });
}

function format (time) {
    let date = new Date(time);
    return formatDate(date, 'yyyy-M-d');
}
