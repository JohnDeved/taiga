<template>
  <div>

    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="10"
        class="message" v-for="(send, index) in messages" :key="index">
          <span><b>{{ send.id }}:</b> {{ send.message }}</span>
      </vs-col>
    </vs-row>

    <vs-row class="sender" vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-textarea class="chatter"  v-model="textarea" @keyup.enter.shift="send"/>
      </vs-col>
    </vs-row>

    <vs-button color="primary" type="flat" @click="send">Send</vs-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

interface Imessage {
  message: string,
  id: string
}

export default Vue.extend({
  name: 'Chat',
  props: {
    msg: String
  },

  data: () => ({
    textarea: '',
    messages: [] as Imessage[]
  }),

  computed: {
    ...mapState(['p2p'])
  },

  methods: {
    ...mapActions(['emit']),
    send () {
      const message = {
        message: this.textarea,
        id: this.p2p.peerId
      }
      this.p2p.emit('peer-msg', message)
      this.messages.push(message)

      this.textarea = ''
    }
  },

  watch: {
    messages (messages: Imessage) {
      localStorage.messages = JSON.stringify(messages);
    }
  },

  mounted () {
    if (localStorage.messages) {
      this.messages = JSON.parse(localStorage.messages);
    }

    this.p2p.on('peer-msg', (data: Imessage) => {
      this.messages.push(data)
    })
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .sender {

  }
</style>
