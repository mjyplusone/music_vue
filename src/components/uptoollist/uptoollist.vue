<template>
<transition name="slide">
    <div class="uptoollist" v-show="showflag" @click="hide">
        <div class="list-wrapper" @click.stop>
            <div class="title">歌曲:{{ currentSong.name }}</div>
            <scroll class="list-content" ref="scroll">
                <ul>
                    <li class="list-item" @click="toggleFavorite(currentSong)">
                        <i class="icon icon-add-project"></i>
                        <span class="text">{{ collectText }}</span>
                    </li>
                    <li class="list-item">
                        <i class="icon icon-collect"></i>
                        <span class="text">歌手:{{ currentSong.singer }}</span>
                    </li>
                    <li class="list-item">
                        <i class="icon icon-diantai"></i>
                        <span class="text">专辑:{{ currentSong.album }}</span>
                    </li>
                </ul>
            </scroll>
        </div>
        <tip :tipType="tipType" ref="tip"></tip>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';
    import tip from 'base/tip/tip.vue';

    export default {
        data () {
            return {
                showflag: false,
                // tip类型
                tipType: 0
            };
        },
        computed: {
            collectText () {
                if (this.isFavorite(this.currentSong)) {
                    return '已收藏到歌单';
                } else {
                    return '收藏到歌单';
                }
            },
            ...mapGetters([
                'currentSong',
                'favoriteList'
            ])
        },
        methods: {
            show () {
                this.showflag = true;
                // show之后DOM才更新,此时要刷新scroll!
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                }, 20);
            },
            hide () {
                this.showflag = false;
            },
            isFavorite (song) {
                const index = this.favoriteList.findIndex((item) => {
                    return item.id === song.id;
                });
                return index > -1;
            },
            toggleFavorite (song) {
                console.log(song);
                if (this.isFavorite(song)) {
                    // 调用action
                    this.deleteFavoriteList(song);
                    // 控制tip组件的显示和显示类型
                    this.tipType = 1;
                    this.$refs.tip.show();
                } else {
                    this.saveFavoriteList(song);
                    // 控制tip组件的显示和显示类型
                    this.tipType = 0;
                    this.$refs.tip.show();
                }
            },
            ...mapActions([
                'saveFavoriteList',
                'deleteFavoriteList'
            ])
        },
        components: {
            scroll,
            tip
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .uptoollist
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 250
        background: rgba(0, 0, 0, 0.3)
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(0, 100%, 0)
        .list-wrapper
            position: absolute
            bottom: 0
            width: 100%
            background: #ffffff
            .title
                height: 40px
                width: 100%
                line-height: 40px
                padding: 0 10px
                box-sizing: border-box
                font-size: 12px
                color: rgba(0, 0, 0, 0.7)
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
            .list-content
                max-height: 350px
                width: 100%
                overflow: hidden
                .list-item
                    height: 45px
                    width: 100%
                    line-height: 45px
                    display: flex
                    .icon
                        flex: 0 0 40px
                        margin-top: 10px
                        text-align: center
                        font-size: 20px
                        color: #d43c33
                    .text
                        flex: 1
                        font-size: 14px
                        border-1px(rgba(7, 17, 27, 0.1), after, bottom)
</style>