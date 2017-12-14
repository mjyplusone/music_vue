<template>
    <div class="musicmenu">
        <div class="top">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">{{ title }}</h1>
            <div class="music-on"></div>
        </div>
        <!-- bgimg filter后,遮不住scroll,加上一个z-index为5的遮罩层,不影响bgimg,遮住scroll -->
        <div class="bgmask"></div>
        <div class="bgimg" :style="bgStyle" ref="bgimg">
            <div class="mask" ref="mask"></div>
            <div class="collect"><span class="add">+</span>&nbsp;&nbsp;收&nbsp;&nbsp;藏</div>
        </div>
        <div class="list-tab border-1px" ref="tab">
            <div class="tab-item active">
                <span>热门50</span>
            </div>
            <div class="tab-item">
                <span>专辑</span>
            </div>
            <div class="tab-item">
                <span>歌手信息</span>
            </div>
        </div>
        <!-- <div class="bg-layer" ref="bglayer"></div> -->
        <scroll @scrollPos="scrollPos" :data="songs" :probeType="probeType" :listenScroll="listenScroll" class="songlist-wrapper" ref="songlist">
            <div>
                <songlist :songs="songs" :toolbarType="1"></songlist>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="loading-wrapper">
            <loading v-show="!songs.length"></loading>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import songlist from 'components/songlist/songlist.vue';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';

    const TITLE_HEIGHT = 44;
    const LIST_TAB_HEIGHT = 40;

    export default {
        props: {
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
            }
        },
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
        },
        computed: {
            bgStyle () {
                return `background-image: url(${this.bgimg})`;
            }
        },
        methods: {
            scrollPos (pos) {
                this.scrollY = pos.y;
            },
            back () {
                this.$router.back();
            }
        },
        watch: {
            scrollY (newY) {
                this.minTranslateY = -this.imgHeight + TITLE_HEIGHT;
                let translateY = Math.max(this.minTranslateY, newY);
                this.$refs.bgimg.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.bgimg.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.tab.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.tab.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;
                let blurSize = (translateY / this.minTranslateY) * 6;
                this.$refs.bgimg.style['filter'] = `blur(${blurSize}px)`;
                let bgOpacity = (translateY / this.minTranslateY) * 0.5;
                this.$refs.mask.style['background'] = `rgba(0, 0, 0, ${bgOpacity})`;

                // 下拉图片放大
                if (newY > 0) {
                    let scale = 1 + Math.abs(newY / this.imgHeight);
                    this.$refs.bgimg.style['transform'] = `scale(${scale})`;
                    this.$refs.bgimg.style['webkitTransform'] = `scale(${scale})`;
                }
                // this.$refs.bglayer.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
                // this.$refs.bglayer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;
                // // 滚动超出范围,设置bgimg的高度 newY this.minTranslateY都是负的
                // if (newY < this.minTranslateY) {
                //     zIndex = 10;
                //     this.$refs.bgimg.style.paddingTop = 0;
                //     this.$refs.bgimg.style.height = TITLE_HEIGHT + 'px';
                // } else {
                //     // 滚动没超出范围,要重置
                //     this.$refs.bgimg.style.paddingTop = '70%';
                //     this.$refs.bgimg.style.height = 0;
                // }
                // this.$refs.bgimg.style.zIndex = zIndex;
            }
        },
        components: {
            songlist,
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .musicmenu
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
            // background: rgba(0, 0, 0, 0.2)
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
            // transform: scale(1.1)
            z-index: 10
            .mask
                position: absolute
                top: 0
                bottom: 0
                left: 0
                right: 0
                background: rgba(0, 0, 0, 0.1)
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