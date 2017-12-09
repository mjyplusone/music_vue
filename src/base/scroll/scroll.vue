<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            // 是否监听滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted () {
            // 延迟确保组件渲染了
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll () {
                if (!this.$refs.wrapper) {
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
                // 是否监听scroll滚动位置
                if (this.listenScroll) {
                    // 在外层保留vue实例的this
                    let th = this;
                    this.scroll.on('scroll', (pos) => {
                        // 这里的this是scroll的this，要派发事件要在外层保留vue实例的this
                        th.$emit('scrollPos', pos);
                    });
                }
            },
            // 以下代理几个方法
            enable () {
                this.scroll && this.scroll.enable();
            },
            disable () {
                this.scroll && this.scroll.disable();
            },
            refresh () {
                this.scroll && this.scroll.refresh();
            },
            scrollTo () {
                // 用apply的方式传参
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement () {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        // 关注数据变化，刷新scroll
        watch: {
            data () {
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>