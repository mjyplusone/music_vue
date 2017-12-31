<template>
<transition name="slide">
    <div class="dailyrecommend">
        <m-header :tabType="tabType" :title="title"></m-header>
        <div class="banner">
            <img :src="bannerUrl" width="100%" alt="" ref="banner" @load="loadImage">
        </div>
         <div class="control-tab" ref="tab" @click="playAll">
            <div class="left">
                <span class="icon"><i class="icon-playdetail"></i></span>
                <span class="text">播放全部&nbsp;<span class="num">(共{{recommendSongs.length}}首)</span></span>
            </div>
            <div class="right">
                <span class="icon"><i class="icon-list-music"></i></span>
                <span class="text">多选</span>
            </div>
        </div>
        <scroll @scrollPos="scrollPos" :data="recommendSongs" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper" ref="songlist">
            <div>
                <songlist :songs="recommendSongs" :toolbarType="0" @selectsong="selectSong"></songlist>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import songlist from 'components/songlist/songlist.vue';
    import {getRecommendBanner, getRecommendSongs} from 'api/recommend.js';
    import {createRecommendSong} from 'common/js/song.js';
    import {mapActions} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';
    import {prefixStyle} from 'common/js/dom.js';

    const transform = prefixStyle('transform');
    const TITLE_HEIGHT = 44;
    const LIST_TAB_HEIGHT = 40;

    export default {
        data () {
            return {
                tabType: 'back',
                title: '每日推荐',
                bannerUrl: '',
                recommendSongs: [],
                scrollY: 0
            };
        },
        created () {
            this._getRecommendBanner();
            this._getRecommendSongs();
            this.probeType = 3;
            this.listenScroll = true;
        },
        mounted () {
            this.bannerHeight = this.$refs.banner.clientHeight;
            this.$refs.songlist.$el.style.top = this.bannerHeight + TITLE_HEIGHT + LIST_TAB_HEIGHT + 'px';

            window.addEventListener('resize', () => {
                this.bannerHeight = this.$refs.banner.clientHeight;
                this.$refs.songlist.$el.style.top = this.bannerHeight + TITLE_HEIGHT + LIST_TAB_HEIGHT + 'px';
            });
        },
        methods: {
            _getRecommendBanner () {
                getRecommendBanner().then((res) => {
                    if (res.code === 200) {
                        this.bannerUrl = res.banners[0].pic;
                    }
                });
            },
            _getRecommendSongs () {
                getRecommendSongs().then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        this.recommendSongs = this._normalizeSongs(res.result);
                        console.log(this.recommendSongs);
                    }
                });
            },
            _normalizeSongs (songs) {
                let ret = [];
                songs.forEach((song) => {
                    if (song.id) {
                        ret.push(createRecommendSong(song));
                    }
                });
                return ret;
            },
            scrollPos (pos) {
                this.scrollY = pos.y;
            },
            // 向state提交此歌手的全部歌曲列表和当前点击歌曲的index
            selectSong (song, index) {
                this.selectPlay({
                    song: this.recommendSongs,
                    index: index
                });
            },
            playAll () {
               this.selectPlay({
                    song: this.recommendSongs,
                    index: 0
                });
            },
            loadImage () {
                this.bannerHeight = this.$refs.banner.clientHeight;
                this.$refs.songlist.$el.style.top = this.bannerHeight + TITLE_HEIGHT + LIST_TAB_HEIGHT + 'px';
            },
            ...mapActions([
                'selectPlay'
            ])
        },
        watch: {
            scrollY (newY) {
                this.minTranslateY = -this.bannerHeight + TITLE_HEIGHT;
                let translateY = Math.max(this.minTranslateY, newY);
                this.$refs.tab.style[transform] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.banner.style[transform] = `translate3d(0, ${translateY}px, 0)`;
            }
        },
        components: {
            MHeader,
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .dailyrecommend
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
        .banner
            position: relative
            width: 100%
            z-index: 10
        .control-tab
            position: relative
            height: 40px
            line-height: 40px
            margin-top: -4px   // 不知道为什么img和tab之间有几px空白。。。原因待找
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
</style>