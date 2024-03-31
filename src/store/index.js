import { createStore } from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import sysConf from './modules/sysConf'

export default createStore({
  state: {
  },
  getters: {
    adminUser: state => state.user,
    adminId: state => state.user.adminId,
    name: state => state.user.name,
    username: state => state.user.username,
    avatar: state => state.user.avatar,
    lastTime: state => state.user.lastTime,
    parentMenus: state => state.menu.parentMenus,
    childMenus: state => state.menu.childMenus,
    sysConfs: state => state.sysConf.sysConfs,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    menu,
    sysConf,
  }
})
