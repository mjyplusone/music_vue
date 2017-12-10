import Vue from 'vue';
import Router from 'vue-router';
import findmusic from 'components/findmusic/findmusic.vue';
import mymusic from 'components/mymusic/mymusic.vue';
import friends from 'components/friends/friends.vue';
import account from 'components/account/account.vue';
import music from 'components/music/music.vue';
import singer from 'components/singer/singer.vue';
import rank from 'components/rank/rank.vue';
import singerDetail from 'components/singer-detail/singer-detail.vue';

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
        {path: 'music', component: music},
        {
          path: 'singer',
          component: singer,
          children: [
            {
              path: ':id',
              component: singerDetail
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
