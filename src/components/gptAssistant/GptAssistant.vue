<template>
  <div class="chat-bot">
    <div class="gpt-assistant-open" v-if="openChat">
     <div class="bot-header">
      <p>ChatGpt Assistant</p>
      <span class="close-btn" @click="closeChat" ></span>
      </div>
      
      <div class="chat-container">
        <div>
      <div v-for="(message, index) in messageData" :key="index" :class="{'my-message':message.isMine, 'other-user-msg':!message.isMine}">
     {{ message.message }}
      </div>
    </div>
    </div>
      <form @submit.prevent class="gpt-form">
        <input class="prompt" type="text" v-model="promptMessage" placeholder="Enter your question">
        <button class="send-btn" @click="sendMessageToGpt">Send</button>
      </form>
    </div>
    <div class="gpt-assistant-closed" @click="closeChat" v-if="!openChat">CHAT</div>
  </div>
    </template>
    
    <script>
        import SocketioService from '../../services/socket.service.js';
    export default {
      data() {
        return {
          openChat: false,
          promptMessage: '',
          messageData: [],
          isMine: false
        }
      },
      methods: {
        closeChat() {
          this.openChat = !this.openChat;
        },
        sendMessageToGpt() {
          const socket = SocketioService.socket;
          const messageObject = {isMine: true, message: this.promptMessage}
          socket.emit('gpt-message',this.promptMessage);
          this.messageData.push(messageObject);
          this.promptMessage = '';
        }
      },
      created() {
        SocketioService.setupSocketConnection();
        const socket = SocketioService.socket;
        socket.on('gpt-broadcast', (data) => {
        const messageObject = {isMine: false, message: data}
        this.messageData.push(messageObject);
        console.log(messageObject)
        console.log(data);
    });
      }
    }
    </script>
  
  <style lang='scss'>
      @import "./scss/gptAssistant.scss";
      .gpt-assistant-open{
        width: 250px;
        height: 400px;
        background-color: rgb(37, 37, 37);
        position: fixed;
        bottom: 0;
        right: 20px;
        margin-bottom: 10px;
        z-index: 1000;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgb(27, 27, 27);
        }
        // &::-webkit-scrollbar-track {
        //   border-radius: 10px;
        //   background-color: white;
        // }
      }
      .bot-header { 
        z-index: 100;
        position: fixed;
        height: 50px;
        width: 250px;
        background-color: rgb(224, 121, 255);
        display: flex;
        justify-content: space-between;
        align-items: top;
        padding: 10px 5px 10px 5px;
        border-radius: 10px 10px 0 0;
        // margin-bottom: 5px;
        .close-chat {
          padding: 5px;
        }
        .close-btn {
          position: static;
          border: none;
          width: 18px;
          height: 18px;
          &:hover {
            background: rgba(0, 0, 0, 0.2);
          }
          &::after, &::before {
            width: 2px;
            height: 9px;
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 250px;
          right: 0;
          height: 1px;
          background-color: black;
        }
      }
      .gpt-form {
        position: fixed;
        bottom: 10px;
        width: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(40, 40, 40);
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 0 0 10px 10px;
        .prompt {
          width: 220px;
          margin-left: auto;
          margin-right: auto;
          padding: 5px;
          border-radius: 10px;
          color: white;
          background-color: transparent;
          caret-color: white;
          // margin: 5px;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        .send-btn {
          width: 20%;
          padding: 5px;
          cursor: pointer;
          display: none;
        }
      }
      .gpt-assistant-closed {
        width: 60px;
        height: 60px;
        position: fixed;
        bottom: 0;
        right: 20px;
        margin-bottom: 10px;
        border-radius: 100px;
        color: white;
        font-weight: 700;
        background-color: rgb(82, 43, 94);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .chat-container { 
        padding: 60px 5px 20px 5px;
        background-color: rgb(40, 40, 40);
        width: auto;
        min-height: 400px;
        border-radius: 10px 10px 0 0;
        
      }
      .other-user-msg, .my-message {
      margin-bottom: 5px; 
      width: fit-content;
      white-space: pre-line; /* Use 'pre-line' to preserve line breaks */
      word-wrap: break-word; /* Use 'break-word' for long words */
      padding: 5px 10px 5px 10px;
      border-radius: 25px;
      color: #FFF;
    }
    .other-user-msg {
      background-color: #52694e;
      margin-right: auto;
    }
    .my-message {
      position: relative;
      background-color: rgb(0, 107, 173);
      margin-left: auto;
      text-align: right;
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        color: black;
      }
    }
    .close {
    position: relative;
    right: 0;
    top: 2px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background-color: transparent;
    transition: 300ms all;
    cursor: pointer;
  }
  // .close:hover {
  //   background-color: rgb(189, 189, 189);
  // }
  .close:before, .close:after {
    position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    content: ' ';
    height: 13px;
    width: 2px;
    background-color: #000000;
    cursor: pointer;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  </style>