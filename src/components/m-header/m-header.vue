<template>
    <div class="m-header">
        <div class="speak"></div>
        <div class="search" v-show="tabType==='findmusic'"></div>
        <div class="music-on"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            tabType: {
                type: String,
                default: 'findmusic'
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .m-header
        position: relative
        width: 100%
        height: 44px
        background: #d43c33
        font-size: 0
        .speak
            position: absolute
            left: 12px
            top: 10px
            width: 24px
            height: 24px
            background: url("../../common/image/speak.png")
            background-size: 24px 24px
        .search
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            width: 268px
            height: 30px
            border-radius: 15px
            background: #ffffff
        .music-on
            position: absolute
            right: 10px
            top: 10px
            width: 24px
            height: 24px
            background: url("../../common/image/music.png")
            background-size: 24px 24px

</style>