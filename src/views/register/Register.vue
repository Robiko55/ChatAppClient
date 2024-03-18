<template>
    <div class="register">
        <form @submit.prevent="registerUser">
        <div class="login-form">
        <input type="name" v-model="username" placeholder="username ">
        <input type="password" v-model="password" placeholder="password">
        <input type="email" v-model="email" placeholder="email">
        <button type="submit"  class="login-btn">Register</button>
    </div>
    </form>
    </div>
  </template>
  
  <script>
    import Navbar from '../../components/navbar/Navbar.vue';
    import LoginModal from '@/components/loginModal/LoginModal.vue';
    import api from '../../api/api.js';
  export default {
    components: {
        'app-navbar': Navbar,
        'login-modal': LoginModal
    },
    data() {
      return {
        email: '',
        password: '',
        username: ''
      }
    },
    methods: {
       async registerUser() {
            try {
                const userData = {
                    username: this.username,
                    password: this.password,
                    email: this.email
                };
                console.log('UserData:',userData)
                const response = await api.post('/auth/register', userData);

                console.log('User registred success', response.data);
            } catch(err) {
                console.log(err);
            }
        }
    }
  }
  </script>

<style lang='scss'>
.register {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    display:flex;
    align-items: center;
    justify-content:center;
}
</style>