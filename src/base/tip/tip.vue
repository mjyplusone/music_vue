<template>
    <div class="tip" v-show="showflag">
        <div class="like" v-show="tipType === 0">
            <div class="xin">❤</div>
            <div class="text">已添加到我喜欢的音乐</div>
        </div>
        <div class="unlike" v-show="tipType === 1">已取消喜欢</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                showflag: false
            };
        },
        props: {
            tipType: {
                type: Number,
                default: 0
            }
        },
        methods: {
            show () {
                this.showflag = true;
                setTimeout(() => {
                    this.showflag = false;
                }, 2000);
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .tip
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        z-index: 250
        border-radius: 10px
        background: rgba(0, 0, 0, 0.7)
        .like
            padding: 15px 10px 10px 12px
            text-align: center
            .xin
                font-size: 25px
                color: #d43c33
            .text
                margin-top: 10px
                font-size: 13px
                color: #ffffff
        .unlike
            padding: 10px 20px
            text-align: center
            font-size: 13px
            color: #ffffff
</style>