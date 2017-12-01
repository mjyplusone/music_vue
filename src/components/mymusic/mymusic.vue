<template>
    <div class="mymusic">
        <m-header :tabType="tabType"></m-header>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';

    export default {
        data () {
            return {
                tabType: 'mymusic'
            };
        },
        components: {
            MHeader
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>