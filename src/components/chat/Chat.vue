<template>
  <div>
    <div class="chat-wrapper">
    <div class="message-container">
      <!-- Display messages in a conversational order -->
      <div v-for="(message, index) in messageData" 
      :key="index" 
      v-bind:class="{'my-message':message.isMine, 'other-user-msg':!message.isMine}">
     {{ message.message }}
      </div>
    </div>
    <div class="send-container-wrapper">
      <form class="send-container" @submit.prevent="sendMessage">
      <input type="text" class="message-input" v-model="message">
      <button type="submit" class="send-button">Send</button>
    </form>
  </div>
  </div>
  </div>
</template>
  <script>
    import SocketioService from '../../services/socket.service.js';
    import EventBus from '@/eventbus/event-bus';
    export default {
    data() {
      return {
        message: '',
        messageData: [],
        myMessages:[],
        username: '',
        isMineMessage: false
       
      }
    },
    methods: {
      handleUsername(message) {
        this.username = message;
        console.log(message)
      },
      sendMessage() {
      const socket = SocketioService.socket;
      const objectMessage = {isMine: true, message: this.message}
       socket.emit('my message', objectMessage);
       this.messageData.push(objectMessage);
       this.isMineMessage = true;
       this.message = '';
      }
    },
    created() {
        SocketioService.setupSocketConnection();
        const socket = SocketioService.socket;
        socket.on('my broadcast', (data) => {
        data.isMine = false;
        this.messageData.push(data);
        console.log(data);
    });
    EventBus.$on('username', this.handleUsername);
    },
    beforeUnmount() {
    SocketioService.disconnect();
  }
  };
  </script>

<style lang="scss">
  @import './scss/chat';
 

</style>
  