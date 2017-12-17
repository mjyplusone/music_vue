<template>
    <div class="m-header">
        <div class="speak" v-show="tabType==='findmusic'"></div>
        <div class="mymusic-more" v-show="tabType==='mymusic'">更多</div>
        <div class="search" v-show="tabType==='findmusic'"></div>
        <div class="subtitle" v-show="tabType==='mymusic' || tabType==='account' || tabType==='friends'">{{ title }}</div>
        <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        props: {
            tabType: {
                type: String,
                default: 'findmusic'
            },
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters([
                'playing'
            ])
        },
        methods: {
            openPlayer () {
                this.setFullScreen(true);
            },
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN'
            })
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .m-header
        position: relative
        width: 100%
        height: 44px
        background: #d43c33
        font-size: 16px
        color: #ffffff
        .speak
            position: absolute
            left: 12px
            top: 10px
            width: 24px
            height: 24px
            background: url("../../common/image/speak.png")
            background-size: 24px 24px
        .mymusic-more
            position: absolute
            left: 12px
            top: 50%
            transform: translateY(-50%)
        .search
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            width: 268px
            height: 30px
            border-radius: 15px
            background: #ffffff
            @media only screen and (max-width: 320px)
                width: 220px
        .subtitle
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
        .music-on
            position: absolute
            right: 10px
            top: 10px
            width: 24px
            height: 24px
            background: url("../../common/image/music.png")
            background-size: 24px 24px
            &.on
                background: url("../../common/image/music_on.gif")
                background-size: 24px 24px

</style>