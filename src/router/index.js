import Vue from 'vue';
import Router from 'vue-router';
import findmusic from 'components/findmusic/findmusic.vue';
import mymusic from 'components/mymusic/mymusic.vue';
import friends from 'components/friends/friends.vue';
import account from 'components/account/account.vue';
import music from 'components/music/music.vue';
import singer from 'components/singer/singer.vue';
import singerDetail from 'components/singer-detail/singer-detail.vue';
import songlist from 'components/songlist/songlist.vue';
import singerinfo from 'components/singerinfo/singerinfo.vue';
import album from 'components/album/album.vue';
import musicmenu from 'components/musicmenu/musicmenu.vue';
import dailyrecommend from 'components/dailyrecommend/dailyrecommend.vue';
import musicmenus from 'components/musicmenus/musicmenus.vue';
import rank from 'components/rank/rank.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // 设置默认路由
    {
      path: '/',
      redirect: '/findmusic/music'
    },
    {
      path: '/findmusic',
      component: findmusic,
      redirect: '/findmusic/music',
      children: [
        {
          path: 'music',
          component: music,
          children: [
            {path: 'recommend', component: dailyrecommend},
            {path: 'musicmenu/:id', component: musicmenu},
            {
              path: 'musicmenus',
              component: musicmenus,
              children: [
                {path: ':id', component: musicmenu}
              ]
            },
            {
              path: 'rank',
              component: rank,
              children: [
                {path: ':id', component: musicmenu}
              ]
            }
          ]
        },
        {
          path: 'singer',
          component: singer,
          children: [
            {
              path: ':id',
              component: singerDetail,
              redirect: ':id/hotsong',
              children: [
                {path: 'hotsong', component: songlist},
                {path: 'album', component: album},
                {path: 'info', component: singerinfo}
              ]
            }
          ]
        },
        {path: 'rank', component: rank}
      ]
    },
    {
      path: '/mymusic', component: mymusic
    },
    {
      path: '/friends', component: friends
    },
    {
      path: '/account', component: account
    }
  ]
});
