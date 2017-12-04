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
            <div class="icon-navigator"></div>
            <div class="music-list"></div>
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
</style>