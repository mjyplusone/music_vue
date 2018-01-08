<template>
    <div class="searchalbumlist">
        <scroll :data="searchAlbumList" class="list-wrapper">
            <div>
                <album :hotAlbums="searchAlbumList"></album>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import album from 'components/album/album.vue';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        props: {
            searchAlbumList: {
                type: Array,
                default: []
            }
        },
        components: {
            album,
            scroll
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
            .bottom
                width: 100%
                height: 110px
</style>