<template>
  <div>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <tab></tab>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import tab from 'components/tab/tab.vue';
  import player from 'components/player/player.vue';

  export default {
    components: {
      tab,
      player
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl"

  // #app
  //   color: $color-theme
    

</style>
