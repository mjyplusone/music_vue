<template>
    <div class="play">
        <transition name="slide">
            <div class="normal-player" v-show="playList && playList.length > 0 && fullScreen">
                <div class="bg">
                    <img width="100%" height="100%" :src="currentSong.picUrl" alt="">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-left"></i>
                    </div>
                    <div class="title">
                        <h1 class="songname">{{ currentSong.name }}</h1>
                        <h2 class="singername">{{ currentSong.singer }}</h2>
                    </div>
                    <div class="share">
                        <i class="icon-share"></i>
                    </div>
                </div>
                <div class="middle">
                    <div class="stick" :class="stickRotate"></div>
                    <div class="cd-bg">
                        <div class="cd-wrapper" :class="cdRotate">
                            <div class="cd">
                                <img width="100%" height="100%" :src="currentSong.picUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tool">
                    <div class="icon"><i class="icon-like"></i></div>
                    <div class="icon"><i class="icon-download"></i></div>
                    <div class="icon"><i class="icon-msg"></i></div>
                    <div class="icon"><i class="icon-list-circle-small"></i></div>
                </div>
                <div class="progress-wrapper">
                    <div class="dot-wrapper"></div>
                    <span class="time time-l">{{ format(currentTime) }}</span>
                    <m-progress :percent="percent" @percentChange="percentChange"></m-progress>
                    <span class="time time-r">{{ format(allTime) }}</span>
                </div>
                <div class="control">
                    <div class="icon icon-1"><i class="icon-music-shunxu"></i></div>
                    <div class="icon icon-2"><i class="icon-prevdetail" @click="preSong"></i></div>
                    <div class="icon"><i :class="playIcon" @click="togglePlaying"></i></div>
                    <div class="icon icon-2"><i class="icon-nextdetail" @click="nextSong"></i></div>
                    <div class="icon icon-1"><i class="icon-list-music"></i></div>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.musicUrl" ref="audio" @canplay="ready" @error="error" @timeupdate="timeUpdate"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    import MProgress from 'components/m-progress/m-progress.vue';

    export default {
        data () {
            return {
                stickchange: '',
                songReady: false,
                currentTime: 0,
                // 歌曲总时长
                allTime: 0
            };
        },
        computed: {
            playIcon () {
                return this.playing ? 'icon-pause-detail' : 'icon-playdetail';
            },
            cdRotate () {
                return this.playing ? 'play' : 'play pause';
            },
            stickRotate () {
                return this.stickchange + (this.playing ? ' playing' : ' pausing');
            },
            percent () {
                return this.currentTime / this.allTime;
            },
            ...mapGetters([
                'fullScreen',
                'playList',
                'currentSong',
                'playing',
                'currentIndex'
            ])
        },
        methods: {
            back () {
                this.setFullScreen(false);
            },
            togglePlaying () {
                // 只有点击的时候才加上stick totate的动画效果
                if (this.playing === true) {
                    this.stickchange = 'pause';
                } else {
                    this.stickchange = 'play';
                }
                this.setPlaying(!this.playing);
            },
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN',
                setPlaying: 'SET_PLAYING',
                setCurrentIndex: 'SET_CURRENTINDEX'
            }),
            nextSong () {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex + 1;
                if (index === this.playList.length) {
                    index = 0;
                }
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            preSong () {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex - 1;
                if (index === -1) {
                    index = this.playList.length - 1;
                }
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            ready () {
                this.songReady = true;
                // 获取歌曲总时长
                this.allTime = this.$refs.audio.duration;
            },
            error () {
                this.songReady = true;
            },
            timeUpdate (event) {
                this.currentTime = event.target.currentTime;
            },
            format (interval) {
                interval = Math.floor(interval);
                const minute = this._padZero(Math.floor(interval / 60));
                const second = this._padZero(interval % 60);
                return `${minute}:${second}`;
            },
            percentChange (percent) {
                this.$refs.audio.currentTime = this.allTime * percent;
                if (!this.playing) {
                    this.togglePlaying();
                }
            },
            _padZero (num) {
                let len = num.toString().length;
                while (len < 2) {
                    num = '0' + num;
                    len++;
                }
                return num;
            }
        },
        watch: {
            currentSong () {
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
            },
            playing (playingstate) {
                this.$nextTick(() => {
                    playingstate ? this.$refs.audio.play() : this.$refs.audio.pause();
                });
            },
            // fullScreen变化将stickchange清空
            fullScreen () {
                this.stickchange = '';
            }
        },
        components: {
            MProgress
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    
    .normal-player
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        z-index: 200   // singer-detail index 100   tab 150
        background: black
        transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .bg
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            z-index: -1
            opacity: 0.6
            filter: blur(20px)
        .top
            height: 46px
            width: 100%
            border-1px(rgba(255, 255, 255, 0.1), after, bottom)
            .back
                position: absolute
                top: 12px
                left: 18px
                font-size: 22px
                color: #ffffff
            .title
                position: absolute
                top: 9px
                left: 50%
                transform: translateX(-50%)
                text-align: center
                color: #ffffff
                font-weight: 300
                .songname
                    font-size: 13px
                .singername
                    margin-top: 6px
                    font-size: 9px
            .share
                position: absolute
                top: 10px
                right: 15px
                font-size: 26px
                color: #ffffff
        .middle
            position: relative
            height: 67vh
            width: 100%
            overflow: hidden
            .stick
                position: absolute
                top: -17px
                left: 0
                width: 100%
                height: 160px
                background: url('../../common/image/stick.png') no-repeat
                background-size: auto 160px
                background-position: 50%
                transform-origin: 50% 17px
                z-index: 10
                &.playing
                    transform: rotate(0)
                &.pausing
                    transform: rotate(-30deg)
                &.play
                    animation: clockwise 1s
                    animation-fill-mode: forwards   // 动画执行完保持最后的状态
                &.pause
                    animation: anticlockwise 1s
                    animation-fill-mode: forwards
            .cd-bg
                position: absolute
                top: 78px
                left: 50%
                transform: translateX(-50%)
                width: 82vw
                height: 82vw
                border-radius: 50%
                padding: 2.4vw
                box-sizing: border-box
                background: rgba(255, 255, 255, 0.1)
                .cd-wrapper
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    padding: 12.5vw
                    box-sizing: border-box
                    background: url('../../common/image/cd_wrapper.png')
                    background-size: 100%
                    &.play
                        animation: rotate 20s linear infinite
                    &.pause
                        animation-play-state: paused
                    .cd
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        overflow: hidden
        .tool
            display: flex
            height: 4.2vh
            width: 100%
            padding: 0 9.3vw
            box-sizing: border-box
            // background: yellow 
            .icon
                flex: 1
                text-align: center
                line-height: 4.2vh
                font-size: 4.2vh
                color: #ffffff
        .progress-wrapper
            position: relative
            margin-top: 3px
            height: 8.2vh
            width: 100%
            line-height: 8.2vh
            font-size: 0
            // background: lightblue
            .time
                position: absolute
                font-size: 10px
                color: #ffffff
            .time-l
                left: 12px
            .time-r
                right: 12px
            // .progress-bar
            //     position: absolute
            //     top: 50%
            //     left: 50%
            //     transform: translate(-50%)
            //     height: 2px
            //     width: 268px
            //     background: rgba(255, 255, 255, 0.2)
        .control
            display: flex
            height: 6.9vh
            width: 100%
            .icon
                flex: 1
                text-align: center
                line-height: 6.9vh
                font-size: 6.9vh
                color: #ffffff  
            .icon-1
                font-size: 3.3vh
            .icon-2
                font-size: 5.2vh
    
    // 旋转动画
    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)
    
    @keyframes clockwise
        0%
            transform: rotate(-30deg)
            transform-origin: 50% 17px
        100%
            transform: rotate(0)
            transform-origin: 50% 17px
    
    @keyframes anticlockwise
        0%
            transform: rotate(0)
            transform-origin: 50% 17px
        100%
            transform: rotate(-30deg)
            transform-origin: 50% 17px
</style>