<template>
  <div id="app">
    <navbar-app></navbar-app>
    <RouterView></RouterView>
    <login></login>
    <chat-bot></chat-bot>
   <!-- <home-page></home-page> -->
  </div>
</template>

<script>
import HomePage from './views/home-page/HomePage.vue';
import { RouterView } from 'vue-router';
import Navbar from './components/navbar/Navbar.vue';
import LoginModal from './components/loginModal/LoginModal.vue';
import GptAssistant from './components/gptAssistant/GptAssistant.vue';
export default {
components: {
  'home-page': HomePage,
  'navbar-app': Navbar,
  'login': LoginModal,
  'chat-bot': GptAssistant,
  RouterView
},
data() {
  return {

  }
}
}
</script>
<style lang="scss">
@import './scss/index.scss';
</style>
