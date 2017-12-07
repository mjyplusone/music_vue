<template>
    <div class="singer">
        <scroll class="singer-content" :data="singerList">
            <div>
                <!-- <h2 v-if="normalizeSingerList.length">{{ normalizeSingerList[0].title }}</h2> -->
                <ul v-if="normalizeSingerList.length">
                    <li v-for="singer in normalizeSingerList[0].items" class="each-singer">
                        <div class="avatar">
                            <img width="54" height="54" :src="singer.picUrl" alt="">
                        </div>
                        <div class="singer-name border-1px">{{ singer.name }}&nbsp;<span v-if="singer.alias.length" class="alias">({{ singer.alias[0] }})</span></div>
                    </li>
                </ul>
                <div class="bottom"></div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getSinger} from 'api/singer.js';
    import {ConvertPinyin} from 'common/js/pinyin.js';
    import scroll from 'base/scroll/scroll.vue';

    const HOT_NAME = '热门';

    export default {
        data () {
            return {
                singerList: [],
                normalizeSingerList: []
            };
        },
        created () {
            this._getSinger();
        },
        methods: {
            _getSinger () {
                getSinger().then((res) => {
                    this.singerList = res.artists;
                    console.log(this.singerList);
                    this.normalizeSingerList = this._normalizeSinger(this.singerList);
                    console.log(this.normalizeSingerList);
                    console.log(this.normalizeSingerList.length);
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
            }
        },
        computed: {
            rankSingerList: function () {
                this.rank = this.singerList.sort(
                    function compare (object1, object2) {
                        let name1 = ConvertPinyin(object1['name']);
                        let name2 = ConvertPinyin(object2['name']);
                        if (name1 < name2) {
                            return -1;
                        } else if (name1 > name2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                );
                return this.rank;
            }
        },
        components: {
            scroll
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
        .singer-content
            width: 100%
            height: 100%
            overflow: hidden    // 作为scroll的wrapper层
            .each-singer
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
</style>