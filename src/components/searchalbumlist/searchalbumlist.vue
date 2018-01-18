<template>
    <div class="searchalbumlist">
        <scroll :data="searchAlbumList" :pullup="pullup" @scrollToEnd="searchMore" 
                :beforeScroll="beforeScroll" @beforeScroll="listScroll"
                class="list-wrapper">
            <div>
                <album :hotAlbums="searchAlbumList"></album>
                <div class="loading"><loading v-show="hasMore"></loading></div>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="no-result" v-show="!searchAlbumList.length && !hasMore">无结果</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import album from 'components/album/album.vue';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                pullup: true,
                beforeScroll: true  // 监听滚动开始事件
            };
        },
        props: {
            searchAlbumList: {
                type: Array,
                default: []
            },
            hasMore: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            searchMore () {
                // console.log('searchMore');
                this.$emit('searchmore', 10);
            },
            listScroll () {
                // 列表开始滚动,blur input
                this.setBlurInput(true);
            },
            ...mapMutations({
                setBlurInput: 'SET_BLURINPUT'
            })
        },
        components: {
            album,
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .searchalbumlist
        width: 100%
        height: 100%
        overflow: hidden
        .list-wrapper
            width: 100%
            height: 100%
            overflow: hidden
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