<template>
<transition name="slide">
    <div class="musicmenu">
        <div class="bgtop-wrapper">
            <div class="topbg" :style="bgStyle" ref="topbg"> 
                <div class="topmask" ref="topmask"></div>
            </div>
        </div>
        <div class="top">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title-horse" v-show="!showHorse">{{ menuTitle }}</h1>
            <div class="title-horse" v-show="showHorse">
                <span class="title">{{ menuTitle }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="title">{{ menuTitle }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
        </div>
        <div class="bgimg" :style="bgStyle" ref="bgimg">
            <div class="mask" ref="mask"></div>
        </div>
        <div class="banner" ref="banner">
            <div class="info">
                <div class="left">
                    <img :src="this.banner.picUrl" width="100%" height="100%" alt="" ref="bannerImg">
                </div>
                <div class="right" v-show="showMenuInfo">
                    <div class="title">{{ musicmenu.name }}</div>
                    <div class="author">
                        <div class="avatar"><img :src="banner.authorAvatar" width="30" height="30" alt=""></div>
                        <div class="author-name">{{ banner.authorName }}</div>
                    </div>
                </div>
            </div>
            <div class="banner-icons">
                <div class="banner-icon">
                    <div class="icon icon-add-project"></div>
                    <div class="text">{{ banner.subscribedCount }}</div>
                </div>
                <div class="banner-icon">
                    <div class="icon icon-msg"></div>
                    <div class="text">{{ banner.commentCount }}</div>
                </div>
                <div class="banner-icon">
                    <div class="icon icon-share"></div>
                    <div class="text">{{ banner.shareCount }}</div>
                </div>
                <div class="banner-icon">
                    <div class="icon icon-download"></div>
                    <div class="text">下载</div>
                </div>
            </div>
        </div>
        <div class="control-tab" ref="tab" @click="playAll">
            <div class="left">
                <span class="icon"><i class="icon-playdetail"></i></span>
                <span class="text">播放全部&nbsp;<span class="num">(共{{menuSongs.length}}首)</span></span>
            </div>
            <div class="right">
                <span class="icon"><i class="icon-list-music"></i></span>
                <span class="text">多选</span>
            </div>
        </div>
        <scroll @scrollPos="scrollPos" :data="menuSongs" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper" ref="songlist">
            <div>
                <songlist :songs="menuSongs" :toolbarType="0" @selectsong="selectSong"></songlist>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="loading-wrapper">
            <loading v-show="!menuSongs.length"></loading>
        </div>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import {getMusicMenu} from 'api/music.js';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import {createSong} from 'common/js/song.js';
    import scroll from 'base/scroll/scroll.vue';
    import songlist from 'components/songlist/songlist.vue';
    import loading from 'base/loading/loading.vue';
    import {prefixStyle} from 'common/js/dom.js';

    const transform = prefixStyle('transform');
    const TITLE_HEIGHT = 44;
    const LIST_TAB_HEIGHT = 40;
    const ICON_TAB = 64;
    const coef = 0.89;

    export default {
        data () {
            return {
                menuSongs: [],
                scrollY: 0,
                showHorse: false,  // 走马灯标志位
                menuTitle: this.title  // 单项数据流,不能直接改变props传过来的值
            };
        },
        props: {
            title: {
                type: String,
                default: '歌单'
            },
            showMenuInfo: {
                type: Boolean,
                default: true
            }
        },
        created () {
            this._getMusicMenu();
            this.probeType = 3;
            this.listenScroll = true;
            this.banner = {};  // banner上所需要的信息
        },
        mounted () {
            this.imgHeight = this.$refs.bgimg.clientHeight;
            this.$refs.songlist.$el.style.top = this.imgHeight + LIST_TAB_HEIGHT + 'px';
            this.$refs.banner.style.height = this.imgHeight + 'px';
            this.$refs.bannerImg.style.width = (this.imgHeight - TITLE_HEIGHT - ICON_TAB) * coef + 'px';
            this.$refs.bannerImg.style.height = (this.imgHeight - TITLE_HEIGHT - ICON_TAB) * coef + 'px';

            window.addEventListener('resize', () => {
                this.imgHeight = this.$refs.bgimg.clientHeight;
                this.$refs.songlist.$el.style.top = this.imgHeight + LIST_TAB_HEIGHT + 'px';
                this.$refs.banner.style.height = this.imgHeight + 'px';
                this.$refs.bannerImg.style.width = (this.imgHeight - TITLE_HEIGHT - ICON_TAB) * coef + 'px';
                this.$refs.bannerImg.style.height = (this.imgHeight - TITLE_HEIGHT - ICON_TAB) * coef + 'px';
            });
        },
        methods: {
            _getMusicMenu () {
                getMusicMenu(this.musicmenu.id).then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        // 封装Song类,之后传入songlist组件
                        this.menuSongs = this._normalizeSongs(res.playlist.tracks);
                        console.log(this.menuSongs);
                        // banner上所需要的信息
                        this.banner.picUrl = res.playlist.coverImgUrl;
                        this.banner.authorName = res.playlist.creator.nickname;
                        this.banner.authorAvatar = res.playlist.creator.avatarUrl;
                        this.banner.commentCount = res.playlist.commentCount;
                        this.banner.shareCount = res.playlist.shareCount;
                        this.banner.subscribedCount = res.playlist.subscribedCount;
                    }
                });
            },
            _normalizeSongs (songs) {
                let ret = [];
                songs.forEach((song) => {
                    if (song.id) {
                        ret.push(createSong(song));
                    }
                });
                return ret;
            },
            back () {
                this.$router.back();
                // this.$router.push({
                //     path: '/findmusic/music'
                // });
            },
            openPlayer () {
                this.setFullScreen(true);
            },
            scrollPos (pos) {
                this.scrollY = pos.y;
            },
            // 向state提交此歌手的全部歌曲列表和当前点击歌曲的index
            selectSong (song, index) {
                this.selectPlay({
                    song: this.menuSongs,
                    index: index
                });
            },
            playAll () {
               this.selectPlay({
                    song: this.menuSongs,
                    index: 0
                });
            },
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN'
            }),
            ...mapActions([
                'selectPlay'
            ])
        },
        computed: {
            bgStyle () {
                return `background-image: url(${this.musicmenu.picUrl})`;
            },
            ...mapGetters([
                'musicmenu',
                'playing'
            ])
        },
        watch: {
            scrollY (newY) {
                this.minTranslateY = -this.imgHeight + TITLE_HEIGHT;
                let translateY = Math.max(this.minTranslateY, newY);
                this.$refs.bgimg.style[transform] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.tab.style[transform] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.banner.style[transform] = `translate3d(0, ${translateY}px, 0)`;

                if (translateY < 0) {
                    this.$refs.topbg.style['background-position-y'] = translateY + 'px';
                }

                // 滚到一定位置,歌单标题改变,且改变走马灯标志位
                if (newY <= -this.imgHeight / 2) {
                    this.menuTitle = this.musicmenu.name;
                    // ranklist时不启用走马灯
                    if (this.showMenuInfo === true) {
                        this.showHorse = true;
                    }
                } else {
                    this.menuTitle = '歌单';
                    this.showHorse = false;
                }
            }
        },
        components: {
            scroll,
            songlist,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .musicmenu
        position: fixed   // 相对于视窗
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 100
        background: #ffffff
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .bgtop-wrapper
            position: absolute
            height: 44px
            width: 100%
            background: #ffffff
            z-index: 20
            .topbg
                position: absolute
                height: 44px
                width: 100%
                background-size: 100%
                background-position-y: 0
                opacity: 0.9
                filter: blur(30px)
                .topmask
                    position: absolute
                    top: 0
                    bottom: 0
                    left: 0
                    right: 0
                    background: rgba(0, 0, 0, 0.4)
        .top
            position: absolute
            height: 44px
            width: 100%
            z-index: 20
            .back
                position: absolute
                top: 11px
                left: 17px
                height: 22px
                .icon-left
                    font-size: 22px
                    line-height: 22px
                    color: #ffffff
            .title-horse
                position: absolute
                left: 50%
                top: 50%
                width: 55%
                transform: translate(-50%, -50%)
                white-space: nowrap
                overflow: hidden
                text-align: center
                font-weight: 300
                color: #ffffff
                .title
                    display: inline-block
                    animation: horse 12s linear infinite
                    animation-delay: 4s
            .music-on
                position: absolute
                right: 13px
                top: 11px
                width: 22px
                height: 22px
                background: url("../../common/image/music.png")
                background-size: 22px 22px
                &.on
                    background: url("../../common/image/music_on.gif")
                    background-size: 22px 22px
        .bgimg
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            background-size: 100%
            z-index: 10
            opacity: 0.9
            filter: blur(30px)
            .mask
                position: absolute
                top: 0
                bottom: 0
                left: 0
                right: 0
                background: rgba(0, 0, 0, 0.4)
        .banner
            position: absolute
            top: 0
            height: 0
            width: 100%
            z-index: 10
            .banner-icons
                position: absolute
                bottom: 0
                left: 0
                width: 100%
                height: 58px
                display: flex
                // background: red
                .banner-icon
                    flex: 1
                    text-align: center
                    .icon
                        margin-top: 9px
                        font-size: 24px
                        color: #ffffff
                    .text
                        margin-top: 8px
                        font-size: 10px
                        color: rgba(255, 255, 255, 0.7)
            .info
                position: absolute
                bottom: 64px
                width: 100%
                padding: 0 15px
                box-sizing: border-box
                display: flex
                .left
                    flex: 0 0 142px
                .right
                    flex: 1
                    margin-left: 17px
                    font-weight: normal
                    color: #ffffff
                    .title
                        margin-top: 18px
                        line-height: 1.2
                    .author
                        margin-top: 22px
                        height: 30px
                        .avatar
                            display: inline-block
                            width: 30px
                            height: 30px
                            border-radius: 50%
                            overflow: hidden
                        .author-name
                            display: inline-block
                            vertical-align: top
                            height: 30px
                            line-height: 30px
                            font-size: 13px
                            color: rgba(255, 255, 255, 0.7)
        .control-tab
            position: relative
            height: 40px
            line-height: 40px
            background: #ffffff
            z-index: 10
            .left
                position: absolute
                left: 9px
                font-size: 0px
                .icon
                    display: inline-block
                    vertical-align: top
                    font-size: 18px
                    margin-top: 2px 
                .text
                    display: inline-block
                    vertical-align: top
                    margin-left: 9px
                    font-size: 14px
                    .num
                        color: rgba(0, 0, 0, 0.5)
                        font-size: 13px
            .right
                position: absolute
                right: 12px
                font-size: 0px
                .icon
                    display: inline-block
                    vertical-align: top
                    font-size: 16px
                    margin-top: 1px   // 这里为什么要偏1px我也不知道啊啊啊
                .text
                    display: inline-block
                    vertical-align: top
                    font-size: 12px
        .songlist-wrapper
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            background: #ffffff
            // overflow: hidden
            .bottom
                width: 100%
                height: 80px
        .loading-wrapper
            position: absolute
            width: 100%
            top: 70%
            transform: translateY(-50%)    

    @keyframes horse
        0%
            transform: translateX(0)
        70%
            transform: translateX(-100%)
        100%
            transform: translateX(-100%)
</style>