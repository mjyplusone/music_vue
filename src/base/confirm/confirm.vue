<template>
    <div class="confirm" v-show="showflag" @click.stop>
        <div class="confirm-content">
            <div class="text">{{ text }}</div>
            <div class="button">
                <div class="btn cancel-btn" @click="cancel">{{ cancelBtnText }}</div>
                <div class="btn confirm-btn" @click="confirm">{{ confirmBtnText }}</div>
            </div>
        </div>
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
            text: {
                type: String,
                default: ''
            },
            cancelBtnText: {
                type: String,
                default: '取消'
            },
            confirmBtnText: {
                type: String,
                default: '确定'
            }
        },
        methods: {
            show () {
                this.showflag = true;
            },
            hide () {
                this.showflag = false;
            },
            cancel () {
                this.hide();
                this.$emit('cancel');
            },
            confirm () {
                this.hide();
                this.$emit('confirm');
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .confirm
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 300
        background: rgba(0, 0, 0, 0.3)
        .confirm-content
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            width: 270px
            height: 100px
            border-radius: 10px
            background: #ffffff
            .text
                height: 60px
                line-height: 60px
                text-align: center
                font-size: 14px
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
            .button
                height: 40px
                display: flex
                .btn
                    flex: 1
                    text-align: center
                    line-height: 40px
                    font-weight: 600
                    color: #3b98fd
                    &.cancel-btn
                        border-right: 1px solid rgba(7, 17, 27, 0.1)
</style>