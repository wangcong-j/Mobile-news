import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../untils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // state        vuex的基本数据，用来存储变量
  state: {
    // 获取用户信息 (保存token)

    user: auth.getUser()
  },
  // mutations    更新数据的方法，可更改同步的数据
  mutations: {
    // 修改用户信息
    setUser (state, user) {
      // 用户修改后数据同步
      state.user = user
      // 修改后也需要把本地的用户信息改掉
      auth.setUser(user)
    },
    // 删除用户信息
    delUser (state) {
      state.user = {}
      auth.delUser()
    }

  },
  // actions      更新数据的方法，可更新异步数据
  actions: {

  },
  // 模块化vuex，可以让每个模块有自己的 state 、 mutations 、 actions
  modules: {

  }
})
