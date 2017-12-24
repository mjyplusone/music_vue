<template>
    <div class="singerinfo">
        <div class="title">{{ singerName }}简介</div>
        <div class="content">{{ briefDesc }}</div>
        <div v-for="intro in introduction">
            <div class="title">{{ intro.ti }}</div>
            <div class="content">{{ intro.txt }}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerInfo} from 'api/singer.js';

    export default {
        data () {
            return {
                briefDesc: '',
                introduction: []
            };
        },
        props: {
            singerId: {
                type: Number,
                default: null
            },
            singerName: {
                type: String,
                default: ''
            }
        },
        created () {
            this._getSingerInfo();
        },
        methods: {
            _getSingerInfo () {
                getSingerInfo(this.singerId).then((res) => {
                    if (res.code === 200) {
                        this.briefDesc = res.briefDesc;
                        this.introduction = res.introduction;
                        this.$emit('infoRefresh', this.introduction);
                    }
                });
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .singerinfo
        .title
            height: 16px
            width: 100%
            margin-top: 21px
            padding: 0 8px
            border-left: 3px solid #d43c33
            line-height: 16px
            font-size: 12px
            color: #000000
        .content
            margin-top: 6px
            padding: 0 10px
            line-height: 25px
            font-size: 12px
            color: rgba(0, 0, 0, 0.7)
</style>