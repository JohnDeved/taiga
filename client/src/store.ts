import Vue from 'vue'
import Vuex from 'vuex'
import vuescroll from 'vue-scroll'

import p2p from './peer'

Vue.use(vuescroll)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    p2p
  },
  mutations: {

  },
  actions: {

  }
})
