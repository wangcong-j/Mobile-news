// user.js  用来发送用户相关的请求
import request from '../untils/request'

// 登录请求  mobile ==> string  ;  code ==>  string
export const login = ({ mobile, code }) => {
  return request('/app/v1_0/authorizations', 'post', { mobile, code })
}
