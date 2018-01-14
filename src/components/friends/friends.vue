<template>
    <div class="friends">
        <m-header :tabType="tabType" :title="title"></m-header>
        <div class="content">
            <span class="text">暂无内容</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'account',
                title: '朋友'
            };
        },
        components: {
            MHeader
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .friends
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        .content
            position: absolute
            width: 100%
            top: 44px
            bottom: 49px
            .text
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)

</style>