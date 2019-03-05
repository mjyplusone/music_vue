<template>
<transition name="slide">
    <div class="localmusic">
        <m-header :tabType="tabType" :title="title"></m-header>  
        <div class="no-result">暂无本地音乐</div>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'back',
                title: '本地音乐'
            };
        },
        components: {
            MHeader
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .localmusic
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        background: #ffffff
        z-index: 100
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .no-result
            position: absolute
            top: 20%
            width: 100%
            text-align: center
            color: rgba(0, 0, 0, 0.7)
</style>