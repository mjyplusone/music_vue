<template>
    <div class="singer">
        <scroll class="singer-list" :data="singerList" :listenScroll="listenScroll" :probeType="probeType" @scrollPos="scrollPos" ref="singerList">
            <div>
                <ul v-if="normalizeSingerList.length">
                    <li v-for="category in normalizeSingerList" class="singer-category" ref="category">
                        <h2 class="category-title">{{ category.title }}</h2>
                        <ul>
                            <li v-for="singer in category.items" class="singer-content">
                                <div class="avatar">
                                    <img width="54" height="54" v-lazy="singer.picUrl" alt="">
                                </div>
                                <div class="singer-name border-1px">{{ singer.name }}&nbsp;<span v-if="singer.alias.length" class="alias">({{ singer.alias[0] }})</span></div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="bottom"></div>
            </div>
        </scroll>
        <div class="shortcut-list">
            <ul>
                <li v-for="(item, index) in shortcutList" class="item" :class="{'current': currentIndex === index}" @touchstart="onShortcutTouch(index, $event)" @touchmove.prevent="onShortcutTouchMove">{{ item }}</li>
            </ul>
        </div>
        <div class="fixed" v-show="fixedTitle" ref="fixedtitle">
            <h2 class="fixed-title">{{ fixedTitle }}</h2>
        </div>
        <div class="loading-wrapper">
            <loading v-show="!normalizeSingerList.length"></loading>
        </div>  
    </div>
</template>

<script type="text/ecmascript-6">
    import {getSinger} from 'api/singer.js';
    import {ConvertPinyin} from 'common/js/pinyin.js';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';

    const HOT_NAME = '热门';
    const ANCHOR_HEIGHT = 18;   // 右侧每个锚点的高度
    const FIXED_TITLE_HEIGHT = 27;   // fixedtitle的高度

    export default {
        data () {
            return {
                singerList: [],
                normalizeSingerList: [],
                // 右侧滑动栏touch位置参数
                touch: {},
                // 是否监听scroll
                listenScroll: true,
                // 不节流方式监听实时滚动
                probeType: 3,
                // 实时滚动位置
                scrollY: -1,
                // 每个category的累加高度
                listHeight: [],
                // 区块下限和当前滚动位置的差,用于处理fixedtitle
                fixedDiff: -1
            };
        },
        created () {
            // 延时1s测试loading
            setTimeout(() => {
                this._getSinger();
            }, 1000);
            // this._getSinger();
        },
        computed: {
            shortcutList () {
                return this.normalizeSingerList.map((category) => {
                    return category.title.substr(0, 1);
                });
            },
            // 当前index
            currentIndex () {
                // 这里有坑:向下滚动,scrollY值是负的
                if (this.scrollY > 0) {
                    return 0;
                }
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    // 区块下限和当前滚动位置的差(scrollY为负值)
                    this.fixedDiff = height2 + this.scrollY;
                    if (!height2 || (-this.scrollY >= height1 && -this.scrollY < height2)) {
                        return i;
                    }
                }
            },
            fixedTitle () {
                if (this.scrollY > 0) {
                    return '';
                }
                // 一开始可能没有currentIndex,需要先判断一下啦
                return this.normalizeSingerList[this.currentIndex] ? this.normalizeSingerList[this.currentIndex].title : '';
            }
        },
        methods: {
            _getSinger () {
                getSinger().then((res) => {
                    this.singerList = res.artists;
                    console.log(this.singerList);
                    this.normalizeSingerList = this._normalizeSinger(this.singerList);
                    console.log(this.normalizeSingerList);
                });
            },
            _normalizeSinger (singerList) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                singerList.forEach((item, index) => {
                    // 热门歌手
                    map.hot.items.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.picUrl,
                        alias: item.alias
                    });
                    // 按首字母分类
                    // 获得首字母
                    const key = ConvertPinyin(item.name);
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        };
                    }
                    map[key].items.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.picUrl,
                        alias: item.alias
                    });
                });
                // console.log(map);
                // 得到有序列表
                let hot = [];
                let res = [];
                for (let key in map) {
                    if (map[key].title.match(/[a-zA-Z]/)) {
                        res.push(map[key]);
                    } else if (map[key].title === HOT_NAME) {
                        hot.push(map[key]);
                    }
                }
                res.sort((param1, param2) => {
                    return param1.title.charCodeAt(0) - param2.title.charCodeAt(0);
                });
                return hot.concat(res);
            },
            onShortcutTouch (index, event) {
                // 获得触碰的手指的第一个位置
                let firstTouch = event.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.index = index;
                // 滚动到相应位置
                this.$refs.singerList.scrollToElement(this.$refs.category[index], 300);
            },
            onShortcutTouchMove (event) {
                console.log('move');
                // move到的第一个位置
                let moveTouch = event.touches[0];
                this.touch.y2 = moveTouch.pageY;
                // 通过y轴偏移像素计算滚动了几个元素
                let deltaY = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT);
                let index = this.touch.index + deltaY;
                this.$refs.singerList.scrollToElement(this.$refs.category[index], 300);
            },
            // 获得滚动位置
            scrollPos (pos) {
                this.scrollY = pos.y;
            },
            // 计算每个类别的list的高度
            _calculateHeight () {
                const list = this.$refs.category;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    // 累加高度
                    height += list[i].clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            // watch normalizeSingerList的变化,延迟20ms,因为数据变化到dom变化有延时,dom渲染好才可以计算每个类别的list的高度
            normalizeSingerList () {
                setTimeout(() => {
                    this._calculateHeight();
                }, 20);
            },
            fixedDiff (newdiff) {
                // fixtitle向上偏移量
                let fixedTopOffset = 0;
                if (newdiff > 0 && newdiff < FIXED_TITLE_HEIGHT) {
                    fixedTopOffset = newdiff - FIXED_TITLE_HEIGHT;
                }
                // 只有变化时才修改，减少dom修改的频率
                if (this.fixedTopOffset === fixedTopOffset) {
                    return;
                }
                this.fixedTopOffset = fixedTopOffset;
                // 修改dom,translate3d开启GPU加速
                this.$refs.fixedtitle.style.transform = `translate3d(0, ${fixedTopOffset}px, 0)`;
            }
        },
        components: {
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .singer
        position: absolute
        top: 84px
        bottom: 0
        width: 100%
        // background: blue
        .singer-list
            width: 100%
            height: 100%
            overflow: hidden    // 作为scroll的wrapper层
            .singer-category
                .category-title
                    height: 27px
                    line-height: 27px
                    padding-left: 12px
                    background: #f2f2f2
                    font-size: 12px
                    font-weight: 700
                .singer-content
                    display: flex
                    width: 100%
                    height: 60px
                    // border: 1px solid lightblue
                    .avatar
                        flex: 0 0 60px
                        padding: 3px 0 3px 6px
                    .singer-name
                        flex: 1
                        padding-left: 11px
                        box-sizing: border-box
                        line-height: 60px
                        font-size: 14px
                        color: #000000
                        border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                        .alias
                            color: rgba(0, 0, 0, 0.7)
                            font-weight: 100
            .bottom
                width: 100%
                height: 120px
        .shortcut-list
            position: absolute
            right: 0
            top: 50%
            transform: translateY(-50%)
            z-index: 30  // tab组件是50
            padding: 10px 0
            text-align: center
            border-radius: 5px
            background: rgba(242, 242, 242, 0.5)
            .item
                padding: 3px
                color: #d43c33
                font-size: 12px
                font-weight: 500
                &.current
                    font-weight: 700
        .fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            // z-index: -1
            .fixed-title
                height: 27px
                line-height: 27px
                padding-left: 12px
                background: #f2f2f2
                font-size: 12px
                font-weight: 700
        .loading-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>