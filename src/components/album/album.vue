<template>
    <div class="album">
        <ul>
            <li v-for="album in hotAlbums" class="album-list">
                <div class="pic">
                    <img v-lazy="album.picUrl" width="54" height="54" alt="">
                </div>
                <div class="content">
                    <div class="album-name">{{ album.name }}</div>
                    <div class="date-size">{{ album.publishTime }} {{ album.size }}首</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    // import {getSingerAlbum} from 'api/singer.js';
    // import {createAlbum} from 'common/js/album.js';

    export default {
        // data () {
        //     return {
        //         hotAlbums: []
        //     };
        // },
        props: {
            hotAlbums: {
                type: Array,
                default: []
            },
            singerId: {
                type: Number,
                default: null
            }
        }
        // created () {
        //     this._getSingerAlbum();
        // },
        // methods: {
        //     _getSingerAlbum () {
        //         getSingerAlbum(this.singerId).then((res) => {
        //             if (res.code === 200) {
        //                 this.hotAlbums = this._normalizeAlbum(res.hotAlbums);
        //                 this.$emit('albumRefresh', this.hotAlbums);
        //                 console.log(this.hotAlbums);
        //             }
        //         });
        //     },
        //     _normalizeAlbum (hotAlbums) {
        //         let ret = [];
        //         hotAlbums.forEach((album) => {
        //             ret.push(createAlbum(album));
        //         });
        //         return ret;
        //     }
        // }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .album
        .album-list
            display: flex
            width: 100%
            height: 60px
            box-sizing: border-box
            .pic
                flex: 0 0 54px
                padding: 3px 6px
            .content
                flex: 1
                margin-left: 9px
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                .album-name
                    margin-top: 13px
                    line-height: 1
                    font-size: 14px
                .date-size
                    margin-top: 10px
                    line-height: 1
                    font-size: 10px
                    color: #949496
</style>