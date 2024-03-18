import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: function() {
        return import('../views/home-page/HomePage.vue');
    }
  },
  {
    path: '/register',
    name: '/register',
    component: function() {
        return import('../views/register/Register.vue');
    }
  },
  {
    path: '/chat',
    name: '/chat',
    component: function() {
      return import('../components/chat/Chat.vue');
    }
  },
  {
    path: '*',
    component: function() {
        return import('../views/not-found/NotFound.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
