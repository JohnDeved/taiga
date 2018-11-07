<template>
  <div>

    <div ref="chat" :class="{
      chat: true,
      top: chatScroll !== 0,
      bottom: chatScroll !== chatHeight
    }" v-scroll="onScroll">
      <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="10"
          class="message" v-for="(send, index) in messages" :key="index">
            <span><b>{{ send.id }}:</b> {{ send.message }}</span>
        </vs-col>
      </vs-row>
    </div>

    <vs-row class="sender" vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-textarea class="chatter"  v-model="textarea" @keyup.enter="send"/>
        <vs-button class="send" type="flat" color="primary" icon="send"></vs-button>
      </vs-col>
    </vs-row>

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
    messages: [] as Imessage[],
    chatScroll: 0,
    chatHeight: 0
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
    },

    onScroll (data) {
      this.chatScroll = data.target.scrollTop
      this.chatHeight = data.target.scrollHeight - data.target.clientHeight
    }
  },

  watch: {
    messages (messages: Imessage) {
      localStorage.messages = JSON.stringify(messages)

      setTimeout(() => {
        this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
      }, 300)
    }
  },

  mounted () {
    if (localStorage.messages) {
      this.messages = JSON.parse(localStorage.messages)
    }

    this.p2p.on('peer-msg', (data: Imessage) => {
      this.messages.push(data)
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .chat {
    height: 80vh;
    width: 90vw;
    overflow-y: scroll;
    margin: auto;
    margin-bottom: 5px
  }

  .chat.top {
    border-top: solid 1px #efeded;
  }

  .chat.bottom {
    border-bottom: solid 1px #efeded;
  }

  .chatter {
    margin-bottom: 0!important
  }
</style>
