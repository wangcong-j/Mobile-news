<template>
   <div class='container'>
    <van-skeleton title avatar :row="3" />
    <van-skeleton title avatar :row="3" />
    <van-skeleton title avatar :row="3" />
  </div>
</template>

<script>
export default {
  name: 'Video'
}
</script>

<style lang="less">
.van-skeleton{
  margin-top: 10px;
}
</style>
