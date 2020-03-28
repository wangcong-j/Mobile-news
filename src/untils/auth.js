// auth.js  作用：管理本地存储的用户信息

// auth  身份认证   操作的是用户信息（token令牌  认证信息）
// sessionStorage 关闭浏览器就会失效，so 要用localStorage 想永久的保存用户信息 需要使用refresh_token 来延长有效期

// 导出三个操作
// 约定一个常量user_key
const USER_KEY = 'congcong_hellow_Word'
// 1、获取用户信息
export const getUser = () => {
  // 因为可能会没有 USER_KEY 为了不出错，再找不到的时候 返回对象
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
}
// 2、设置用户信息  user是一个对象，用json.stringify()转换成字符串
export const setUser = (user) => {
  return window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 3、删除用户信息
export const delUser = () => {
  return window.localStorage.removeItem(USER_KEY)
}
