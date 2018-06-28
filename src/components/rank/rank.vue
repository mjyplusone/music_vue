<template>
<transition name="slide">
    <div class="rank">
        <m-header :tabType="tabType" :title="title"></m-header>
        <scroll :data="ranklists" class="ranklist">
            <div>
                <div class="title">云音乐官方榜</div>
                <div class="col-list">
                    <ul>
                        <li v-for="ranklist in normalranklists" @click="selectRankList(ranklist)">
                            <div class="left">
                                <img :src="ranklist.picUrl" width="100%" height="100%" alt="">
                            </div>
                            <div class="right">
                                <div class="text">{{ ranklist.songs[0] }}&nbsp;-&nbsp;{{ ranklist.artists[0] }}</div>
                                <div class="text">{{ ranklist.songs[1] }}&nbsp;-&nbsp;{{ ranklist.artists[1] }}</div>
                                <div class="text">{{ ranklist.songs[2] }}&nbsp;-&nbsp;{{ ranklist.artists[2] }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <loading v-show="!ranklists.length"></loading>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view :title="title" :showMenuInfo="false"></router-view>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import {getRankList} from 'api/rank.js';
    import scroll from 'base/scroll/scroll.vue';
    import loading from 'base/loading/loading.vue';
    import {createRank} from 'common/js/rank.js';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                tabType: 'back',
                title: '排行榜',
                ranklists: [],  // 排行榜总数据
                normalranklists: [],  // 用Rank类规格化后的排行榜总数据
                rankListNum: 5  // 排行榜数量
            };
        },
        created () {
            this._getRankLists();
        },
        methods: {
            _getRankLists () {
                let rankListArr = [];
                for (let i = 0; i < this.rankListNum; i++) {
                    rankListArr.push(getRankList(i));
                }
                // promise.all执行多个异步操作,在一个回调中处理所有返回数据
                Promise
                    .all(rankListArr)
                    .then((results) => {
                        results.forEach((item) => {
                            console.log(item);
                            if (item.code === 200) {
                                // this.ranklists.push(item.result);
                                this.ranklists.push(item.playlist);
                            }
                        });
                        console.log(this.ranklists);
                        this.normalranklists = this._normalizeRanks(this.ranklists);
                        console.log(this.normalranklists);
                    });
            },
            _normalizeRanks (ranks) {
                let ret = [];
                ranks.forEach((rank) => {
                    if (rank.id) {
                        ret.push(createRank(rank));
                    }
                });
                return ret;
            },
            selectRankList (ranklist) {
                this.$router.push({
                    path: this.$route.path + '/' + ranklist.id
                    // path: `/findmusic/music/rank/${ranklist.id}`
                });
                this.setMusicMenu(ranklist);
            },
            ...mapMutations({
                setMusicMenu: 'SET_MUSICMENU'
            })
        },
        components: {
            MHeader,
            scroll,
            loading
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .rank
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
        .ranklist
            width: 100%
            height: 100%
            overflow: hidden
            .title
                height: 16px
                width: 100%
                margin: 20px 0 15px 0
                border-left: 3px solid #d43b33
                padding: 0 8px
            .col-list
                width: 100%
                li
                    display: flex
                    width: 100%
                    height: 123px
                    margin-bottom: 3px
                    .left
                        flex: 0 0 123px
                    .right
                        flex: 1
                        margin-left: 10px
                        padding: 12px 0
                        // box-sizing: 
                        display: flex
                        flex-direction: column
                        .text
                            height: 32px
                            line-height: 32px
                            font-size: 13px
                            color: rgba(0, 0, 0, 0.7)
            .bottom
                width: 100%
                height: 120px
</style>