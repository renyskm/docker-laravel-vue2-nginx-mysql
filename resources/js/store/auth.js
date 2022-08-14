import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

const state = {
    user: null,
    // auth ストアモジュールでは、まず API 呼び出しが成功したか失敗したかを表す apiStatus ステートを追加します。
    // コンポーネント側ではこの apiStatus ステートを参照して後続の処理を行うかどうかを判別します。
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null
  }

  const getters = {
    check: state => !! state.user,
    username: state => state.user ? state.user.name : ''
  }

const mutations = {
    // ミューテーションの第一引数は必ずステートです。ミューテーションを呼び出すときの実引数は仮引数では第二引数以降として渡されますので注意しましょう。
    setUser (state, user) {
      state.user = user
    },
    setApiStatus (state, status) {
        state.apiStatus = status
    },
    setLoginErrorMessages (state, messages) {
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages (state, messages) {
        state.registerErrorMessages = messages
    }
  }

  const actions = {
    async register (context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/register', data)
    
        if (response.status === CREATED) {
          context.commit('setApiStatus', true)
          context.commit('setUser', response.data)
          return false
        }
    
        context.commit('setApiStatus', false)
        if (response.status === UNPROCESSABLE_ENTITY) {
          context.commit('setRegisterErrorMessages', response.data.errors)
        } else {
          context.commit('error/setCode', response.status, { root: true })
        }
    },
    // async login (context, data) {
    //   const response = await axios.post('/api/login', data)
    //   context.commit('setUser', response.data)
    // },
    async login (context, data) {
        // 最初はnull
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/login', data)
            .catch(err => err.response || err)
        
        if (response.status === OK) {
            // 成功したらtrue
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        // 失敗だったらfalse
        context.commit('setApiStatus', false)
        // バリデーションエラーの場合はルートコンポーネントに制御を渡さず、ページコンポーネント内でエラーの表示を行う必要がある
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root: true })
        }
    },
    async logout (context) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/logout')
    
        if (response.status === OK) {
          context.commit('setApiStatus', true)
          context.commit('setUser', null)
          return false
        }
    
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },
    /*
        ログインしていなければ response.data は空文字です。
        ログインしていないときの user ステートは初期値の null に揃えておいたほうが予期しやすいコードになると思ったのでそのまま setUser しないで真偽値チェックで偽の場合は null を入れるようにしました。
    */
    async currentUser (context) {
        context.commit('setApiStatus', null)
        const response = await axios.get('/api/user')
        const user = response.data || null
    
        if (response.status === OK) {
          context.commit('setApiStatus', true)
          context.commit('setUser', user)
          return false
        }
    
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },
  }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}