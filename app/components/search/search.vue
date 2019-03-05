<template>
    <div class="search">
        <scroll class="scroll-wrapper" :data="scrollData" :beforeScroll="beforeScroll" @beforeScroll="listScroll">
            <div>
                <div class="hotkey">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="key" v-for="key in hotKey" @click="addQuery(key.k)">
                            <span>{{ key.k }}</span>
                        </li>
                    </ul>
                </div>
                <div class="searchhistory" v-show="searchHistory.length">
                    <ul>
                        <li v-for="history in searchHistory" class="history" @click="addQuery(history)">
                            <i class="icon-set-time"></i>
                            <span class="text">{{ history }}</span>
                            <i class="icon-close" @click.stop="deleteHistory(history)"></i>
                        </li>
                    </ul>
                </div>
                <div class="bottom"></div>
            </div>
        </scroll>
        <searchresult v-if="query" @changesearch="saveSearch"></searchresult>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getHotKey} from 'api/search.js';
    import {mapMutations, mapGetters, mapActions} from 'vuex';
    import searchresult from 'components/searchresult/searchresult.vue';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        data () {
            return {
                hotKey: [],
                beforeScroll: true  // 监听滚动开始事件
            };
        },
        created () {
            this._getHotKey();
        },
        computed: {
            scrollData () {
                return this.hotKey.concat(this.searchHistory);
            },
            ...mapGetters([
                'query',
                'searchHistory'
            ])
        },
        methods: {
            _getHotKey () {
                getHotKey().then((res) => {
                    if (res.code === 0) {
                        console.log(res.data);
                        // 截取前10个hotkey
                        this.hotKey = res.data.hotkey.slice(0, 10);
                        // hotkey每个k后面有一个' ',要去掉,不然搜索的时候会影响高亮结果
                        this.hotKey.forEach((item) => {
                            item.k = item.k.substr(0, item.k.length - 1);
                        });
                        console.log(this.hotkey);
                    }
                });
            },
            addQuery (key) {
                this.setQuery(key);
            },
            saveSearch () {
                console.log(this.query);
                if (!this.query) {
                    return;
                }
                this.saveSearchHistory(this.query);
            },
            deleteHistory (history) {
                this.deleteSearchHistory(history);
            },
            listScroll () {
                // 列表开始滚动,blur input
                this.setBlurInput(true);
            },
            ...mapMutations({
                setQuery: 'SET_QUERY',
                setBlurInput: 'SET_BLURINPUT'
            }),
            ...mapActions([
                'saveSearchHistory',
                'deleteSearchHistory'
            ])
        },
        watch: {
            // 在这里watch query,如果为由空向不空变化,则将路由定位到findmusic/search
            query (newquery, oldquery) {
                if (oldquery === '' && newquery !== '') {
                    this.$router.push({
                        path: '/findmusic/search'
                    });
                }
            }
        },
        components: {
            searchresult,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'

    .search
        position: absolute
        top: 44px
        bottom: 0
        width: 100%
        z-index: 100
        background: #ffffff
        .scroll-wrapper
            width: 100%
            height: 100%
            overflow: hidden
            .hotkey
                width: 100%
                padding: 15px 10px 10px 10px
                .title
                    margin-bottom: 8px
                    font-size: 12px
                    color: rgba(0, 0, 0, 0.7)
                .key
                    display: inline-block
                    margin: 0 8px 8px 0
                    height: 30px
                    padding: 0 12px
                    box-sizing: border-box
                    border-radius: 15px
                    border: 1px solid rgba(7, 17, 27, 0.1)
                    line-height: 30px
                    font-size: 13px
            .searchhistory
                padding: 0 10px
                .history
                    position: relative
                    height: 45px
                    line-height: 45px
                    box-sizing: border-box
                    font-size: 13px
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    .icon-set-time
                        position: absolute
                        top: 15px
                        font-size: 15px
                        color: rgba(7, 17, 27, 0.3)
                    .icon-close
                        position: absolute
                        top: 15px
                        right: 0
                        font-size: 15px
                        color: rgba(0, 0, 0, 0.5)
                    .text
                        margin-left: 25px
            .bottom
                width: 100%
                height: 80px
</style>