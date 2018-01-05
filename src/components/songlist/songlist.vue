<template>
    <div class="songlist">
        <ul>
            <li class="toolbar border-1px" v-show="isShow">
                <div class="left">
                    <span class="icon"><i class="icon-add-project"></i></span>
                    <span class="text">收藏热门50</span>
                </div>
                <div class="right">
                    <span class="icon"><i class="icon-list-music"></i></span>
                    <span class="text">多选</span>
                </div>
            </li>
            <li class="song-item" v-for="(song, index) in songs" @click="selectSong(song, index)">
                <span class="num" v-show="showIndex">{{ index + 1 }}</span>
                <span class="songinfo border-1px">
                    <div class="left">
                        <div class="name"><span>{{ song.name }}</span></div>
                        <div class="album"><span v-show="!isShow">{{ song.singer }} - </span>{{ song.album }}</div>
                    </div>
                    <div class="playdetail"><i class="icon-playdetail"></i></div>
                    <div class="list-circle"><i class="icon-list-circle"></i></div>
                </span>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    const MUSIC_MENU_TYPE = 0;
    const SINGER_HOTSONG_LIST_TYPE = 1;
    const SEARCH_LIST_TYPE = 2;

    export default {
        props: {
            toolbarType: {
                type: Number,
                default: 0
            },
            songs: {
                type: Array,
                default: []
            }
        },
        mounted () {
            // window.addEventListener('touchmove', fn, { passive: false });
        },
        computed: {
            isShow () {
                if (this.toolbarType === MUSIC_MENU_TYPE || this.toolbarType === SEARCH_LIST_TYPE) {
                    return false;
                } else if (this.toolbarType === SINGER_HOTSONG_LIST_TYPE) {
                    return true;
                }
            },
            showIndex () {
                if (this.toolbarType === SEARCH_LIST_TYPE) {
                    return false;
                } else {
                    return true;
                }
            }
            // toolbarLeftIcon () {
            //     if (this.toolbarType === MUSIC_MENU_TYPE) {
            //         return 'icon-playdetail';
            //     } else if (this.toolbarType === SINGER_HOTSONG_LIST_TYPE) {
            //         return 'icon-add-project';
            //     }
            // },
            // toolbarLeftText () {
            //     if (this.toolbarType === MUSIC_MENU_TYPE) {
            //         return '播放全部';
            //     } else if (this.toolbarType === SINGER_HOTSONG_LIST_TYPE) {
            //         return '收藏热门50';
            //     }
            // }
        },
        methods: {
            selectSong (song, index) {
                this.$emit('selectsong', song, index);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    
    .songlist
        li
            display: block
            height: 49px
            line-height: 49px 
        .toolbar
            position: relative
            .left
                position: absolute
                left: 9px
                font-size: 0px
                .icon
                    display: inline-block
                    vertical-align: top
                    font-size: 20px
                    color: #d33a31
                .text
                    display: inline-block
                    vertical-align: top
                    margin-left: 9px
                    font-size: 14px
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
        .song-item
            display: flex
            font-size: 0
            &:nth-child(2)
                .songinfo
                    border-1px(rgba(7, 17, 27, 0.1), before, top)
            .num
                flex: 0 0 37px
                text-align: center
                font-size: 14px
                color: #949496
            .songinfo
                position: relative
                flex: 1
                line-height: 1
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                .left
                    position: absolute
                    left: 0
                    right: 85px
                    // background: red
                    .name
                        margin-top: 9px
                        line-height: 1.1
                        white-space: nowrap
                        text-overflow: ellipsis
                        overflow: hidden
                        font-size: 14px
                    .album
                        margin-top: 6px
                        line-height: 1.2
                        white-space: nowrap
                        text-overflow: ellipsis
                        overflow: hidden
                        font-size: 10px
                        color: #949496
                .list-circle
                    position: absolute
                    right: 14px
                    top: 18px
                    width: 13px
                    height: 13px
                    transform: rotate(90deg)
                    font-size: 14px
                    color: #949496
                .playdetail
                    position: absolute
                    right: 53px
                    top: 50%
                    transform: translateY(-50%)
                    font-size: 18px
                    color: #949496
// 旋转
</style>