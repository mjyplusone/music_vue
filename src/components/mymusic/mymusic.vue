<template>
    <div class="mymusic">
        <m-header :tabType="tabType" :title="title"></m-header>
        <div class="mylist">
            <ul>
                <li class="list-item">
                    <div class="left">
                        <i class="icon icon-music"></i>
                    </div>
                    <div class="right">
                        <span class="text">本地音乐</span>
                        <span class="count">0</span>
                        <i class="icon icon-right"></i>
                    </div>
                </li>
                <li class="list-item">
                    <div class="left">
                        <i class="icon icon-zuijinplay"></i>
                    </div>
                    <div class="right">
                        <span class="text">最近播放</span>
                        <span class="count">12</span>
                        <i class="icon icon-right"></i>
                    </div>
                </li>
                <li class="list-item">
                    <div class="left">
                        <i class="icon icon-diantai"></i>
                    </div>
                    <div class="right">
                        <span class="text">我的电台</span>
                        <span class="count">0</span>
                        <i class="icon icon-right"></i>
                    </div>
                </li>
                <li class="list-item">
                    <div class="left">
                        <i class="icon icon-collect"></i>
                    </div>
                    <div class="right">
                        <span class="text">我的收藏</span>
                        <span class="count">12</span>
                        <i class="icon icon-right"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="myfavorite">
            <div class="title" @click="foldMenuList">
                <i :class="iconFold"></i>
                <span class="text">我创建的歌单</span>
                <i class="more icon-list-circle-small" @click.stop></i>
            </div>
            <div class="content" v-show="!isFold">
                <ul>
                    <li class="list-favorite">
                        <div class="avatar">
                            <img src="" width="54" height="54" alt="">
                            <div class="mask">
                                <i class="icon-like"></i>
                            </div>
                        </div>
                        <div class="right">
                            <div class="fav-title">我喜欢的音乐</div>
                            <div class="info">24首</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'mymusic',
                title: '我的音乐',
                isFold: false  // 歌单是否折叠
            };
        },
        methods: {
            foldMenuList () {
                this.isFold = !this.isFold;
            }
        },
        computed: {
            iconFold () {
                return this.isFold ? 'icon-right' : 'icon-down';
            }
        },
        components: {
            MHeader
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .mymusic
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        .mylist
            height: 220px
            width: 100%
            .list-item
                height: 55px
                width: 100%
                display: flex
                &:last-child
                    .right
                        border-1px(rgba(7, 17, 27, 0), after, bottom)
                .left
                    flex: 0 0 69px
                    text-align: center
                    .icon
                        line-height: 55px
                        font-size: 28px
                        color: #d43b33
                .right
                    position: relative
                    flex: 1
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    .text
                        line-height: 55px
                        font-size: 14px
                        color: #000000
                    .count
                        position: absolute
                        top: 21px
                        right: 25px
                        font-size: 13px
                        color: rgba(7, 17, 27, 0.5)
                    .icon
                        position: absolute
                        top: 20px
                        right: 9px
                        font-size: 15px
                        color: rgba(7, 17, 27, 0.5)
        .myfavorite
            width: 100%  
            .title
                position: relative
                height: 30px
                width: 100%
                padding: 0 10px
                box-sizing: border-box
                line-height: 30px
                background: #eeeff1  
                font-size: 12px
                color: rgba(7, 17, 27, 0.8)
                .text
                    margin-left: 10px
                .more
                    position: absolute
                    top: 5px
                    right: 14px
                    font-size: 20px
                    transform: rotate(90deg)
                    color: rgba(7, 17, 27, 0.5)
            .content
                width: 100%
                .list-favorite
                    height: 60px
                    // padding: 3px 6px
                    // box-sizing: border-box
                    display: flex
                    .avatar
                        position: relative
                        flex: 0 0 54px
                        margin: 3px 6px
                        .mask
                            position: absolute
                            top: 0
                            bottom: 0
                            left: 0
                            right: 0
                            text-align: center
                            background: rgba(0, 0, 0, 0.7)
                            .icon-like
                                line-height: 54px
                                font-size: 30px
                                color: #ffffff
                    .right
                        flex: 1
                        margin-left: 4px
                        border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                        .fav-title
                            margin-top: 13px
                            font-size: 14px
                            color: #000000
                        .info
                            margin-top: 8px
                            font-size: 12px
                            color: rgba(7, 17, 27, 0.5)
                        
</style>    