<template>
    <transition name="slide">
        <div class="singer-detail">
            <musicmenu :songs="hotSongs" :title="title" :bgimg="bgimg"></musicmenu>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import {getSingerDetail} from 'api/singer.js';
    import {createSong} from 'common/js/song.js';
    import musicmenu from 'components/musicmenu/musicmenu.vue';

    const SUCCESS_CODE = 200;

    export default {
        data () {
            return {
                hotSongs: []
            };
        },
        created () {
            console.log(this.singer);
            this._getSingerDetail();
        },
        computed: {
            title () {
                if (this.singer.alias.length !== 0) {
                    return this.singer.name + '(' + this.singer.alias[0] + ')';
                } else {
                    return this.singer.name;
                }
            },
            bgimg () {
                return this.singer.picUrl;
            },
            ...mapGetters([
                // 对应getters.js中singer
                'singer'
            ])
        },
        methods: {
            _getSingerDetail () {
                if (!this.singer.id) {
                    this.$router.push({
                        path: '/findmusic/singer'
                    });
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === SUCCESS_CODE) {
                        this.hotSongs = this._normalizeSongs(res.hotSongs);
                        console.log(this.hotSongs);
                    }
                });
            },
            _normalizeSongs (hotsongs) {
                let ret = [];
                hotsongs.forEach((song) => {
                    // songid必须要有
                    if (song.id) {
                        ret.push(createSong(song));
                    }
                });
                return ret;
            }
        },
        components: {
            musicmenu
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .singer-detail
        position: fixed   // 相对于视窗
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 100
        background: #ffffff
    .slide-enter-active, .slide-leave-acitve
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>