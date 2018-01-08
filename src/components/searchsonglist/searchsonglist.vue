<template>
    <div class="searchsonglist">
        <scroll :data="searchSongList" :probeType="probeType" :listenScroll="listenScroll" 
                class="list-wrapper" ref="scroll">
            <div>
                <div class="match" v-show="matchArtist.length || matchAlbum.length">
                    <h1 class="match-name">最佳匹配</h1>
                    <ul>
                        <li class="match-item match-artist border-1px" v-for="artist in matchArtist" @click="selectArtist(artist)">
                            <div class="left">
                                <img :src="artist.picUrl" @load="loadImage" width="54" height="54" alt="">
                            </div>
                            <div class="right">
                                歌手:&nbsp;<span v-html="artist.highlightname || artist.name"></span>&nbsp;<span v-if="artist.alias.length" class="alias">({{ artist.alias[0] }})</span>
                            </div>
                            <i class="icon-right"></i>
                        </li>
                        <li class="match-item match-album border-1px" v-for="album in matchAlbum">
                            <div class="left">
                                <img :src="album.picUrl" width="54" height="54" alt="">
                            </div>
                            <div class="right">
                                <div class="albumname">
                                    专辑:&nbsp;<span v-html="album.highlightname || album.name"></span>&nbsp;<span v-if="album.alias.length" class="alias">({{ album.alias[0] }})</span>
                                </div>
                                <div class="aritistname" v-html="album.artist.highlightname || album.artist.name"></div>
                            </div>
                            <i class="icon-right"></i>
                        </li>
                    </ul>
                </div>
                <songlist :songs="searchSongList" :toolbarType="2" :highlight="true" @selectsong="selectSong"></songlist>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import songlist from 'components/songlist/songlist.vue';
    import scroll from 'base/scroll/scroll.vue';
    import {mapActions, mapMutations, mapGetters} from 'vuex';

    export default {
        props: {
            searchSongList: {
                type: Array,
                default: []
            },
            toolbarType: {
                type: Number,
                default: 0
            },
            matchArtist: {
                type: Array,
                default: []
            },
            matchAlbum: {
                type: Array,
                default: []
            }
        },
        created () {
            this.probeType = 3;
            this.listenScroll = true;
        },
        computed: {
            ...mapGetters([
                'query'
            ])
        },
        methods: {
            // 向state提交全部歌曲列表和当前点击歌曲的index
            selectSong (song, index) {
                this.selectPlay({
                    song: this.searchSongList,
                    index: index
                });
            },
            selectArtist (artist) {
                // console.log(artist);
                this.setSingerBackRoute(this.$route.path);
                this.setSinger(artist);
                this.$router.push({
                    path: this.$route.path + `/${artist.id}`
                });
            },
            loadImage () {
                this.$refs.scroll.refresh();
            },
            ...mapMutations({
                setSinger: 'SET_SINGER',
                setSingerBackRoute: 'SET_SINGERBACKROUTE'
            }),
            ...mapActions([
                'selectPlay'
            ])
        },
        components: {
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .searchsonglist
        width: 100%
        height: 100%
        overflow: hidden
        .list-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .match
                width: 100%
                padding-left: 10px
                box-sizing: border-box
                .match-name
                    height: 30px
                    line-height: 30px
                    font-size: 13px
                    color: rgba(0, 0, 0, 0.7)
                .match-item
                    display: flex
                    width: 100%
                    height: 64px
                    padding: 5px 0
                    box-sizing: border-box
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    &:last-child
                        border-1px(rgba(0, 0, 0, 0), after, bottom)
                    .left
                        flex: 0 0 54px
                    .right
                        position: relative
                        flex: 1
                        margin-left: 18px
                        font-size: 14px
                    .icon-right
                        position: absolute
                        top: 24px
                        right: 9px
                        font-size: 16px
                        color: rgba(7, 17, 27, 0.3)
                .match-artist
                    .right
                        line-height: 54px
                        .alias
                            color: rgba(0, 0, 0, 0.7)
                .match-album
                    .right
                        .albumname
                            position: absolute
                            top: 10px
                            left: 0
                            right: 30px
                            line-height: 1.1
                            white-space: nowrap
                            text-overflow: ellipsis
                            overflow: hidden
                            .alias
                                color: rgba(0, 0, 0, 0.7)
                        .aritistname
                            position: absolute
                            top: 34px
                            line-height: 1
                            font-size: 12px
                            color: rgba(0, 0, 0, 0.5)
        .bottom
            width: 100%
            height: 110px
</style>