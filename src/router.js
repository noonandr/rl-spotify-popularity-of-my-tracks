import Vue from 'vue'
import Router from 'vue-router'
import Spotify from './views/Spotify.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'spotify',
      component: Spotify
    }
  ]
})
