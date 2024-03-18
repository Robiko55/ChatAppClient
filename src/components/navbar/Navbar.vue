<template>
    <nav class="navbar">
        <a><img class='logo' src='../../assets/logo/logo.png'></a>
        <div class="logout-wrapper"  v-if="getIsLoggedIn">
          <p class="username">{{ username }}</p>
          <a class="login-btn" @click="logout">Logout</a>
        </div>
        <a v-else class="login-btn" @click="toggleLoginModal">Login</a>
       
      </nav>
  </template>
  
  <script>
 import { mapGetters } from 'vuex';
 import  EventBus  from '../../eventbus/event-bus';
  export default {
    data() {
      return {
        username: ''
      }
    },
    methods: {
      toggleLoginModal() {
        this.$store.dispatch('toggleLoginModal')
      },
      handleUsername(message) {
        this.username = message;
        console.log(message)
      },
      logout() {
        this.$store.dispatch('logoutUser');
        console.log(getIsLoggedIn)
      }
    },
    computed: {
      ...mapGetters(['getShowLogin','getIsLoggedIn'])
    },
    created() {
      EventBus.$on('username', this.handleUsername)
    }
  }
  </script>

<style lang='scss'>
    @import "./scss/navbar.scss"
</style>