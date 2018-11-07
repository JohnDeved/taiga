<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Chat msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chat from '@/components/Chat.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    Chat
  }
})
</script>
