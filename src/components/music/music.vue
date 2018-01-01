<template>
    <div class="music" ref="music">
        <scroll class="music-content" :data="recommendList" ref="scroll">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider ref="slider">
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="icon-navigator border-1px"> 
                    <div class="navigator-item">
                        <div class="navigator-img">
                            <i class="icon-text icon-fm"></i>
                        </div>
                        <div class="navigator-text">
                            <span>私人FM</span>
                        </div> 
                    </div>
                    <router-link to="/findmusic/music/recommend" tag="div" class="navigator-item">
                        <div class="navigator-img">
                            <i class="icon-text icon-date"></i>
                        </div>
                        <div class="navigator-text">
                            <span>每日推荐</span>
                        </div> 
                    </router-link>
                    <router-link to="/findmusic/music/musicmenus" tag="div" class="navigator-item">
                        <div class="navigator-img">
                            <i class="icon-text icon-diantai"></i>
                        </div>
                        <div class="navigator-text">
                            <span>歌单</span>
                        </div> 
                    </router-link>
                    <router-link to="/findmusic/music/rank" tag="div" class="navigator-item">
                        <div class="navigator-img">
                            <i class="icon-text icon-rank-list"></i>
                        </div>
                        <div class="navigator-text">
                            <span>排行榜</span>
                        </div> 
                    </router-link> 
                </div>
                <div class="music-list" ref="list">
                    <div class="title" @click="selectMusicMenus">
                        <span>推荐歌单</span>
                        <i class="icon-right"></i>
                    </div>
                    <div class="content">
                        <ul>
                            <li v-for="(item, index) in recommendList" v-if="index < 6" class="music-item" :style="{width: MusicItemWidth, marginRight: MusicItemMargin(index)}"
                                @click="selectMenu(item)">
                                <div class="item-img">
                                    <img :width="MusicItemWidth" :height="MusicItemWidth" v-lazy="item.picUrl" alt="">
                                </div>
                                <div class="item-text">
                                    <span>{{ item.name }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <loading v-show="!recommendList.length"></loading>
                <div class="music-list">
                    <div class="title" @click="selectMusicMenus">
                        <span>最新音乐</span>
                        <i class="icon-right"></i>
                    </div>
                    <div class="content">
                        <ul>
                            <li v-for="(item, index) in recommendList" class="music-item" :style="{width: MusicItemWidth, marginRight: MusicItemMargin(index)}"
                                @click="selectMenu(item)">
                                <div class="item-img">
                                    <img :width="MusicItemWidth" :height="MusicItemWidth" v-lazy="item.picUrl" alt="">
                                </div>
                                <div class="item-text">
                                    <span>{{ item.name }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <loading v-show="!recommendList.length"></loading>
                <div class="bottom border-1px">发现更多有趣内容&nbsp;&nbsp;></div>
            </div>
        </scroll>
        <router-view :banner="topMenuBanner"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getRecommend, getRecommendMusicList, getTopMusicMenuList} from 'api/music.js';
    import {ERR_OK} from 'api/config';
    import slider from 'base/slider/slider.vue';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                recommends: [],
                recommendList: [],
                // 每个music-item的宽度
                MusicItemWidth: '',
                topMenuBanner: {}  // 精品歌单,传入歌单router的封面信息
            };
        },
        created () {
            this._getRecommend();
            // 手动延时，测试loading组件效果
            // setTimeout(() => {
            this._getRecommendMusicList();
            // }, 1000);
            this._getTopMusicMenuList();
        },
        mounted () {
            // 计算每个music-item的宽度
            this._getMusicItemWidth();
            // resize的时候重新计算
            window.addEventListener('resize', () => {
                this._getMusicItemWidth();
            });
        },
        methods: {
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider;
                        console.log(this.recommends);
                    }
                });
            },
            _getRecommendMusicList () {
                getRecommendMusicList().then((res) => {
                    this.recommendList = res.result;
                    console.log(res);
                    console.log(this.recommendList);
                });
            },
            // 精品歌单
            _getTopMusicMenuList () {
                getTopMusicMenuList().then((res) => {
                    if (res.code === 200) {
                        console.log(res);
                        // banner 信息
                        this.topMenuBanner.picUrl = res.playlists[0].coverImgUrl;
                        console.log(this.topMenuBanner.picUrl);
                        this.topMenuBanner.name = res.playlists[0].name;
                        this.topMenuBanner.copywriter = res.playlists[0].copywriter;
                    }
                });
            },
            _getMusicItemWidth () {
                let MusicWidth = this.$refs.music.clientWidth;
                let marginWidth = 2;
                this.MusicItemWidth = (MusicWidth - marginWidth * 2) / 3 + 'px';
                console.log('MusicItemWidth' + this.MusicItemWidth);
            },
            // music-item间的间距
            MusicItemMargin (index) {
                if ((index + 1) % 3 === 0) {
                    return '0px';
                } else {
                    return '2px';
                }
            },
            loadImage () {
                if (!this.checkLoaded) {
                    this.checkLoaded = true;
                    // 这里refresh之前slider的高度总是计算不对，导致refresh重新渲染后scroll不正确
                    // 所以重新计算一下slider宽度，然后计算得到正确的高度
                    this.$refs.slider._setSliderWidth(true);
                    this.$refs.scroll.refresh();
                }
            },
            selectMenu (menu) {
                this.$router.push({
                    path: `/findmusic/music/musicmenu/${menu.id}`
                });
                this.setMusicMenu(menu);
            },
            selectMusicMenus () {
                this.$router.push({
                    path: '/findmusic/music/musicmenus'
                });
            },
            ...mapMutations({
                setMusicMenu: 'SET_MUSICMENU'
            })
        },
        components: {
            slider,
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .music
        position: absolute
        top: 84px
        bottom: 0
        width: 100%
        // background: blue
        .music-content
            width: 100%
            height: 100%
            overflow: hidden    // 作为scroll的wrapper层
            .slider-wrapper
                position: relative   // 之后dots相对slider-wrapper绝对定位
                width: 100%
                overflow: hidden
            .icon-navigator
                width: 100%
                height: 104px
                display: flex
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                .navigator-item
                    flex: 1
                    text-align: center
                    // border: 1px solid blue
                    .navigator-img
                        margin: 17px auto 0
                        width: 50px
                        height: 50px
                        border-radius: 50%
                        border: 1px solid #d33a31
                        .icon-text
                            color: #d33a31
                            font-size: 30px
                            line-height: 50px
                    .navigator-text
                        margin-top: 7px
                        font-size: 10px
            .music-list
                .title
                    height: 16px
                    padding: 20px 0 15px 0
                    span 
                        display: inline-block
                        vertical-align: top
                        height: 16px
                        padding-left: 9px
                        line-height: 16px
                        font-size: 14px
                        border-left: 2px solid #d33a31
                    .icon-right
                        display: inline-block
                        vertical-align: top
                        color: #707070
                .content
                    font-size: 0
                    .music-item
                        display: inline-block
                        vertical-align: top
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
                            // background: red
            .bottom
                width: 100%
                height: 120px
                box-sizing: border-box
                padding-top: 30px
                text-align: center
                font-size: 12px
                color: #a7a7a7
                border-1px(rgba(7, 17, 27, 0.1), before, top)
</style>