<template>
    <div class="searchartistlist">
        <scroll :data="artists" class="list-wrapper">
            <div>
                <ul>
                    <li v-for="artist in artists" class="artist-content" @click="selectArtist(artist)">
                        <div class="avatar">
                            <img width="54" height="54" v-lazy="artist.picUrl" alt="">
                        </div>
                        <!-- <div class="artist-name border-1px">{{ artist.name }}&nbsp;<span v-if="artist.alias.length" class="alias">({{ artist.alias[0] }})</span></div> -->
                        <div class="artist-name border-1px">
                            <span v-html="artist.highlightname || artist.name"></span>&nbsp;<span v-if="artist.alias.length" class="alias">({{ artist.alias[0] }})</span>
                        </div>
                    </li>
                </ul>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapMutations} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        props: {
            artists: {
                type: Array,
                default: []
            }
        },
        methods: {
            selectArtist (artist) {
                this.setSingerBackRoute(this.$route.path);
                this.setSinger(artist);
                this.$router.push({
                    path: this.$route.path + `/${artist.id}`
                });
            },
            ...mapMutations({
                setSinger: 'SET_SINGER',
                setSingerBackRoute: 'SET_SINGERBACKROUTE'
            })
        },
        components: {
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .searchartistlist
        width: 100%
        height: 100%
        overflow: hidden
        .list-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .artist-content
                display: flex
                width: 100%
                height: 60px
                .avatar
                    flex: 0 0 60px
                    padding: 3px 0 3px 6px
                .artist-name
                    flex: 1
                    margin-left: 9px
                    line-height: 60px
                    font-size: 14px
                    color: #000000
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    .alias
                        color: rgba(0, 0, 0, 0.7)
                        font-weight: 100
            .bottom
                width: 100%
                height: 110px
</style>