<template>
    <div class="searchresult">
        <scroll :data="searchSongList" :probeType="probeType" :listenScroll="listenScroll" 
                class="songlist-wrapper">
            <div>
                <songlist :songs="searchSongList" :toolbarType="2"></songlist>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    import {search, searchsuggest} from 'api/search.js';
    import songlist from 'components/songlist/songlist.vue';
    import {createSearchSong} from 'common/js/song.js';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        data () {
            return {
                searchSongList: []
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
                    return;
                }
                this.search();
                this.searchsuggest();
            }
        },
        components: {
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .searchresult
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        padding-left: 10px
        box-sizing: border-box
        background: #ffffff
        .songlist-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .bottom
                width: 100%
                height: 80px
        
</style>