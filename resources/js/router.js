import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: PhotoList
  },
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      // ログイン状態であればページ上にリンクは表示されませんが、アドレスバーに直接 URL を打ち込めばアクセスできてしまいます。
      // Vue Router のナビゲーションガード機能を使ってログイン状態でログインページへアクセスした際はトップページに移動させることにしましょう。
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/500',
    component: SystemError
  }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history',  // #をURLにつけない
  routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router