<template>
  <div>
    <!-- <m-header></m-header> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  // import MHeader from 'components/m-header/m-header.vue';
  import tab from 'components/tab/tab.vue';

  export default {
    components: {
      // MHeader,
      tab
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl"

  // #app
  //   color: $color-theme
    

</style>
