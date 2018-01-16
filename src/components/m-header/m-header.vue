<template>
    <div class="m-header" ref="header">
        <div class="speak" v-show="tabType==='findmusic'"></div>
        <div class="mymusic-more" v-show="tabType==='mymusic'">更多</div>
        <div class="back icon-left" v-show="tabType==='back'" @click="back"></div>

        <div class="search" v-show="tabType==='findmusic'" ref="search" :class="{'focus': isFocus}">
            <input type="text" @focus="focusInput" :placeholder="placeholder" v-model="querydata">
            <i class="icon-close" v-show="query" @click="clear"></i>
        </div>
        <div class="subtitle" v-show="tabType !=='findmusic'">{{ title }}</div>

        <div class="music-on" :class="{'on': playing}" @click="openPlayer"></div>
        <div class="cancel" v-show="isFocus" @click="cancel">取消</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';

    // const originSearchWidth = 268;

    export default {
        data () {
            return {
                isFocus: false,
                placeholder: '搜索'
            };
        },
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
            querydata: {
                get () {
                    return this.query;
                },
                set (newQuery) {
                    this.setQuery(newQuery);
                }
            },
            ...mapGetters([
                'playing',
                'query'
            ])
        },
        methods: {
            openPlayer () {
                this.setFullScreen(true);
            },
            back () {
                this.$router.back();
                // this.$router.push({
                //     path: '/findmusic/music'
                // });
            },
            focusInput () {
                this.isFocus = true;
                this.$emit('gosearch');
            },
            cancel () {
                this.$emit('outsearch');
                this.isFocus = false;
                this.setQuery('');
            },
            clear () {
                this.setQuery('');
            },
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN',
                setQuery: 'SET_QUERY'
            })
        }
        // watch: {
        //     querydata (newQuery) {
        //         // this.$emit('query', newQuery);
        //         this.setQuery(newQuery);
        //     }
        // }
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
        z-index: 20
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
        .back
            position: absolute
            left: 12px
            top: 10px
            font-size: 24px
        .search
            position: absolute
            right: 50%
            top: 50%
            transform: translate(35.7vw, -50%)
            width: 71.4vw  // 相对于屏幕布局
            height: 30px
            border-radius: 15px
            background: #ffffff
            overflow: hidden
            transition: width 0.3s linear
            @media only screen and (max-width: 320px)
                width: 220px
            &.focus
                width: 83vw
                transform: translate(35.7vw, -50%)
                transition: width 0.3s linear
                @media only screen and (min-width: 500px)
                    width: 71.4vw
            input
                width: 100%
                height: 100%
                padding: 0 20px
                box-sizing: border-box
                font-size: 13px
                &::placeholder
                    font-size: 13px
                    color: rgba(0, 0, 0, 0.3)
            .icon-close
                position: absolute
                top: 50%
                transform: translateY(-50%)
                right: 10px
                font-size: 14px
                color: rgba(0, 0, 0, 0.3)
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
        .cancel
            position: absolute
            right: 10px
            top: 10px
            width: 30px
            height: 24px
            line-height: 24px
            background: #d43c33
            font-size: 14px
</style>