<template>
    <div class="searchresult">
        <div class="search-tab border-1px">
            <div class="tab-item" :class="{'active': tabType === 0}"  @click="selectSong"><span>单曲</span></div>
            <div class="tab-item" :class="{'active': tabType === 1}"  @click="selectSinger"><span>歌手</span></div>
            <div class="tab-item" :class="{'active': tabType === 2}"  @click="selectAlbum"><span>专辑</span></div>
            <div class="tab-item" :class="{'active': tabType === 3}"  @click="selectMenu"><span>歌单</span></div>
        </div>
        <scroll :data="searchSongList" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper">
            <div>
                <div class="match" v-show="(tabType === 0) && (matchArtist.length || matchAlbum.length)">
                    <h1 class="match-name">最佳匹配</h1>
                    <ul>
                        <li class="match-item match-artist border-1px" v-for="artist in matchArtist">
                            <div class="left">
                                <img :src="artist.picUrl" width="54" height="54" alt="">
                            </div>
                            <div class="right">
                                歌手:&nbsp;{{ artist.name }}&nbsp;<span v-if="artist.alias.length" class="alias">({{ artist.alias[0] }})</span>
                            </div>
                            <i class="icon-right"></i>
                        </li>
                        <li class="match-item match-album border-1px" v-for="album in matchAlbum">
                            <div class="left">
                                <img :src="album.picUrl" width="54" height="54" alt="">
                            </div>
                            <div class="right">
                                <div class="albumname">
                                    专辑:&nbsp;{{ album.name }}&nbsp;<span v-if="album.alias.length" class="alias">({{ album.alias[0] }})</span>
                                </div>
                                <div class="aritistname">{{ album.artist.name }}</div>
                            </div>
                            <i class="icon-right"></i>
                        </li>
                    </ul>
                </div>
                <router-view :songs="searchSongList" :toolbarType="2"
                             :hotAlbums="hotAlbums"></router-view>
                <!-- <songlist :songs="searchSongList" :toolbarType="2"></songlist> -->
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    import {search, searchsuggest, searchmatch} from 'api/search.js';
    import songlist from 'components/songlist/songlist.vue';
    import {createSearchSong} from 'common/js/song.js';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        data () {
            return {
                // 最佳匹配
                matchArtist: [],
                matchAlbum: [],
                // 单曲
                searchSongList: [],
                // 专辑
                hotAlbums: [],
                tabType: 0
            };
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
            search () {
                search(this.query).then((res) => {
                    if (res.code === 200) {
                        console.log(res.result);
                        this.searchSongList = this._normalizeSongs(res.result.songs);
                        console.log(this.searchSongList);
                    }
                });
            },
            searchsuggest () {
                searchsuggest(this.query).then((res) => {
                    if (res.code === 200) {
                        console.log(res.result);
                    }
                });
            },
            searchmatch () {
                searchmatch(this.query).then((res) => {
                    if (res.code === 200) {
                        console.log(res.result);
                        res.result.orders.forEach((item) => {
                            if (item === 'artist') {
                                this.matchArtist = res.result.artist;
                                console.log(this.matchArtist);
                            } else if (item === 'album') {
                                this.matchAlbum = res.result.album;
                                console.log(this.matchAlbum);
                            }
                        });
                    }
                });
            },
            selectSong () {
                this.tabType = 0;
                this.$router.push({
                    path: '/findmusic/search/song'
                });
            },
            selectSinger () {
                this.tabType = 1;
            },
            selectAlbum () {
                this.tabType = 2;
                this.$router.push({
                    path: '/findmusic/search/album'
                });
            },
            selectMenu () {
                this.tabType = 3;
            },
            _normalizeSongs (songs) {
                let ret = [];
                songs.forEach((song) => {
                    if (song.id) {
                        ret.push(createSearchSong(song));
                    }
                });
                return ret;
            },
            ...mapMutations({
                setQuery: 'SET_QUERY'
            })
        },
        watch: {
            query () {
                // query值为空时,清空列表且不发请求
                if (this.query === '') {
                    this.searchSongList = [];
                    this.matchArtist = [];
                    this.matchAlbum = [];
                    return;
                }
                this.searchmatch();
                this.search();
                // this.searchsuggest();
            }
        },
        components: {
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .searchresult
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        background: #ffffff
        .search-tab
            height: 40px
            display: flex
            line-height: 40px
            background: #f8f8f9
            border-1px(rgba(7, 17, 27, 0.1), after, bottom)
            .tab-item
                flex: 1
                height: 100%s
                text-align: center
                font-size: 13px
                span 
                    display: inline-block
                    height: 100%
                    padding: 0 6px
                    box-sizing: border-box
                &.active
                    color: #d33a31
                    span 
                        border-bottom: 2px solid #d33a31
        .songlist-wrapper
            width: 100%
            height: 100%
            padding-left: 10px
            box-sizing: border-box
            overflow: hidden
            .match
                width: 100%
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
                            margin-top: 10px
                            line-height: 1
                            .alias
                                color: rgba(0, 0, 0, 0.7)
                        .aritistname
                            margin-top: 10px
                            line-height: 1
                            font-size: 12px
                            color: rgba(0, 0, 0, 0.5)
            .bottom
                width: 100%
                height: 110px
        
</style>