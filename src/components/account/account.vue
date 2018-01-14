<template>
    <div class="account">
        <m-header :tabType="tabType" :title="title"></m-header>
        <scroll class="account-wrapper">
            <div>
                <div class="info">
                    <div class="myself" @click="goDetail">
                        <div class="avatar">
                            <img src="../../../static/plusone.jpg" width="64" height="64" alt="">
                        </div>
                        <div class="right">
                            <div class="name">PlusOne</div>
                            <div class="level"><em>Lv.1</em></div>
                            <div class="register">
                                <i class="icon-coin"></i>
                                <span>签到</span>
                            </div>
                        </div>
                    </div>
                    <div class="account-tab">
                        <div class="tab-item">
                            <div class="up">动态</div>
                            <div class="down">0</div>
                        </div>
                        <div class="tab-item">
                            <div class="up">关注</div>
                            <div class="down">0</div>
                        </div>
                        <div class="tab-item">
                            <div class="up">粉丝</div>
                            <div class="down">0</div>
                        </div>
                        <div class="tab-item">
                            <div class="up"><i class="icon-edit"></i></div>
                            <div class="down myfile">我的资料</div>
                        </div>
                    </div>
                </div>
                <div class="setlist">
                    <div class="list-group">
                        <div class="list-item">
                            <i class="icon icon-message"></i>
                            <div class="text">我的消息</div>
                        </div>
                    </div>
                    <div class="list-group">
                        <div class="list-item">
                            <i class="icon icon-vip"></i>
                            <div class="text">VIP会员</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-market"></i>
                            <div class="text">商城</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-erji"></i>
                            <div class="text">在线听歌免流量</div>
                        </div>
                    </div>
                    <div class="list-group">
                        <div class="list-item">
                            <i class="icon icon-message"></i>
                            <div class="text">设置</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-fullscreen"></i>
                            <div class="text">扫一扫</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-theme"></i>
                            <div class="text">个性换肤</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-night"></i>
                            <div class="text">夜间模式</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-set-time"></i>
                            <div class="text">定时关闭</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-lock"></i>
                            <div class="text">音乐闹钟</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-car"></i>
                            <div class="text">驾驶模式</div>
                        </div>
                    </div>
                    <div class="list-group">
                        <div class="list-item">
                            <i class="icon icon-share"></i>
                            <div class="text">分享网易云音乐</div>
                        </div>
                        <div class="list-item">
                            <i class="icon icon-about"></i>
                            <div class="text">关于</div>
                        </div>
                    </div>
                </div>
                <div class="bottom"></div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import MHeader from 'components/m-header/m-header.vue';
    import scroll from 'base/scroll/scroll.vue';

    export default {
        data () {
            return {
                tabType: 'account',
                title: '账号'
            };
        },
        methods: {
            goDetail () {
                this.$router.push({
                    path: '/account/accountdetail'
                });
            }
        },
        components: {
            MHeader,
            scroll
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .account
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        background: #eeeff0
        .account-wrapper
            position: absolute
            top: 44px
            bottom: 0
            width: 100%
            overflow: hidden
            .info
                height: 144px
                width: 100%
                background: #ffffff
                .myself
                    height: 92px
                    width: 100%
                    padding: 14px 15px
                    box-sizing: border-box
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    display: flex
                    .avatar
                        flex: 0 0 64px
                        width: 64px
                        height: 64px
                        border-radius: 50%
                        overflow: hidden
                    .right
                        flex: 1
                        margin-left: 12px
                        position: relative
                        .name
                            margin-top: 15px
                            font-size: 16px
                            color: #000000
                        .level
                            margin-top: 11px
                            width: 35px
                            height: 16px
                            border: 1px solid rgba(7, 17, 27, 0.3)
                            border-radius: 8px
                            box-sizing: border-box
                            text-align: center
                            line-height: 14px
                            font-size: 13px
                            color: rgba(7, 17, 27, 0.3)
                        .register
                            position: absolute
                            right: 0
                            top: 17px
                            width: 64px
                            height: 26px
                            border: 1px solid #d43c33
                            border-radius: 13px
                            box-sizing: border-box
                            line-height: 24px
                            text-align: center
                            font-size: 13px
                            color: #d43c33
                .account-tab
                    height: 52px
                    width: 100%
                    display: flex
                    .tab-item
                        flex: 1
                        height: 28px
                        margin: 12px 0
                        text-align: center
                        border-right: 1px solid rgba(7, 17, 27, 0.1)
                        &:last-child
                            border: none
                        .up
                            font-size: 12px
                            color: rgba(7, 17, 27, 0.6)
                        .down
                            margin-top: 5px
                            font-size: 12px
                            font-weight: 700
                            color: #000000
                            &.myfile
                                color: rgba(7, 17, 27, 0.6)
                                font-size: 12px
                                font-weight: normal
            .setlist
                width: 100%
                .list-group
                    margin-top: 10px
                    width: 100%
                    background: #ffffff
                    .list-item
                        height: 45px
                        width: 100%
                        display: flex
                        &:first-child
                            .text
                                border-1px(rgba(7, 17, 27, 0), before, top)
                        .icon
                            flex: 0 0 45px
                            text-align: center
                            line-height: 45px
                            font-size: 18px
                            color: rgba(7, 17, 27, 0.6)
                        .text
                            flex: 1
                            line-height: 45px
                            font-size: 14px
                            border-1px(rgba(7, 17, 27, 0.1), before, top)
            .bottom
                width: 100%
                height: 50px
</style>