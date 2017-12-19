<template>
    <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn" ref="progressBtn" 
            @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend.prevent="progressTouchEnd">
            <!-- <div class="btn"></div> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {prefixStyle} from 'common/js/dom.js';
    // const progressBtnWidth = 16;
    const transform = prefixStyle('transform');

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created () {
            this.touch = {};
        },
        watch: {
            percent (newPercent) {
                if (newPercent >= 0 && !this.touch.init) {
                    const barWidth = this.$refs.progressBar.clientWidth;
                    const offsetWidth = newPercent * barWidth;
                    this.$refs.progress.style.width = offsetWidth + 'px';
                    this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, -50%, 0)`;
                }
            }
        },
        methods: {
            progressTouchStart (event) {
                this.touch.init = true;
                this.touch.touchStartX = event.touches[0].pageX;
                this.touch.progressStart = this.$refs.progress.clientWidth;
            },
            progressTouchMove (evnet) {
                if (!this.touch.init) {
                    return;
                }
                const touchDeltaX = event.touches[0].pageX - this.touch.touchStartX;
                // offset不可以小于0不可以大于进度条宽度
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.progressStart + touchDeltaX));
                this.$refs.progress.style.width = offsetWidth + 'px';
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, -50%, 0)`;
            },
            progressTouchEnd (event) {
                this.touch.init = false;
                const percent = this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth;
                this.$emit('percentChange', percent);
            },
            progressClick (event) {
                this.$refs.progress.style.width = event.offsetX + 'px';
                this.$refs.progressBtn.style[transform] = `translate3d(${event.offsetX}px, -50%, 0)`;
                const percent = this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth;
                this.$emit('percentChange', percent);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .progress-bar
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        height: 2px
        width: 71.5vw
        background: rgba(255, 255, 255, 0.2)
        .progress
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 0
            background: #d33a31
        .progress-btn
            position: absolute
            top: 0
            left: 0
            transform: translate(-50%, -50%)
            width: 16px
            height: 16px
            border-radius: 50%
            border: 5.5px solid #ffffff
            box-sizing: border-box
            background: #d33a31
</style>