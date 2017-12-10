<template>
    <div class="musiclist">

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>