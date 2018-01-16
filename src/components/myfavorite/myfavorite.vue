<template>
<transition name="slide">
    <div class="myfavorite">
        <div class="bgtop-wrapper">
            <div class="topbg" :style="bgStyle" ref="topbg"> 
                <div class="topmask" ref="topmask"></div>
            </div>
        </div>
        <div class="top">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title-horse">歌单</h1>
            <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
        </div>
        <div class="bgimg" :style="bgStyle" ref="bgimg">
            <div class="mask" ref="mask"></div>
        </div>
        <div class="banner" ref="banner">
            <div class="info">
                <div class="left">
                    <img :src="bannerImg" width="100%" height="100%" alt="" ref="bannerImg">
                </div>
                <div class="right">
                    <div class="title">我喜欢的音乐</div>
                    <div class="author">
                        <div class="avatar"><img src="../../../static/plusone.jpg" width="30" height="30" alt=""></div>
                        <div class="author-name">PlusOne</div>
                    </div>
                </div>
            </div>
            <div class="banner-icons">
                <div class="banner-icon">
                    <div class="icon icon-add-project"></div>
                    <div class="text">收藏</div>
                </div>
                <div class="banner-icon">
                    <div class="icon icon-msg"></div>
                    <div class="text">评论</div>
                </div>
                <div class="banner-icon">
                    <div class="icon icon-share"></div>
                    <div class="text">分享</div>
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
                <span class="text">播放全部&nbsp;<span class="num">(共{{ favoriteList.length }}首)</span></span>
            </div>
            <div class="right">
                <span class="icon"><i class="icon-list-music"></i></span>
                <span class="text">多选</span>
            </div>
        </div>
        <scroll @scrollPos="scrollPos" :data="favoriteList" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper" ref="songlist">
            <div>
                <songlist :songs="favoriteList" :toolbarType="0" @selectsong="selectSong"></songlist>
                <div class="no-result" v-show="!favoriteList.length">你可以<span class="red">❤</span>添加喜欢的音乐到歌单</div>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';
    import songlist from 'components/songlist/songlist.vue';
    import {prefixStyle} from 'common/js/dom.js';

    const transform = prefixStyle('transform');

    const TITLE_HEIGHT = 44;
    const LIST_TAB_HEIGHT = 40;
    const ICON_TAB = 64;
    const coef = 0.89;

    export default {
        data () {
            return {
                scrollY: 0
            };
        },
        created () {
            this.probeType = 3;
            this.listenScroll = true;
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
            back () {
                this.$router.back();
            },
            openPlayer () {
                this.setFullScreen(true);
            },
            selectSong (song, index) {
                this.selectPlay({
                    song: this.favoriteList,
                    index: index
                });
            },
            playAll () {
               this.selectPlay({
                    song: this.favoriteList,
                    index: 0
                });
            },
            scrollPos (pos) {
                this.scrollY = pos.y;
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
                if (this.favoriteList.length) {
                    return `background-image: url(${this.favoriteList[0].picUrl})`;
                }
            },
            bannerImg () {
                if (this.favoriteList.length) {
                    return this.favoriteList[0].picUrl;
                }
            },
            ...mapGetters([
                'playing',
                'favoriteList'
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
            }
        },
        components: {
            scroll,
            songlist
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .myfavorite
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: #ffffff
        z-index: 100
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
            .no-result
                position: absolute
                top: 20%
                width: 100%
                text-align: center
                color: rgba(0, 0, 0, 0.7)
                .red
                    color: #d43c33
            .bottom
                width: 100%
                height: 80px

    @keyframes horse
        0%
            transform: translateX(0)
        70%
            transform: translateX(-100%)
        100%
            transform: translateX(-100%)
</style>    