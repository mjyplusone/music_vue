<template>
    <div class="searchmenulist">
        <scroll :data="menus" class="list-wrapper">
            <div>
                <ul>
                    <li v-for="menu in menus" class="menu-content" @click="selectMenu(menu)">
                        <div class="avatar">
                            <img width="54" height="54" v-lazy="menu.picUrl" alt="">
                        </div>
                        <div class="right border-1px">
                            <!-- <div class="name">{{ menu.name }}</div> -->
                            <div class="name" v-html="menu.highlightname || menu.name"></div>
                            <div class="info">{{ menu.trackCount }}首音乐&nbsp;&nbsp;by&nbsp;{{ menu.creator }}，播放{{ menu.playCount }}次</div>
                        </div>
                    </li>
                </ul>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import scroll from 'base/scroll/scroll.vue';
    import {mapMutations} from 'vuex';

    export default {
        props: {
            menus: {
                type: Array,
                default: []
            }
        },
        methods: {
            selectMenu (menu) {
                this.$router.push({
                    path: this.$route.path + `/${menu.id}`
                });
                this.setMusicMenu(menu);
            },
            ...mapMutations({
                setMusicMenu: 'SET_MUSICMENU'
            })
        },
        components: {
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .searchmenulist
        width: 100%
        height: 100%
        overflow: hidden
        .list-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .menu-content
                display: flex
                width: 100%
                height: 60px
                .avatar
                    flex: 0 0 54px
                    padding: 3px 6px
                .right
                    flex: 1
                    margin-left: 9px
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    .name
                        margin-top: 13px
                        line-height: 1
                        font-size: 14px
                    .info
                        margin-top: 10px
                        line-height: 1
                        font-size: 10px
                        color: #949496
            .bottom
                width: 100%
                height: 110px
</style>