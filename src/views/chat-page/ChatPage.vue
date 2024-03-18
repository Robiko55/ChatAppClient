<template>
    <div class="hero-section">
        <div class="hero-overlay"></div>
        <app-navbar></app-navbar>
        <div class="hero-heading">
        <p>COME</p>
        <p class='heading-second-part' >GET A SIP OF COFFE</p>
        </div>
        <a class="hero-btn">ENTER THE CAFFE</a>
        <login-modal></login-modal>
    </div>
  </template>
  
  <script>
    import Navbar from '../../components/navbar/Navbar.vue';
    import LoginModal from '@/components/loginModal/LoginModal.vue';
  export default {
    components: {
        'app-navbar': Navbar,
        'login-modal': LoginModal
    },
    data() {
      return {
        email: ''
      }
    }
  }
  </script>

<style lang='scss'>
@import './scss/homePage.scss';
</style>