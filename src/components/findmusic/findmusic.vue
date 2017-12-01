<template>
    <div class="findmusic">
        <m-header :tabType="tabType"></m-header>
        <div class="musictab">
            <router-link to="/findmusic/music" tag="div" class="subtab-item"><span>音乐</span></router-link>
            <router-link to="/findmusic/singer" tag="div" class="subtab-item"><span>歌手</span></router-link>
            <router-link to="/findmusic/rank" tag="div" class="subtab-item"><span>排行榜</span></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'findmusic'
            };
        },
        components: {
            MHeader
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .findmusic
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        .musictab
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            background: rgba(248, 248, 249, 0.9)
            .subtab-item
                flex: 1
                text-align: center
                font-size: 12px
                span 
                    display: inline-block
                    width: 41px
                    height: 100%
                    box-sizing: border-box
                &.active
                    span 
                        border-bottom: 2px solid  #d33a31

</style>