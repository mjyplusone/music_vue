# Vue.js网易云音乐播放器

### 概述
基于Vue.js的音乐播放器，界面模仿网易云音乐，项目使用vue-cli搭建
- [项目预览]()(web端请在chrome调试模式下查看)
- API来源：大部分来自[网易云音乐 Node.js API service](https://github.com/Binaryify/NeteaseCloudMusicApi)，轮播图、热门搜索等少数接口从qq音乐抓取

### 技术栈
- Vue2
- Vuex
- Vue-router
- axios
- Stylus
- webpack
- ES6
- Eslint

### 项目结构
```
├── build
├── config           		
├── node_modules
├── index.html          	 // 项目入口文件
├── package.json      		 // 项目配置文件
├── static                 // 静态资源
├── src                		 // 项目源码
│   ├── api       			   // api请求相关
│   ├── common          	 // 静态资源(字体、图片、js、css)
│   ├── base               // 基础组件
│   ├── components     		 // 业务组件
│   ├── router     		     // 路由相关
│   ├── store       	     // vuex相关
│   ├── App.vue         	
│   └── main.js       	    // Webpack 预编译入口
```

### 已实现功能
- 音乐页面（轮播图，推荐歌单）
- 歌手页面（快速滑动入口，歌手详情页）
- 歌单页面（歌单分类，歌单详情页）
- 排行榜
- 音乐播放器（开始暂停，切歌，进度条，播放模式切换，歌词，播放列表，cd旋转动画）
- 搜索（热门搜索，搜索结果包括最佳匹配、单曲、歌手、专辑、歌单，高亮匹配文字，上拉加载，搜索历史）
- 评论页面（歌曲评论，歌单评论）
- 我的音乐页面（我喜欢的音乐，我的收藏，最近播放）

### 待实现功能
- 歌曲列表多选相关
- 视频、电台页面
- 分享功能
- 用户动态、关注、粉丝

### 截图
<img src="https://github.com/mjyplusone/music_vue/blob/master/static/1.gif" width = "45%" />
<img src="https://github.com/mjyplusone/music_vue/blob/master/static/2.gif" width = "45%" />
<img src="https://github.com/mjyplusone/music_vue/blob/master/static/3.gif" width = "45%" />
<img src="https://github.com/mjyplusone/music_vue/blob/master/static/4.gif" width = "45%" />
<img src="https://github.com/mjyplusone/music_vue/blob/master/static/5.gif" width = "45%" />

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 参考
- 主要思路来自：[慕课网实战教程：Vue 2.0 高级实战-开发移动端音乐 WebApp](http://coding.imooc.com/class/107.html)
- 部分图标字体文件来自：https://github.com/IFmiss/vue-music
