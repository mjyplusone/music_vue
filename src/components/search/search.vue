<template>
    <div class="search">
        <div class="hotkey">
            <h1 class="title">热门搜索</h1>
            <ul>
                <li class="key" v-for="key in hotKey" @click="addQuery(key.k)">
                    <span>{{ key.k }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getHotKey} from 'api/search.js';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                hotKey: []
            };
        },
        created () {
            this._getHotKey();
        },
        methods: {
            _getHotKey () {
                getHotKey().then((res) => {
                    if (res.code === 0) {
                        console.log(res.data);
                        // 截取前10个hotkey
                        this.hotKey = res.data.hotkey.slice(0, 10);
                    }
                });
            },
            addQuery (key) {
                this.setQuery(key);
            },
            ...mapMutations({
                setQuery: 'SET_QUERY'
            })
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .search
        position: absolute
        top: 44px
        bottom: 0
        width: 100%
        z-index: 100
        background: #ffffff
        .hotkey
            width: 100%
            padding: 15px 10px
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
</style>