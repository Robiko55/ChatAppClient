<template>
  <div class="login-overlay"  v-if="getShowLogin">
   <div class="login-modal">
    <div class="close-btn" @click="toggleLoginModal"></div>
    <h1 class="login-modal-heading">Login</h1>
    <p v-if="incorrectCredentials" class="invalid-notification">Pogresan username ili lozinka!</p>
    <form @submit.prevent="loginUser">
        <div class="login-form"  v-bind:class="{'invalid': incorrectCredentials}">
        <input type="name" v-model="username" placeholder="username or email">
        <input type="password" v-model="password" placeholder="password">
        <button type="submit" class="login-btn">Login</button>
        <p>No account?<RouterLink to="/register">Register</RouterLink></p>
    </div>
    </form>
    </div>
  </div>
  </template>
  
  <script>
    import {mapGetters} from 'vuex';
    import api from '../../api/api';
    import EventBus from '../../eventbus/event-bus';
import { RouterLink } from 'vue-router';
  export default {
    data() {
      return {
        username: '',
        password: '',
        isVisible: true,
        incorrectCredentials: false
      }
    },
    methods: {
      toggleLoginModal() {
        this.$store.dispatch('toggleLoginModal')
      },
     async loginUser() {
  
          const userData = {
            username: this.username,
            password: this.password
          }
        try {
          const response = await api.post('auth/login',userData);
          console.log("User logined", response);
          this.$store.dispatch('loginUser');
          this.$store.dispatch('toggleLoginModal');
          EventBus.$emit('username',this.username);

        } catch(err) {
          this.incorrectCredentials = true;
          console.log(this.incorrectCredentials)
        }
        
      },
      validateUser() {

      }
    },
    computed: {
      ...mapGetters(['getShowLogin'])
    }
  }
  </script>

<style lang='scss'>
    @import "./scss/loginModal.scss";
</style>