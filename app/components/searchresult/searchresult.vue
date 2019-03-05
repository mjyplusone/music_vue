<template>
    <div class="searchresult">
        <div class="search-tab border-1px">
            <div class="tab-item" :class="{'active': tabType === 0}"  @click="selectSongTab"><span>单曲</span></div>
            <div class="tab-item" :class="{'active': tabType === 1}"  @click="selectSingerTab"><span>歌手</span></div>
            <div class="tab-item" :class="{'active': tabType === 2}"  @click="selectAlbumTab"><span>专辑</span></div>
            <div class="tab-item" :class="{'active': tabType === 3}"  @click="selectMenuTab"><span>歌单</span></div>
        </div>
        <!-- <scroll :data="scrollData" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper" ref="scroll"> -->
            <!-- <div> -->
                <!-- <div class="match" v-show="(tabType === 0) && (matchArtist.length || matchAlbum.length)">
                    <h1 class="match-name">最佳匹配</h1>
                    <ul>
                        <li class="match-item match-artist border-1px" v-for="artist in matchArtist">
                            <div class="left">
                                <img :src="artist.picUrl" @load="loadImage" width="54" height="54" alt="">
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
                </div> -->
        <keep-alive>
            <router-view :searchSongList="searchSongList" :toolbarType="2" :matchArtist="matchArtist" :matchAlbum="matchAlbum"
                         :searchAlbumList="searchAlbumList" 
                         :artists="searchArtistList"
                         :menus="searchMenuList"
                         @searchmore="searchMore"
                         :hasMore="hasMore"></router-view>
        </keep-alive>
                <!-- <div class="bottom"></div> -->
            <!-- </div> -->
        <!-- </scroll> -->
        <div class="loading" v-show="!loading"><loading></loading></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    import {search, searchmatch} from 'api/search.js';
    import songlist from 'components/songlist/songlist.vue';
    import {createSearchSong} from 'common/js/song.js';
    import {createAlbum} from 'common/js/album.js';
    import loading from 'base/loading/loading.vue';
    import {debounce} from 'common/js/util.js';

    const limit = 20;  // 分页返回数据时,每页返回数量

    export default {
        data () {
            return {
                // 最佳匹配
                matchArtist: [],
                matchAlbum: [],
                // 单曲
                searchSongList: [],
                // 歌手
                searchArtistList: [],
                // 专辑
                searchAlbumList: [],
                // 歌单
                searchMenuList: [],
                // 当前tab
                tabType: 0,
                // 有更多可加载项
                hasMore: true,
                // 用于分页的页数
                currentPage: 0
            };
        },
        created () {
            this.searchmatch();
            this.search(1);
            // 第一次输入的query,由于searchresult组件未渲染完成,不能watch到
            // 一旦created,一定是query不为空,所以直接派发事件保存query
            this.$emit('changesearch');
            // 用回调函数的形式写,方便加上节流函数
            this.$watch('query', debounce(() => {
                // 这里不能watch query为空的情况,因为query为空,这个组件不渲染
                if (this.tabType === 0) {
                    this.searchmatch();
                    this.search(1);
                } else if (this.tabType === 1) {
                    this.search(100);
                } else if (this.tabType === 2) {
                    this.search(10);
                } else if (this.tabType === 3) {
                    this.search(1000);
                }
                this.$emit('changesearch');
            }, 200));
        },
        computed: {
            // scrollData () {
            //     if (this.tabType === 0) {
            //         return this.searchSongList;
            //     } else if (this.tabType === 1) {
            //         return this.searchArtistList;
            //     } else if (this.tabType === 2) {
            //         return this.searchAlbumList;
            //     } else if (this.tabType === 3) {
            //         return this.searchMenuList;
            //     }
            // },
            loading () {
                if (this.tabType === 0) {
                    return this.searchSongList;
                } else if (this.tabType === 1) {
                    return this.searchArtistList;
                } else if (this.tabType === 2) {
                    return this.searchAlbumList;
                } else if (this.tabType === 3) {
                    return this.searchMenuList;
                }
            },
            ...mapGetters([
                'query'
            ])
        },
        methods: {
            search (type) {
                // 每次重新请求数据时,要吧hasMore恢复为true,不然可能上一次searchmore结束之后已经被置为false
                // 同时把currentPage的值也恢复
                this.hasMore = true;
                this.currentPage = 0;
                // 列表恢复
                this.searchSongList = [];
                this.searchArtistList = [];
                this.searchAlbumList = [];
                this.searchMenuList = [];
                search(this.query, type, 0).then((res) => {
                    if (res.code === 200) {
                        console.log(res.result);
                        if (this.tabType === 0) {
                            if (!res.result.songs) {
                                this.searchSongList = [];
                                this.hasMore = false;
                                return;
                            }
                            // 修APIbug 保存一开始返回值中歌曲的总量
                            this.songCount = res.result.songCount;
                            this.searchSongList = this._normalizeSongs(res.result.songs);
                            this.highlight(this.searchSongList);
                            console.log(this.searchSongList);
                        } else if (this.tabType === 1) {
                            if (!res.result.artists) {
                                this.searchArtistList = [];
                                this.hasMore = false;
                                return;
                            }
                            // 修APIbug 保存一开始返回值中歌手的总量
                            this.artistCount = res.result.artistCount;
                            this.searchArtistList = this._normalizeArtists(res.result.artists);
                            this.highlight(this.searchArtistList);
                            console.log(this.searchArtistList);
                        } else if (this.tabType === 2) {
                            if (!res.result.albums) {
                                this.searchAlbumList = [];
                                this.hasMore = false;
                                return;
                            }
                            // 修APIbug 保存一开始返回值中专辑的总量
                            this.albumCount = res.result.albumCount;
                            this.searchAlbumList = this._normalizeAlbums(res.result.albums);
                            this.highlight(this.searchAlbumList);
                        } else if (this.tabType === 3) {
                            if (!res.result.playlists) {
                                this.searchMenuList = [];
                                this.hasMore = false;
                                return;
                            }
                            // 修APIbug 保存一开始返回值中歌单的总量
                            this.playlistCount = res.result.playlistCount;
                            this.searchMenuList = this._normalizeMenus(res.result.playlists);
                            this.highlight(this.searchMenuList);
                        }
                    }
                    this._checkMore(res.result);
                });
            },
            // 下拉加载
            searchMore (type) {
                if (!this.hasMore) {
                    return;
                }
                this.currentPage ++;
                search(this.query, type, this.currentPage * limit).then((res) => {
                    if (res.code === 200) {
                        console.log(res.result);
                        if (this.tabType === 0) {
                            // 修APIbug,防止没有res.result.songs,把hasMore置false,之后不再加载
                            if (!res.result.songs) {
                                this.hasMore = false;
                                return;
                            }
                            this.searchSongList = this.searchSongList.concat(this._normalizeSongs(res.result.songs));
                            this.highlight(this.searchSongList);
                        } else if (this.tabType === 1) {
                            if (!res.result.artists) {
                                this.hasMore = false;
                                return;
                            }
                            this.searchArtistList = this.searchArtistList.concat(this._normalizeArtists(res.result.artists));
                            this.highlight(this.searchArtistList);
                        } else if (this.tabType === 2) {
                            if (!res.result.albums) {
                                this.hasMore = false;
                                return;
                            }
                            this.searchAlbumList = this.searchAlbumList.concat(this._normalizeAlbums(res.result.albums));
                            this.highlight(this.searchAlbumList);
                        } else if (this.tabType === 3) {
                            if (!res.result.playlists) {
                                this.hasMore = false;
                                return;
                            }
                            this.searchMenuList = this.searchMenuList.concat(this._normalizeMenus(res.result.playlists));
                            this.highlight(this.searchMenuList);
                        }
                    }
                    this._checkMore(res.result);
                });
            },
            _checkMore (result) {
                // hasMore置false,表示不能继续加载
                if (this.tabType === 0) {
                    if (!result.songs || this.searchSongList.length >= this.songCount) {
                        this.hasMore = false;
                    }
                } else if (this.tabType === 1) {
                    console.log(this.searchArtistList.length);
                    if (!result.artists || this.searchArtistList.length >= this.artistCount) {
                        this.hasMore = false;
                    }
                } else if (this.tabType === 2) {
                    if (!result.albums || this.searchAlbumList.length >= this.albumCount) {
                        this.hasMore = false;
                    }
                } else if (this.tabType === 3) {
                     if (!result.playlists || this.searchMenuList.length >= this.playlistCount) {
                        this.hasMore = false;
                    }
                }
            },
            // searchsuggest () {
            //     searchsuggest(this.query).then((res) => {
            //         if (res.code === 200) {
            //             // console.log(res.result);
            //         }
            //     });
            // },
            // 最佳匹配
            searchmatch () {
                this.matchArtist = [];
                this.matchAlbum = [];
                searchmatch(this.query).then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                        if (!res.result.orders) {
                            return;
                        }
                        res.result.orders.forEach((item) => {
                            if (item === 'artist') {
                                this.matchArtist = res.result.artist;
                                this.highlight(this.matchArtist);
                                // console.log(this.matchArtist);
                            } else if (item === 'album') {
                                this.matchAlbum = res.result.album;
                                this.highlight(this.matchAlbum);
                                // console.log(this.matchAlbum);
                            }
                        });
                    }
                });
            },
            selectSongTab () {
                this.tabType = 0;
                this.$router.push({
                    path: '/findmusic/search/song'
                });
            },
            selectSingerTab () {
                this.tabType = 1;
                this.$router.push({
                    path: '/findmusic/search/artist'
                });
            },
            selectAlbumTab () {
                this.tabType = 2;
                this.$router.push({
                    path: '/findmusic/search/album'
                });
            },
            selectMenuTab () {
                this.tabType = 3;
                this.$router.push({
                    path: '/findmusic/search/menu'
                });
            },
            // loadImage () {
            //     this.$refs.scroll.refresh();
            // },
            // // 各个列表点击进入具体页面
            // // 向state提交全部歌曲列表和当前点击歌曲的index
            // selectSong (song, index) {
            //     this.selectPlay({
            //         song: this.searchSongList,
            //         index: index
            //     });
            // },
            _normalizeSongs (songs) {
                let ret = [];
                songs.forEach((song) => {
                    if (song.id) {
                        ret.push(createSearchSong(song));
                    }
                });
                return ret;
            },
            _normalizeArtists (artists) {
                let ret = [];
                artists.forEach((artist) => {
                    if (artist.id) {
                        ret.push({
                            id: artist.id,
                            name: artist.name,
                            picUrl: artist.picUrl,
                            alias: artist.alias
                        });
                    }
                });
                return ret;
            },
            _normalizeAlbums (albums) {
                let ret = [];
                albums.forEach((album) => {
                    if (album.id) {
                        ret.push(createAlbum(album));
                    }
                });
                return ret;
            },
            _normalizeMenus (menus) {
                let ret = [];
                menus.forEach((menu) => {
                    if (menu.id) {
                        ret.push({
                            id: menu.id,
                            name: menu.name,
                            trackCount: menu.trackCount,
                            creator: menu.creator.nickname,
                            playCount: this.normalCount(menu.playCount),
                            picUrl: menu.coverImgUrl
                        });
                    }
                });
                return ret;
            },
            highlight (list) {
                let re = RegExp(this.query, 'g');
                for (let i = 0; i < list.length; i++) {
                    if (list[i].name && re.test(list[i].name)) {
                        list[i].highlightname = list[i].name.replace(re, '<span class="highlight">' + this.query + '</span>');
                    }
                    if (list[i].singer && re.test(list[i].singer)) {
                        list[i].highlightsinger = list[i].singer.replace(re, '<span class="highlight">' + this.query + '</span>');
                    }
                    if (list[i].album && re.test(list[i].album)) {
                        list[i].highlightalbum = list[i].album.replace(re, '<span class="highlight">' + this.query + '</span>');
                    }
                    // 匹配专辑的作者名  matchAlbum.artist.name
                    if (list[i].artist && list[i].artist.name && re.test(list[i].artist.name)) {
                        list[i].artist.highlightname = list[i].artist.name.replace(re, '<span class="highlight">' + this.query + '</span>');
                    }
                }
            },
            // 歌单播放次数超过99999次,按...万次的格式显示
            normalCount (count) {
                if (count > 99999) {
                    return (count / 10000).toFixed(1) + '万';
                } else {
                    return count;
                }
            },
            ...mapMutations({
                setQuery: 'SET_QUERY'
            })
            // ...mapActions([
            //     'selectPlay'
            // ])
        },
        watch: {
            // query () {
            //     // 这里不能watch query为空的情况,因为query为空,这个组件不渲染
            //         if (this.tabType === 0) {
            //             this.searchmatch();
            //             this.search(1);
            //         } else if (this.tabType === 1) {
            //             this.search(100);
            //         } else if (this.tabType === 2) {
            //             this.search(10);
            //         } else if (this.tabType === 3) {
            //             this.search(1000);
            //         }
            // },
            tabType (newtab) {
                if (newtab === 0) {
                    this.searchmatch();
                    this.search(1);
                } else if (newtab === 1) {
                    this.search(100);
                } else if (newtab === 2) {
                    this.search(10);
                } else if (newtab === 3) {
                    this.search(1000);
                }
            }
        },
        components: {
            songlist,
            loading
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
        overflow: hidden
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
        .loading
            position: absolute
            top: 20%
            width: 100%
        .highlight
            color: #648db9
        // .songlist-wrapper
        //     width: 100%
        //     height: 100%
            // padding-left: 10px
            // box-sizing: border-box
            // overflow: hidden
            // .match
            //     width: 100%
            //     padding-left: 10px
            //     box-sizing: border-box
            //     .match-name
            //         height: 30px
            //         line-height: 30px
            //         font-size: 13px
            //         color: rgba(0, 0, 0, 0.7)
            //     .match-item
            //         display: flex
            //         width: 100%
            //         height: 64px
            //         padding: 5px 0
            //         box-sizing: border-box
            //         border-1px(rgba(7, 17, 27, 0.1), after, bottom)
            //         &:last-child
            //             border-1px(rgba(0, 0, 0, 0), after, bottom)
            //         .left
            //             flex: 0 0 54px
            //         .right
            //             position: relative
            //             flex: 1
            //             margin-left: 18px
            //             font-size: 14px
            //         .icon-right
            //             position: absolute
            //             top: 24px
            //             right: 9px
            //             font-size: 16px
            //             color: rgba(7, 17, 27, 0.3)
            //     .match-artist
            //         .right
            //             line-height: 54px
            //             .alias
            //                 color: rgba(0, 0, 0, 0.7)
            //     .match-album
            //         .right
            //             .albumname
            //                 position: absolute
            //                 top: 10px
            //                 left: 0
            //                 right: 30px
            //                 line-height: 1
            //                 white-space: nowrap
            //                 text-overflow: ellipsis
            //                 overflow: hidden
            //                 .alias
            //                     color: rgba(0, 0, 0, 0.7)
            //             .aritistname
            //                 position: absolute
            //                 top: 34px
            //                 line-height: 1
            //                 font-size: 12px
            //                 color: rgba(0, 0, 0, 0.5)
            // .bottom
            //     width: 100%
            //     height: 110px
        
</style>