<template>
<transition name="slide">
    <div class="musicmenus" ref="musicmenus">
        <m-header :tabType="tabType" :title="title"></m-header>
        <scroll :data="filterMenuList" class="musicmenulist">
            <div>
                <div class="banner" :style="bgStyle" ref="banner">
                </div>
                <div class="content" ref="content">
                    <div class="left">
                        <img :src="banner.picUrl" alt="" ref="bannerImg">
                    </div>
                    <div class="right">
                        <div class="topmenu">
                            <div class="title">
                                <i class="icon-vip"></i>
                                <span>精品歌单</span>
                            </div>
                            <div class="name">{{ banner.name }}</div>
                            <div class="copywriter">{{ banner.copywriter }}</div>
                        </div>
                    </div>
                </div>
                <div class="filter">
                    <div class="category">{{ categoryName }}</div>
                    <div class="tag">
                        <div class="tag-item" @click="changeCategory(0)">全部</div>
                        <div class="tag-item" @click="changeCategory(1)">华语</div>
                        <div class="tag-item" @click="changeCategory(2)">民谣</div>
                        <div class="tag-item" @click="changeCategory(3)">影视原声</div>
                    </div>
                </div>
                <div class="menulist">
                    <ul>
                        <!-- <li v-for="(item, index) in filterMenuList" class="menu-item" :style="{width: menuItemWidth, marginRight: menuItemMargin(index)}"
                            @click="selectMenu(item)">
                            <div class="item-img">
                                <img :width="menuItemWidth" :height="menuItemWidth" v-lazy="item.coverImgUrl" alt="">
                            </div>
                            <div class="item-text">
                                <span>{{ item.name }}</span>
                            </div>
                        </li> -->
                        <li v-for="(item, index) in filterMenuList" class="menu-item" @click="selectMenu(item)">
                            <div class="item-img">
                                <img width="100%" height="100%" v-lazy="item.coverImgUrl" alt="">
                            </div>
                            <div class="item-text">
                                <span>{{ item.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <loading v-show="!filterMenuList.length"></loading>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import loading from 'base/loading/loading.vue';
    import {getMusicMenuList, getTopMusicMenuList} from 'api/music.js';
    import scroll from 'base/scroll/scroll.vue';
    import {mapMutations} from 'vuex';

    const categoryAll = 0;
    const categoryHuayu = 1;
    const categoryMinyao = 2;
    const categoryYingshi = 3;

    export default {
        data () {
            return {
                tabType: 'back',
                title: '歌单',
                musicMenuList: [],  // 歌单列表
                // menuItemWidth: '',  // 每个menu-item的宽高
                categoryName: '全部歌单',  // 类别名称
                currentCategory: 0  // 当前类别
            };
        },
        props: {
            banner: {
                type: Object,
                default: null
            }
        },
        created () {
            this._getMusicMenuList();
            this._getTopMusicMenuList();
        },
        mounted () {
            // // 计算每个menu-item的宽度
            // this._getMenuItemWidth();

            // 计算banner相关位置
            this.$refs.content.style.height = this.$refs.banner.clientHeight * 0.685 + 'px';
            this.$refs.content.style.top = this.$refs.banner.clientHeight * 0.212 + 'px';
            this.$refs.bannerImg.style.width = this.$refs.banner.clientHeight * 0.685 + 'px';
            this.$refs.bannerImg.style.height = this.$refs.banner.clientHeight * 0.685 + 'px';

            // resize的时候重新计算
            window.addEventListener('resize', () => {
                // this._getMenuItemWidth();
                // 计算banner相关位置
                this.$refs.content.style.height = this.$refs.banner.clientHeight * 0.685 + 'px';
                this.$refs.content.style.top = this.$refs.banner.clientHeight * 0.212 + 'px';
                this.$refs.bannerImg.style.width = this.$refs.banner.clientHeight * 0.685 + 'px';
                this.$refs.bannerImg.style.height = this.$refs.banner.clientHeight * 0.685 + 'px';
            });
        },
        computed: {
            bgStyle () {
                console.log(this.banner);
                return `background-image: url(${this.banner.picUrl})`;
            },
            // 过滤后的歌单列表
            filterMenuList () {
                if (this.currentCategory === categoryAll) {
                    return this.musicMenuList;
                } else if (this.currentCategory === categoryHuayu) {
                    return this.filterMenu(this.musicMenuList, '华语');
                } else if (this.currentCategory === categoryMinyao) {
                    return this.filterMenu(this.musicMenuList, '民谣');
                } else if (this.currentCategory === categoryYingshi) {
                    return this.filterMenu(this.musicMenuList, '影视原声');
                }
            }
        },
        methods: {
            _getMusicMenuList () {
                getMusicMenuList().then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        this.musicMenuList = res.playlists;
                    }
                });
            },
            _getTopMusicMenuList () {
                getTopMusicMenuList().then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        // banner 信息
                        this.banner.picUrl = res.playlists[0].coverImgUrl;
                        this.banner.name = res.playlists[0].name;
                        this.banner.copywriter = res.playlists[0].copywriter;
                    }
                });
            },
            // _getMenuItemWidth () {
            //     let menuWidth = this.$refs.musicmenus.clientWidth;
            //     console.log(menuWidth);
            //     let marginWidth = 2;
            //     this.menuItemWidth = (menuWidth - marginWidth) / 2 + 'px';
            //     console.log('MenuItemWidth' + this.menuItemWidth);
            // },
            // // music-item间的间距
            // menuItemMargin (index) {
            //     if ((index + 1) % 2 === 0) {
            //         return '0px';
            //     } else {
            //         return '2px';
            //     }
            // },
            selectMenu (menu) {
                this.$router.push({
                    path: `/findmusic/music/musicmenus/${menu.id}`
                });
                this.setMusicMenu(menu);
            },
            changeCategory (category) {
                this.currentCategory = category;
                if (category === categoryAll) {
                    this.categoryName = '全部歌单';
                } else if (category === categoryHuayu) {
                    this.categoryName = '华语';
                } else if (category === categoryMinyao) {
                    this.categoryName = '民谣';
                } else if (category === categoryYingshi) {
                    this.categoryName = '影视原声';
                }
            },
            filterMenu (menu, category) {
                let ret = [];
                menu.forEach((item) => {
                    if (item.tags.indexOf(category) !== -1) {
                        ret.push(item);
                    }
                });
                return ret;
            },
            ...mapMutations({
                setMusicMenu: 'SET_MUSICMENU'
            })
        },
        components: {
            MHeader,
            loading,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .musicmenus
        position: fixed   // 相对于视窗
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 100
        background: #ffffff
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .musicmenulist
            width: 100%
            height: 100%
            overflow: hidden
            .banner
                position: relative
                width: 100%
                height: 0
                padding-top: 40%
                background-size: 100%
                opacity: 0.9
                filter: blur(20px)
            .content
                position: absolute
                width: 100%
                padding: 0 15px
                box-sizing: border-box
                display: flex
                .left
                    flex: 0 0 100px
                .right
                    flex: 1
                    margin-left: 12px
                    .title
                        margin-top: 6px
                        color: #ffffff
                        .icon-vip
                            display: inline-block
                            vertical-align: top
                            font-size: 17px
                            color: #d5ad79
                    .name
                        margin-top: 20px
                        max-width: 225px   // flex情况下加上这个才能...
                        white-space: nowrap
                        text-overflow: ellipsis
                        overflow: hidden
                        font-size: 13px
                        color: #ffffff
                    .copywriter
                        margin-top: 9px
                        line-height: 1.2
                        font-size: 10px
                        color: rgba(255, 255, 255, 0.5)
            .filter
                position: relative
                width: 100%
                height: 70px
                padding: 20px 10px
                box-sizing: border-box
                background: #ffffff
                z-index: 10
                .category
                    position: absolute
                    width: 77px
                    height: 30px
                    border-radius: 15px
                    border: 1px solid rgba(7, 17, 27, 0.2)
                    box-sizing: border-box
                    text-align: center
                    line-height: 30px
                    font-size: 13px
                .tag
                    position: absolute
                    right: 10px
                    width: 210px
                    display: flex
                    .tag-item
                        flex: 1
                        height: 14px
                        margin-top: 8px
                        box-sizing: border-box
                        border-right: 1px solid rgba(7, 17, 27, 0.1)
                        text-align: center
                        line-height: 14px
                        font-size: 12px
                        color: rgba(0, 0, 0, 0.6)
                        &:last-child
                            border: none 
                            padding-left: 10px
            .menulist
                font-size: 0
                ul
                    overflow: hidden     /* BFC清除浮动 */
                    margin-left: -2px
                    li
                        float: left
                        width: 50%
                        padding-left: 2px
                        box-sizing: border-box
                        background-clip: content-box
                        .item-text
                            height: 27px
                            margin: 8px 0 22px 0
                            padding: 0 7px
                            font-size: 12px
                            line-height: 1.2
                            // 多行文本溢出省略号
                            overflow: hidden
                            display: -webkit-box
                            -webkit-line-clamp: 2
                            -webkit-box-orient: vertical
                            text-overflow: ellipsis
                            // 长英文自动转行
                            word-wrap: break-word
                // .menu-item
                //     display: inline-block
                //     vertical-align: top
                //     .item-text
                //         height: 27px
                //         margin: 8px 0 22px 0
                //         padding: 0 7px
                //         font-size: 12px
                //         line-height: 1.2
                //         // 多行文本溢出省略号
                //         overflow: hidden
                //         display: -webkit-box
                //         -webkit-line-clamp: 2
                //         -webkit-box-orient: vertical
                //         text-overflow: ellipsis
                //         // 长英文自动转行
                //         word-wrap: break-word
            .bottom
                width: 100%
                height: 80px
</style>