<template>
    <transition name="slide">
        <div class="singer-detail">

        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';

    export default {
        created () {
            console.log(this.singer);
        },
        computed: {
            ...mapGetters([
                // 对应getters.js中singer
                'singer'
            ])
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
        background: lightblue
    .slide-enter-active, .slide-leave-acitve
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>