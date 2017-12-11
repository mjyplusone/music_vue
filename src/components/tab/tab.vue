<template>
    <div class="tab">
        <router-link to="/findmusic" tag="div" class="tab-item">
            <div class="icon findmusic-tab"></div>
            <span>发现音乐</span>
        </router-link>
        <router-link to="/mymusic" tag="div" class="tab-item">
            <div class="icon mymusic-tab"></div>
            <span>我的音乐</span>
        </router-link>
        <router-link to="/friends" tag="div" class="tab-item">
            <div class="icon friends-tab"></div>
            <span>朋友</span>
        </router-link>
        <router-link to="/account" tag="div" class="tab-item">
            <div class="icon account-tab"></div>
            <span>账号</span>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        // methods: {
        //     subIsActive (parent) {
        //         const paths = Array.isArray(parent) ? parent : [parent];
        //         return paths.some(path => {
        //             console.log(this.$route.path);
        //             return this.$route.path.indexOf(path) === 0;
        //         });
        //     }
        // }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"; 

    .tab
        position: fixed
        left: 0
        bottom: 0
        z-index: 150
        width: 100%
        height: 49px
        display: flex
        background: rgba(57, 57, 57, 0.98)
        .tab-item
            flex: 1
            text-align: center
            font-size: 10px
            color: #a7a7a7
            .icon
                margin: 7px auto
                width: 80px
                height: 24px
                &.findmusic-tab
                    icon-bg-image("findmusic_off")
                &.mymusic-tab
                    icon-bg-image("mymusic_off")
                &.friends-tab
                    icon-bg-image("friends_off")
                &.account-tab
                    icon-bg-image("account_off")
            span 
                margin-top: 5px
            &.active
                color: #ffffff
                .icon
                    &.findmusic-tab
                        icon-bg-image("findmusic_on")
                    &.mymusic-tab
                        icon-bg-image("mymusic_on")
                    &.friends-tab
                        icon-bg-image("friends_on")
                    &.account-tab
                        icon-bg-image("account_on")
</style>