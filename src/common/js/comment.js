import {formatDate} from 'common/js/util.js';

export default class Comment {
    constructor ({nickname, avatarUrl, time, content, likedCount, replyContent, replyName}) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.time = time;
        this.content = content;
        this.likedCount = likedCount;
        this.replyContent = replyContent;
        this.replyName = replyName;
    }
}

export function createComment (comment) {
    return new Comment({
        nickname: comment.user.nickname,
        avatarUrl: comment.user.avatarUrl,
        time: format(comment.time),
        content: comment.content,
        likedCount: normalCount(comment.likedCount),
        replyContent: comment.beReplied.content,
        replyName: comment.beReplied.nickname
    });
}

function format (time) {
    let date = new Date(time);
    return formatDate(date, 'yyyy年M月d日');
}

// 次数超过99999次,按...万次的格式显示
function normalCount (count) {
    if (count > 99999) {
        return (count / 10000).toFixed(1) + '万';
    } else {
        return count;
    }
}