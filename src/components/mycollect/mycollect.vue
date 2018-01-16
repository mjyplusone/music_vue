<template>
<transition name="slide">
    <div class="mycollect">
        <m-header :tabType="tabType" :title="title"></m-header>
        <div class="control-tab" ref="tab" @click="playAll" v-show="favoriteList.length">
            <div class="left">
                <span class="icon"><i class="icon-playdetail"></i></span>
                <span class="text">播放全部&nbsp;<span class="num">(共{{ favoriteList.length }}首)</span></span>
            </div>
            <div class="right">
                <span class="icon"><i class="icon-list-music"></i></span>
                <span class="text">多选</span>
            </div>
        </div>
        <scroll :data="favoriteList" class="songlist-wrapper">
            <div>
                <songlist :songs="favoriteList" :toolbarType="0" @selectsong="selectSong"></songlist>
                <div class="no-result" v-show="!favoriteList.length">你可以<span class="red">❤</span>收藏喜欢的音乐</div>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import songlist from 'components/songlist/songlist.vue';
    import scroll from 'base/scroll/scroll.vue';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data () {
            return {
                tabType: 'back',
                title: '我的收藏'
            };
        },
        computed: {
            ...mapGetters([
                'favoriteList'
            ])
        },
        methods: {
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
            ...mapActions([
                'selectPlay'
            ])
        },
        components: {
            MHeader,
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mycollect
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: #ffffff
        z-index: 100
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
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
            width: 100%
            height: 100%
            overflow: hidden
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
                height: 140px
</style>