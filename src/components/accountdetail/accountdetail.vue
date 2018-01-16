<template>
<transition name="slide">
    <div class="accountdetail">
        <div class="banner">
            <div class="mask"></div>
        </div>
        <div class="info">
            <div class="header">
                <div class="back" @click="back"><i class="icon-left"></i></div>
                <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
            </div>
            <div class="avatar">
                <img src="../../../static/plusone.jpg" width="88" height="88" alt="">
            </div>
            <div class="name">PlusOne</div>
        </div>
        <div class="detail">
            <div class="title">个人信息</div>
            <div class="list-group">
                <div class="list-item">
                    <i class="icon icon-place"></i>
                    <div class="text">Nantong, Jiangsu</div>
                </div>
                <div class="list-item">
                    <i class="icon icon-edit-paper"></i>
                    <div class="text">HUST</div>
                </div>
            </div>
            <div class="title">关于网易云音乐Vue</div>
            <div class="list-group">
                <div class="list-item">
                    <i class="icon icon-about"></i>
                    <div class="text"></div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'playing'
            ])
        },
        methods: {
            back () {
                this.$router.back();
            },
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
    @import '../../common/stylus/mixin.styl';

    .accountdetail
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        z-index: 100
        background: #eeeff0
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .banner
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            background: url('../../../static/bg.png')
            background-size: 100%
            .mask
                position: absolute
                top: 0
                bottom: 0
                width: 100%
                background: rgba(0, 0, 0, 0.3)
        .info
            position: absolute
            top: 0
            left: 0
            right: 0
            .header
                position: absolute
                height: 43px
                width: 100%
                .back
                    position: absolute
                    top: 10px
                    left: 17px
                    font-size: 23px
                    color: #ffffff
                .music-on
                    position: absolute
                    right: 10px
                    top: 10px
                    width: 23px
                    height: 23px
                    background: url("../../common/image/music.png")
                    background-size: 23px 23px
                    &.on
                        background: url("../../common/image/music_on.gif")
                        background-size: 23px 23px
            .avatar
                position: absolute
                top: 43px
                left: 50%
                transform: translateX(-50%)
                width: 88px
                height: 88px
                border-radius: 50%
                overflow: hidden
            .name
                position: absolute
                top: 150px
                left: 50%
                transform: translateX(-50%)
                font-size: 16px
                font-weight: 700
                color: #ffffff
        .detail
            width: 100%
            .title
                width: 100%
                height: 30px
                padding: 0 10px
                line-height: 30px
                font-size: 12px
            .list-group
                width: 100%
                background: #ffffff
                .list-item
                    height: 45px
                    width: 100%
                    display: flex
                    &:first-child
                        .text
                            border-1px(rgba(7, 17, 27, 0), before, top)
                    .icon
                        flex: 0 0 45px
                        text-align: center
                        line-height: 45px
                        font-size: 18px
                        color: rgba(7, 17, 27, 0.6)
                    .text
                        flex: 1
                        line-height: 45px
                        font-size: 14px
                        border-1px(rgba(7, 17, 27, 0.1), before, top)
</style>    