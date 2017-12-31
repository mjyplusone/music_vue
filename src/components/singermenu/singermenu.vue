<template>
    <div class="singermenu">
        <div class="topbg" ref="topbg"> 
            <div class="topmask" ref="topmask"></div>
        </div>
        <div class="top">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">{{ title }}</h1>
            <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
        </div>
        <!-- bgimg filter后,遮不住scroll,加上一个z-index为5的遮罩层,不影响bgimg,同时遮住scroll -->
        <div class="bgmask"></div>
        <div class="bgimg" :style="bgStyle" ref="bgimg">
            <div class="mask" ref="mask"></div>
        </div>
        <div class="banner" ref="banner">
            <div class="collect" ref="collect"><span class="add">+</span>&nbsp;&nbsp;收&nbsp;&nbsp;藏</div>
        </div>
        <div class="list-tab border-1px" ref="tab">
            <div class="tab-item" :class="{'active': tabType === 0}" @click="selectHotsong">
                <span>热门50</span>
            </div>
            <div class="tab-item" :class="{'active': tabType === 1}" @click="selectAlbum">
                <span>专辑</span>
            </div>
            <div class="tab-item" :class="{'active': tabType === 2}" @click="selectInfo">
                <span>歌手信息</span>
            </div>
        </div>
        <!-- <div class="bg-layer" ref="bglayer"></div> -->
        <scroll @scrollPos="scrollPos" :data="scrollData" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper" ref="songlist">
            <div>
                <!-- <songlist :songs="songs" :toolbarType="1" @selectsong="selectSong"></songlist> -->
                <keep-alive>
                    <router-view :songs="songs" :toolbarType="1" @selectsong="selectSong" 
                                 :singerId="singerId" :singerName="singerName" @infoRefresh="infoRefresh"
                                 @albumRefresh="albumRefresh">
                    </router-view>
                </keep-alive>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="loading-wrapper">
            <loading v-show="!songs.length"></loading>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';
    import {mapActions, mapMutations, mapGetters} from 'vuex';
    import {prefixStyle} from 'common/js/dom.js';

    const transform = prefixStyle('transform');
    const TITLE_HEIGHT = 44;
    const LIST_TAB_HEIGHT = 40;

    export default {
        props: {
            // 用于hotsong路由
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            bgimg: {
                type: String,
                default: ''
            },
            // 用于singerinfo路由
            singerId: {
                type: Number,
                default: null
            },
            singerName: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                scrollY: 0,
                // 选择的tab
                tabType: 0,
                introduction: [],
                hotAlbums: []
            };
        },
        created () {
            this.probeType = 3;
            this.listenScroll = true;
            this.isActive = true;
        },
        mounted () {
            this.imgHeight = this.$refs.bgimg.clientHeight;
            this.$refs.songlist.$el.style.top = this.imgHeight + LIST_TAB_HEIGHT + 'px';
            this.$refs.banner.style.height = this.imgHeight + 'px';

            window.addEventListener('resize', () => {
                this.imgHeight = this.$refs.bgimg.clientHeight;
                this.$refs.songlist.$el.style.top = this.imgHeight + LIST_TAB_HEIGHT + 'px';
                this.$refs.banner.style.height = this.imgHeight + 'px';
            });
        },
        computed: {
            bgStyle () {
                return `background-image: url(${this.bgimg})`;
            },
            scrollData () {
                if (this.tabType === 0) {
                    return this.songs;
                } else if (this.tabType === 1) {
                    return this.hotAlbums;
                } else if (this.tabType === 2) {
                    return this.introduction;
                }
            },
            ...mapGetters([
                'playing'
            ])
        },
        methods: {
            scrollPos (pos) {
                this.scrollY = pos.y;
            },
            back () {
                // this.$router.back();
                this.$router.push({
                    path: '/findmusic/singer'
                });
            },
            // 向state提交此歌手的全部歌曲列表和当前点击歌曲的index
            selectSong (song, index) {
                this.selectPlay({
                    song: this.songs,
                    index: index
                });
            },
            openPlayer () {
                this.setFullScreen(true);
            },
            infoRefresh (introduction) {
                this.introduction = introduction;
            },
            albumRefresh (hotAlbums) {
                this.hotAlbums = hotAlbums;
            },
            selectHotsong () {
                this.tabType = 0;
                this.$router.push({
                    path: '/findmusic/singer/this.singerId/hotsong'
                });
            },
            selectAlbum () {
                this.tabType = 1;
                this.$router.push({
                    path: '/findmusic/singer/this.singerId/album'
                });
            },
            selectInfo () {
                this.tabType = 2;
                this.$router.push({
                    path: '/findmusic/singer/this.singerId/info'
                });
            },
            ...mapActions([
                'selectPlay'
            ]),
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN'
            })
        },
        watch: {
            scrollY (newY) {
                this.minTranslateY = -this.imgHeight + TITLE_HEIGHT;
                let translateY = Math.max(this.minTranslateY, newY);
                this.$refs.bgimg.style[transform] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.tab.style[transform] = `translate3d(0, ${translateY}px, 0)`;
                let blurSize = (translateY / this.minTranslateY) * 3;
                this.$refs.bgimg.style['filter'] = `blur(${blurSize}px)`;
                let bgOpacity = (translateY / this.minTranslateY) * 0.7;
                this.$refs.mask.style['background'] = `rgba(0, 0, 0, ${bgOpacity})`;
                // 根据bgimg设置top的背景,top背景的filter和透明度要和bgimg保持一致
                // 只有向上滑动的时候会显示top层背景,用于遮住banner层
                if (translateY < 0) {
                    this.$refs.topbg.style['background-image'] = `url(${this.bgimg})`;
                    this.$refs.topbg.style['background-position-y'] = translateY + 'px';
                    this.$refs.topbg.style['filter'] = `blur(${blurSize}px)`;
                    this.$refs.topmask.style['background'] = `rgba(0, 0, 0, ${bgOpacity})`;
                } else {
                    this.$refs.topbg.style['background'] = '';
                }

                this.$refs.banner.style[transform] = `translate3d(0, ${translateY}px, 0)`;

                // 下拉图片放大
                if (newY > 0) {
                    // 乘个2这样效果比较好,很奇怪。。。
                    let scale = 1 + Math.abs((2 * newY) / this.imgHeight);
                    // let scale = 1 + Math.abs(newY / this.imgHeight);
                    this.$refs.bgimg.style[transform] = `scale(${scale})`;
                }
            }
        },
        components: {
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .singermenu
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        .topbg
            position: absolute
            height: 44px
            width: 100%
            background-size: 100%
            background-position-y: 0
            z-index: 20
            .topmask
                position: absolute
                top: 0
                bottom: 0
                left: 0
                right: 0
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
            .title
                position: absolute
                left: 50%
                top: 50%
                transform: translate(-50%, -50%)
                font-weight: 300
                color: #ffffff
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
        .bgmask
            position: absolute
            top: 0
            height: 44px
            width: 100%
            background: #ffffff
            z-index: 5
        .bgimg
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            background-size: 100%
            z-index: 10
            .mask
                position: absolute
                top: 0
                bottom: 0
                left: 0
                right: 0
                background: rgba(0, 0, 0, 0.1)
        .banner
            position: absolute
            top: 0
            height: 0
            width: 100%
            z-index: 10
            .collect
                position: absolute
                bottom: 14px
                right: 9px
                width: 77px
                height: 26px
                border: 1px solid #ffffff
                border-radius: 13px
                line-height: 26px
                text-align: center
                font-size: 12px
                font-weight: 300
                color: #ffffff
                &:hover
                    background: rgba(0, 0, 0, 0.1)
                &:active
                    background: rgba(0, 0, 0, 0.1)
                .add
                    vertical-align: top
                    font-weight: 300
                    font-size: 20px
        .list-tab
            position: relative
            display: flex
            height: 40px
            background: #ffffff
            border-1px(rgba(7, 17, 27, 0.1), after, bottom)
            z-index: 10
            .tab-item
                flex: 1
                height: 100%
                text-align: center
                line-height: 40px
                font-size: 13px
                span 
                    display: inline-block
                    height: 100%
                    box-sizing: border-box
                    padding: 0 5px
                &.active
                    color: #d33a31
                    span 
                        border-bottom: 2px solid #d33a31
        .bg-layer
            position: relative
            height: 100%
            background: #ffffff
        .songlist-wrapper
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            // overflow: hidden
            .bottom
                width: 100%
                height: 80px
        .loading-wrapper
            position: absolute
            width: 100%
            top: 70%
            transform: translateY(-50%)    
</style>