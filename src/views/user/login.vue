<template>
   <div class="page-user-chat">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <!-- van-cell-group  单元格 -->
     <van-cell-group>
        <van-field  label="手机号" v-model="userForm.mobile" :error-message="errorMsg.mobile"  @blur="clickMobile" placeholder="请输入手机号" />
        <van-field label="验证码"  v-model="userForm.code" :error-message="errorMsg.code"  @blur="clickCode" placeholder="请输入验证码">
            <van-button class="p5" slot="button" size="mini" type="primary">发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <div class="btn_box">
        <van-button type="info" @click="login"  block round>登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 当输入框失去焦点时
    clickMobile () {
      const value = this.userForm.mobile
      // 1、判断非空
      if (!value) {
        this.errorMsg.mobile = '请输入手机号'
        return false
      }
      // 2、校验格式
      if (!/^1[3-9]\d{9}$/.test(value)) {
        this.errorMsg.mobile = '手机号格式不正确'
        return false
      }
      // 输入成功
      this.errorMsg.mobile = ''
    },
    clickCode () {
      const value = this.userForm.code
      // 1、判断非空
      if (!value) {
        this.errorMsg.code = '请输入验证码'
        return false
      }
      // 2、校验格式
      if (!/^\d{6}$/.test(value)) {
        this.errorMsg.code = '验证码输入错误'
        return false
      }
      // 输入成功
      this.errorMsg.code = ''
    },

    async login () {
      this.clickMobile()
      this.clickCode()
      if (this.errorMsg.mobile || this.errorMsg.code) {
        return false
      }
      console.log('基础校验完成')
      try {
        //  向后端发请求 进行判断手机号及验证码是否正确
        const data = await login(this.userForm)
        // data 为返回的的数据 ==>  token / refresh_token
        // 请求成功，1、该把token 存入 vuex 中
        console.log('1' + data)
        console.log('2')
        this.setUser(data)
        // 请求成功  2、跳转到回调页面 或者 /user 页面
        this.$router.push(this.$route.query.oldUrl || '/user')
      } catch (e) {
        console.log('手机号或验证码出错')
        this.$toast.fail('手机号或验证码错误')
      }
    },
    // 通过映射，拿到vuex中setUser 方法
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang="less">
.p5{
  padding: 0 5px;
}
.btn_box{
  padding: 10px;
  .van-button{
    height: 32px;
    line-height: 30px;
  }
}
</style>
