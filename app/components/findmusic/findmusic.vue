<template>
    <div class="findmusic">
        <m-header :tabType="tabType" @gosearch="gosearch" @outsearch="outsearch"></m-header>
        <div class="musictab">
            <router-link to="/findmusic/music" tag="div" class="subtab-item"><span>音乐</span></router-link>
            <router-link to="/findmusic/singer" tag="div" class="subtab-item"><span>歌手</span></router-link>
            <router-link to="/findmusic/rank" tag="div" class="subtab-item"><span>排行榜</span></router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'findmusic',
                originRoute: ''   // 进入search前的初始路由
            };
        },
        methods: {
            gosearch () {
                // 只有在findmusic/xxx路由下,点击搜索框才保存当前路由和跳转到findmusic/search
                // 在findmusic/search/xxx下点击搜索框,路由不改变
                if (this.$route.path.match(/\//g).length <= 2) {
                    this.originRoute = this.$route.path;
                    this.$router.push({
                        path: '/findmusic/search'
                    });
                }
            },
            outsearch () {
                console.log(this.originRoute);
                this.$router.push({
                    path: this.originRoute
                });
            }
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
            position: absolute
            z-index: 30
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            background: rgba(248, 248, 249, 1)
            .subtab-item
                flex: 1
                text-align: center
                font-size: 13px
                span 
                    display: inline-block
                    width: 41px
                    height: 100%
                    box-sizing: border-box
                &.active
                    span 
                        border-bottom: 2px solid  #d33a31

</style>