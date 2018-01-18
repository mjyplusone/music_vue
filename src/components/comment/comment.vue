<template>
<transition name="slide">
    <div class="comment">
        <div class="m-header" ref="header">
            <div class="back icon-left" @click="back"></div>
            <div class="subtitle">评论({{ totalComment }})</div>
            <!-- <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div> -->
        </div>
        <scroll class="scroll-wrapper" :data="commentList" :pullup="pullup" @scrollToEnd="commentMore">
            <div class="content" :data="hotCommentList">
                <div class="title">
                    <div class="titleimg"><img :src="picUrl" width="81" height="81" alt=""></div>
                    <div class="right">
                        <div class="titlename">{{ name }}</div>
                        <div class="singername">{{ singer }}</div>
                    </div>
                </div>
                <h1 class="marker" v-show="hotCommentList.length">精彩评论</h1>
                <div class="hotcomment">
                    <ul>
                        <li v-for="comment in hotCommentList" class="comment-item">
                            <div class="avatar"><img :src="comment.avatarUrl" width="30" height="30" alt=""></div>
                            <div class="right">
                                <div class="username">{{ comment.nickname }}</div>
                                <div class="time">{{ comment.time }}</div>
                                <div class="commentcontent"><span v-show="comment.replyContent">回复<span class="replyname">@{{ comment.replyName }}</span>:</span>{{ comment.content }}</div>
                                <div class="replycontent" v-show="comment.replyContent"><span class="replyname">@{{ comment.replyName }}</span>:{{ comment.replyContent }}</div>
                                <div class="likedcount">{{ comment.likedCount }}</div>
                                <div class="good"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <h1 class="marker" v-show="commentList.length">最新评论</h1>
                <div class="recentcomment">
                    <ul>
                        <li v-for="comment in commentList" class="comment-item">
                            <div class="avatar"><img :src="comment.avatarUrl" width="30" height="30" alt=""></div>
                            <div class="right">
                                <div class="username">{{ comment.nickname }}</div>
                                <div class="time">{{ comment.time }}</div>
                                <div class="commentcontent"><span v-show="comment.replyContent">回复<span class="replyname">@{{ comment.replyName }}</span>:</span>{{ comment.content }}</div>
                                <div class="replycontent" v-show="comment.replyContent"><span class="replyname">@{{ comment.replyName }}</span>:{{ comment.replyContent }}</div>
                                <div class="likedcount">{{ comment.likedCount }}</div>
                                <div class="good"></div>
                            </div>
                        </li>
                        <div class="loading"><loading v-show="hasMore"></loading></div>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import scroll from 'base/scroll/scroll.vue';
    import {mapMutations} from 'vuex';
    import {getSongComment, getMenuComment} from 'api/comment.js';
    import {createComment} from 'common/js/comment.js';
    import loading from 'base/loading/loading.vue';

    const limit = 20;
    const SONG_COMMENT = 0;
    const MENU_COMMENT = 1;

    export default {
        data () {
            return {
                pullup: true,
                hasMore: true,  // 是否可以加载更多
                currentPage: 0,  // 当前页数
                hotCommentList: [],
                commentList: [],
                totalComment: null
            };
        },
        props: {
            commentType: {
                type: Number,
                default: 0
            },
            id: {
                type: Number,
                default: null
            },
            picUrl: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            singer: {
                type: String,
                default: null
            }
        },
        methods: {
            back () {
                this.setShowSongComment(false);
                this.setShowMenuComment(false);
            },
            getSongComment () {
                // 初始化一些值
                this.hotCommentList = [];
                this.commentList = [];
                this.hasMore = true;
                this.currentPage = 0;
                getSongComment(this.id, 0).then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        this.hotCommentList = this._normalizeComment(res.hotComments);
                        this.commentList = this._normalizeComment(res.comments);
                        this.totalComment = res.total;
                        console.log(this.hotCommentList);
                        console.log(this.commentList);
                    }
                });
            },
            getMenuComment () {
                // 初始化一些值
                this.hotCommentList = [];
                this.commentList = [];
                this.hasMore = true;
                this.currentPage = 0;
                getMenuComment(this.id, 0).then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        this.hotCommentList = this._normalizeComment(res.hotComments);
                        this.commentList = this._normalizeComment(res.comments);
                        this.totalComment = res.total;
                        console.log(this.hotCommentList);
                        console.log(this.commentList);
                    }
                });
            },
            commentMore () {
                console.log('more');
                if (!this.hasMore) {
                    return;
                }
                this.currentPage++;
                console.log(this.currentPage);
                if (this.commentType === SONG_COMMENT) {
                    getSongComment(this.id, this.currentPage * limit).then((res) => {
                        console.log(res);
                        if (res.code === 200) {
                            this.commentList = this.commentList.concat(this._normalizeComment(res.comments));
                            console.log(this.commentList);
                        }
                        this._checkMore(res);
                    });
                } else if (this.commentType === MENU_COMMENT) {
                    getMenuComment(this.id, this.currentPage * limit).then((res) => {
                        console.log(res);
                        if (res.code === 200) {
                            this.commentList = this.commentList.concat(this._normalizeComment(res.comments));
                            console.log(this.commentList);
                        }
                        this._checkMore(res);
                    });
                }
            },
            _normalizeComment (commentList) {
                let ret = [];
                commentList.forEach((comment) => {
                    if (comment.commentId) {
                        ret.push(createComment(comment));
                    }
                });
                return ret;
            },
            _checkMore (result) {
                if (!result.comments || this.commentList.length >= result.total) {
                    this.hasMore = false;
                }
            },
            ...mapMutations({
                setShowSongComment: 'SET_SHOWSONGCOMMENT',
                setShowMenuComment: 'SET_SHOWMENUCOMMENT'
            })
        },
        components: {
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .comment
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: #ffffff
        z-index: 200  // player 200
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .m-header
            position: relative
            width: 100%
            height: 44px
            background: #d43c33
            font-size: 16px
            color: #ffffff
            z-index: 20
            .back
                position: absolute
                left: 12px
                top: 10px
                font-size: 24px
            .subtitle
                position: absolute
                left: 50%
                top: 50%
                transform: translate(-50%, -50%)
            .music-on
                position: absolute
                right: 10px
                top: 10px
                width: 24px
                height: 24px
                background: url("../../common/image/music.png")
                background-size: 24px 24px
                &.on
                    background: url("../../common/image/music_on.gif")
                    background-size: 24px 24px
        .scroll-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .content
                width: 100%
                .title
                    width: 100%
                    height: 101px
                    padding: 10px 10px
                    box-sizing: border-box
                    display: flex
                    .titleimg
                        flex: 0 0 81px
                    .right
                        flex: 1
                        margin-left: 10px
                        .titlename
                            margin-top: 20px
                            font-size: 14px
                        .singername
                            margin-top: 16px
                            font-size: 12px
                            color: rgba(0, 0, 0, 0.5)
                .marker
                    width: 100%
                    height: 25px
                    padding: 0 10px
                    box-sizing: border-box
                    line-height: 25px
                    font-size: 12px
                    background: #eeeff1
                .comment-item
                    width: 100%
                    padding: 9px 10px 0 10px
                    box-sizing: border-box
                    display: flex
                    .avatar
                        flex: 0 0 30px
                        width: 30px
                        height: 30px
                        border-radius: 50%
                        overflow: hidden
                    .right
                        position: relative
                        flex: 1
                        margin-left: 21px
                        padding-bottom: 15px
                        box-sizing: border-box
                        border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                        .username
                            font-size: 13px
                            color: rgba(0, 0, 0, 0.7)
                        .time
                            margin-top: 5px
                            font-size: 10px
                            color: rgba(0, 0, 0, 0.5)
                        .commentcontent
                            margin-top: 12px
                            line-height: 1.7
                            font-size: 13px
                            color: #000000
                        .replycontent
                            margin-top: 10px
                            padding: 5px 8px
                            border: 1px solid rgba(7, 17, 127, 0.1)
                            line-height: 1.7
                            font-size: 13px
                            color: rgba(0, 0, 0, 0.5)
                        .replyname
                            color: #648db9
                        .likedcount
                            position: absolute
                            top: 3px
                            right: 20px
                            font-size: 12px
                            color: rgba(0, 0, 0, 0.5)
                        .good
                            position: absolute
                            top: 0
                            right: 0
                            width: 14px
                            height: 14px
                            background: url('../../common/image/good.png')
                            background-size: 100%
                .loading
                    position: relative
                    width: 100%
</style>