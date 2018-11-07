import Vue from 'vue'
import Vuex from 'vuex'
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)
Vue.use(Vuex)

import p2p from './peer'

export default new Vuex.Store({
  state: {
    p2p
  },
  mutations: {

  },
  actions: {
    
  }
})
