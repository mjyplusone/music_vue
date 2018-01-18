<template>
    <div class="searchartistlist">
        <scroll :data="artists" :pullup="pullup" @scrollToEnd="searchMore" 
                :beforeScroll="beforeScroll" @beforeScroll="listScroll"
                class="list-wrapper">
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
                    <div class="loading"><loading v-show="hasMore"></loading></div>
                </ul>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="no-result" v-show="!artists.length && !hasMore">无结果</div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapMutations} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';

    export default {
        data () {
            return {
                pullup: true,
                beforeScroll: true  // 监听滚动开始事件
            };
        },
        props: {
            artists: {
                type: Array,
                default: []
            },
            hasMore: {
                type: Boolean,
                default: true
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
            searchMore () {
                console.log('searchMore');
                this.$emit('searchmore', 100);
            },
            listScroll () {
                // 列表开始滚动,blur input
                this.setBlurInput(true);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER',
                setSingerBackRoute: 'SET_SINGERBACKROUTE',
                setBlurInput: 'SET_BLURINPUT'
            })
        },
        components: {
            scroll,
            loading
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
            .loading
                position: relative
                width: 100%
            .bottom
                width: 100%
                height: 110px
        .no-result
            position: absolute
            top: 20%
            width: 100%
            text-align: center
            color: rgba(0, 0, 0, 0.7)
</style>