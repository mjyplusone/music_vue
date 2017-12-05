<template>
    <div class="slider" ref="slider">
        <div class="slider-content" ref="sliderContent">
            <slot></slot>
        </div>
        <div class="slider-dots">
            <span class="slider-dot" v-for="(dot, index) in dots" :class="{'active': currentIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {addClass} from 'common/js/dom.js';

    export default {
        data () {
            return {
                dots: [],
                currentIndex: 0
            };
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted () {
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();

                if (this.autoPlay) {
                    this._play();
                }
            }, 20);

            window.addEventListener('resize', () => {
                // slider没有初始化，什么都不做
                if (!this.slider) {
                    return;
                }

                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },
        destroyed () {
            clearTimeout(this.timer);
        },
        methods: {
            _setSliderWidth (isResize) {
                this.children = this.$refs.sliderContent.children;

                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }

                // 如果要保证循环切换，左右会克隆两个dom，所以宽度要两倍！
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth;
                }
                this.$refs.sliderContent.style.width = width + 'px';
            },
            _initDots () {
                this.dots = new Array(this.children.length);
            },
            _initSlider () {
                this.slider = new BScroll(this.$refs.slider, {
                        scrollX: true,
                        scrollY: false,
                        momentum: false,
                        snap: true,
                        snapLoop: this.loop,
                        snapThreshold: 0.3,
                        snapSpeed: 400
                        // click: true
                });

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    // 循环模式下第一个元素默认有一个拷贝,所以index要减1
                    if (this.loop) {
                        pageIndex -= 1;
                    }
                    this.currentIndex = pageIndex;
                    if (this.autoPlay) {
                        // 为了不影响手动拖动的效果
                        clearTimeout(this.timer);
                        this._play();
                    }
                });
            },
            _play () {
                let pageIndex = this.currentIndex + 1;
                // 循环模式下，在开头仍然多一个元素，所以要多加一个
                if (this.loop) {
                    pageIndex += 1;
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval);
            }
       }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-content
        overflow: hidden
        .slider-item
            float: left 
            a
                display: block
                width: 100%
                img 
                    display: block
                    width: 100%
    .slider-dots
        position: absolute
        left: 0
        right: 0
        bottom: 6px
        text-align: center
        font-size: 0
        .slider-dot
            display: inline-block
            width: 7px
            height: 7px
            margin: 0 4px
            border-radius: 50%
            background: rgba(255, 255, 255, 0.5)
            &.active
                background: red
        
</style>