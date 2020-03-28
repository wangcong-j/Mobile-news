import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home/index')
const Question = () => import('@/views/question/index')
const Video = () => import('@/views/Video/index')
const User = () => import('@/views/user/index')
const UserProfile = () => import('@/views/user/profile')
const UserChat = () => import('@/views/user/chat')
const Login = () => import('@/views/user/login')
const Search = () => import('@/views/search/index')
const SearchResult = () => import('@/views/search/result')
const Article = () => import('@/views/home/article')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/question', name: 'question', component: Question },
      { path: '/video', name: 'Video', component: Video },
      { path: '/user', name: 'user', component: User }
    ]
  },
  { path: '/user/profile', name: 'user-profile', component: UserProfile },
  { path: '/user/chat', name: 'user-chat', component: UserChat },
  { path: '/login', name: 'login', component: Login },
  { path: '/search', name: 'search', component: Search },
  { path: '/search/rreult', name: 'search-result', component: SearchResult },
  { path: '/home/article', name: 'home-article', component: Article }

]

const router = new VueRouter({
  routes
})

// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  // 当未登录 且 要跳转的地址 由 user 开头，拦截到login页面
  const { user } = store.state
  if (!user.token && to.path.startsWith('/user')) {
    // 拦截到login页面  to.path ==> 想要跳转到的页面
    return next({
      path: '/login',
      query: { oldUrl: to.path }
    })
  }
  next()
})

export default router
