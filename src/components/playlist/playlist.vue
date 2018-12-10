<template>
<transition name="slide">
    <div class="playlist" v-show="showflag" @click="hide">
        <div class="list-wrapper" @click.stop>
            <div class="control">
                <div class="mode">
                    <i :class="iconMode" @click="changeMode" class="icon"></i>
                    <span class="text">{{ textMode }}</span>
                </div>
                <div class="collect">
                    <i class="icon-add-project"></i>
                    <span class="text">收藏全部</span>
                </div>
                <div class="delete">
                    <i class="icon-delete" @click="showConfirm"></i>
                </div>
            </div>
            <scroll :data="sequenceList" class="list-content" ref="scroll">
                <ul>
                    <li ref="listitem" v-for="(item, index) in sequenceList" class="list-item" :class="{'current': isCurrent(item)}" @click="selectItem(item, index)">
                        <div class="content">
                            <i class="icon-volume-medium" v-show="isCurrent(item)"></i>
                            {{ item.name }}<span class="singername"> - {{ item.singer }}</span>
                        </div>
                        <div class="close-icon" @click.stop="deleteOne(item)">
                            <i class="icon-close"></i>
                        </div>
                    </li>
                </ul>
            </scroll>
            <div class="close" @click="hide">关闭</div>
        </div>
        <confirm ref="confirm" :text="confirmText" @confirm="confirmClear"></confirm>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
    import {playMode} from 'common/js/config.js';
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import scroll from 'base/scroll/scroll.vue';
    import confirm from 'base/confirm/confirm.vue';
    import {shuffle} from 'common/js/util.js';

    export default {
        data () {
            return {
                showflag: false,
                confirmText: '确定要清空播放列表?'
            };
        },
        computed: {
            iconMode () {
                if (this.mode === playMode.sequence) {
                    return 'icon-music-shunxu';
                } else if (this.mode === playMode.loop) {
                    return 'icon-music-danqu1';
                } else if (this.mode === playMode.random) {
                    return 'icon-music-random';
                }
            },
            textMode () {
                if (this.mode === playMode.sequence) {
                    return '列表循环';
                } else if (this.mode === playMode.loop) {
                    return '单曲循环';
                } else if (this.mode === playMode.random) {
                    return '随机播放';
                }
            },
            ...mapGetters([
                'mode',
                'sequenceList',
                'currentSong',
                'playList'
            ])
        },
        methods: {
            show () {
                this.showflag = true;
                // show之后DOM才更新,此时要刷新scroll
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                    this.scrollToCurrent(this.currentSong);
                }, 20);
            },
            hide () {
                this.showflag = false;
            },
            isCurrent (item) {
                if (this.currentSong.id === item.id) {
                    return true;
                } else {
                    return false;
                }
            },
            selectItem (item, index) {
                // 这里的index是sequenceList中的index
                // 随机模式中,sequenceList和playList不一样
                if (this.mode === playMode.random) {
                    let currentindex = this.playList.findIndex((song) => {
                        return song.id === item.id;
                    });
                    this.setCurrentIndex(currentindex);
                } else {
                    // 顺序和循环模式中sequenceList和playList一样
                    this.setCurrentIndex(index);
                }
                this.$emit('changeplaying');
            },
            scrollToCurrent (current) {
                const index = this.sequenceList.findIndex((item) => {
                    return current.id === item.id;
                });
                this.$refs.scroll.scrollToElement(this.$refs.listitem[index], 300);
            },
            // 删除选中歌曲
            deleteOne (item) {
                this.deleteSong(item);
                if (!this.playList.length) {
                    this.hide();
                } else {
                    // 在列表没有被删空时,派发事件到player父组件,如果当前播放状态是false,则改为true
                    this.$emit('changeplaying');
                }
            },
            // 显示confirm
            showConfirm () {
                this.$refs.confirm.show();
            },
            // 清空播放列表
            confirmClear () {
                this.clearSongList();
                this.hide();
            },
            // 改变播放模式
            changeMode () {
                const mode = (this.mode + 1) % 3;
                this.setPlayMode(mode);
                let list = [];
                if (mode === playMode.random) {
                    list = shuffle(this.sequenceList);
                } else {
                    list = this.sequenceList;
                }
                this.resetCurrentIndex(list);
                this.setPlayList(list);
            },
            // 改变mode时,playList改变导致currentSong改变,所以在此之前重置currentIndex,使currentSong保持不变
            resetCurrentIndex (playlist) {
                let index = playlist.findIndex((item) => {
                    return item.id === this.currentSong.id;
                });
                this.setCurrentIndex(index);
            },
            ...mapMutations({
                setCurrentIndex: 'SET_CURRENTINDEX',
                setPlaying: 'SET_PLAYING',
                setPlayMode: 'SET_PLAYMODE',
                setPlayList: 'SET_PLAYLIST'
            }),
            ...mapActions([
                'deleteSong',
                'clearSongList'
            ])
        },
        watch: {
            currentSong (newSong, oldSong) {
                if (!this.showflag || newSong.id === oldSong.id) {
                    return;
                }
                this.scrollToCurrent(newSong);
            }
        },
        components: {
            scroll,
            confirm
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

    .playlist
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 250
        background: rgba(0, 0, 0, 0.3)
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(0, 100%, 0)
        .list-wrapper
            position: absolute
            bottom: 0
            width: 100%
            background: #ffffff
            .control
                position: relative
                height: 50px
                width: 100%
                line-height: 50px
                font-size: 14px
                border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                .mode
                    position: absolute
                    left: 10px
                    height: 50px
                    .icon
                        position: absolute
                        top: 16px
                        font-size: 18px
                        color: rgba(7, 17, 27, 0.3)
                    .text
                        margin-left: 27px
                .collect
                    position: absolute
                    right: 64px
                    height: 50px
                    .icon-add-project
                        position: absolute
                        top: 16px
                        right: 65px
                        font-size: 18px
                        color: rgba(7, 17, 27, 0.3)
                .delete
                    position: absolute
                    right: 10px
                    height: 20px
                    width: 32px
                    margin: 15px 0
                    border-left: 1px solid rgba(7, 17, 27, 0.1)
                    .icon-delete
                        position: absolute
                        top: 2px
                        right: 0
                        font-size: 18px
            .list-content
                max-height: 350px
                width: 100%
                padding: 0 10px
                box-sizing: border-box
                overflow: hidden
                .list-item
                    position: relative
                    height: 45px
                    width: 100%
                    line-height: 45px
                    font-size: 14px
                    overflow: hidden
                    border-1px(rgba(7, 17, 27, 0.1), after, bottom)
                    &:last-child
                        border-1px(rgba(7, 17, 27, 0), after, bottom)
                    &.current
                        .content
                            color: #d23c33
                            .singername
                                color: #d23c33
                    .content
                        .singername
                            font-size: 12px
                            color: rgba(0, 0, 0, 0.7)
                    .close-icon
                        position: absolute
                        right: 0
                        top: 0
            .close
                height: 54px
                width: 100%
                line-height: 54px
                text-align: center
                border-1px(rgba(7, 17, 27, 0.1), before, top)
</style> 