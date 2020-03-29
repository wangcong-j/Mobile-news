// 配置axios，使用配置好的axios发请求

// 作用：处理js安全最大值问题  ， 在每次请求时 携带token ，  响应后处理数据   处理token失效问题

// 封装一个request工具函数  （请求）

import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '../store'
import router from '../router'

// 配置一个新的axios实例
const instance = axios.create({
  // 基础地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 转换原始数据格式
  transformResponse: [(data) => {
    // data  原始数据(理想情况下是json字符串)
    try {
      return JSONBIGINT.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截器   在每次请求头中  携带token
instance.interceptors.request.use(config => {
  // 成功拦截
  // 修改请求配置 修改headers 获取token 配置token
  if (store.state.user.header) {
    config.header.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => Promise.reject(err))

// 响应拦截器      处理成功响应后的数据
instance.interceptors.response.use(res => {
  // 响应的数据就是 res   但我们实际需要的数据，存储在 res.data.data 中
  try {
    return res.data.data
  } catch (e) {
    return res
  }
}, async err => {
  // 处理token 失效问题 使用 refresh_token延长 token 的有效期
  // 1. 判断是否是401状态
  // 2. 如果未登录（拦截到登录页面，预留回跳功能）
  // 3. token失效，发请求给后台刷新token
  // 3.1 刷新成功  更新vuex中token和本地存储的token
  // 3.2 刷新成功  把原本失败的请求继续发送出去
  // 3.3 刷新失败  删除vuex中token和本地存储的token （拦截到登录页面，预留回跳功能）

  // 取出用户信息
  const { user } = store.state
  if (err.response && err.response.status === 401) {
    // 定义 loginCorfig 变量   router.currentRoute.path ==> 拿到当前页面的url
    const loginCorfig = {
      path: '/login',
      query: { oldUrl: router.currentRoute.path }
    }

    // 2、判断是否未登录
    if (!user || !user.token || !user.refresh_token) {
      // 成功--代表未登录状态,拦截到登录
      return router.push(loginCorfig)
    }
    try {
      // 3、token失效 发请求给后台 刷新token
      const { data: { data } } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'put',
        headers: { Authorization: `Bearer ${user.refresh_token}` }
      })
      // 3.1 请求成功后，更新 vuex 中的数据和本地的数据
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      // 3.2 刷新成功  把原本失败的请求继续发送出去
      // instance(原来的配置) ==>  把原来的请求发出去以后，要把结果给当前的错误拦截函数
      return instance(err.config)
    } catch (e) {
      // 3.3 刷新失败  删除vuex中token和本地存储的token （拦截到登录页面，预留回跳功能）
      store.commit('delUser')
      return router.push(loginCorfig)
    }
  }

  return Promise.reject(err)
})

// 导出一个使用配置好的axios来发请求的函数
// 请求地址 url 请求方式 methdo  传参 data
export default (url, method, data) => {
  return instance({
    url,
    method,
    // 因请求方式的不同，需判断 data 放在什么位置
    // 当请求方式是get 是params来传参
    // 其他请求方式   是data来传参
    // 动态插入 属性 params|data
    // [] 写任意表达式  返回结果一定要是字符串类型
    // 不够严谨：用户传入请求方式 get Get GET
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
