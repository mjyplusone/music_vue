<template>
    <div class="music">
        <div class="music-content">
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
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
                <div class="navigator-item">
                    <div class="navigator-img">
                        <i class="icon-text icon-date"></i>
                    </div>
                    <div class="navigator-text">
                        <span>每日推荐</span>
                    </div> 
                </div>
                <div class="navigator-item">
                    <div class="navigator-img">
                        <i class="icon-text icon-diantai"></i>
                    </div>
                    <div class="navigator-text">
                        <span>歌单</span>
                    </div> 
                </div>
                <div class="navigator-item">
                    <div class="navigator-img">
                        <i class="icon-text icon-rank-list"></i>
                    </div>
                    <div class="navigator-text">
                        <span>排行榜</span>
                    </div> 
                </div> 
            </div>
            <div class="music-list">
                <div class="title">
                    <span>推荐歌单</span>
                    <i class="icon-right"></i>
                </div>
                <div class="content"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getRecommend} from 'api/recommend';
    import {ERR_OK} from 'api/config';
    import slider from 'base/slider/slider.vue';

    export default {
        data () {
            return {
                recommends: []
            };
        },
        created () {
            this._getRecommend();
        },
        methods: {
            _getRecommend () {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider;
                        console.log(this.recommends);
                    }
                });
            }
        },
        components: {
            slider
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
        overflow: hidden
        // background: blue
        .music-content
            width: 100%
            .slider-wrapper
                position: relative   // 之后dots相对slider-wrapper绝对定位
                width: 100%
                overflow: hidden
            .icon-navigator
                width: 100%
                height: 104px
                display: flex
                border-1px(rgba(7, 17, 27, 0.1))
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
                // .content
                //     height: 20px
                //     background: red
</style>