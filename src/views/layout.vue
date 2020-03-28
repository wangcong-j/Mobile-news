<template>
<!-- 布局 -->
    <div class="container">
    <van-nav-bar fixed title="雨过天晴" right-text="搜索"
      @click-right="$router.push('/search')"/>
    <div class="my-wrapper" >
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question"  icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video"  icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user"  icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style scoped lang='less'>
.van-nav-bar{
  background-color: #3296fa;
  color: #fff;
}
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
