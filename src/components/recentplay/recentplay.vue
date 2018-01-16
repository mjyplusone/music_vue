<template>
<transition name="slide">
    <div class="recentplay">
        <m-header :tabType="tabType" :title="title"></m-header>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import songlist from 'components/songlist/songlist.vue';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        data () {
            return {
                tabType: 'back',
                title: '最近播放'
            };
        },
        components: {
            MHeader,
            songlist,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .recentplay
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: #ffffff
        z-index: 100
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
</style>