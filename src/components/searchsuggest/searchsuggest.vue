<template>
    <div class="searchsuggest">
        
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex';
    // import {search} from 'api/search.js';

    export default {
        computed: {
            ...mapGetters([
                'query'
            ])
        },
        methods: {
            search () {
                // search()
            },
            ...mapMutations({
                setQuery: 'SET_QUERY'
            })
        },
        watch: {
            query () {
                this.search();
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .searchsuggest
        background: red
</style>