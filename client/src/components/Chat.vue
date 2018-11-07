<template>
  <div>

    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10"
        class="message" v-for="(message, index) in messages">
          <span>{{message}}</span>
      </vs-col>
    </vs-row>

    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
        <vs-textarea class="chatter"  v-model="textarea" />
      </vs-col>
    </vs-row>

    <vs-button color="primary" type="flat" @click="send">Send</vs-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Chat',
  props: {
    msg: String
  },

  data: () => ({
    textarea: '',
    messages: [] as string[]
  }),

  methods: {
    send () {
      this.messages.push(this.textarea)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
