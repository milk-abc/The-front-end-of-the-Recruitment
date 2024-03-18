<template>
  <input type="text"
         :value="message"
         @input="valueChange">
</template>
<script>
const app = new Vue({
  el: '#app',
  data: {
    message: '你好!'
  },
  methods: {
    valueChange (event) {
      this.message = event.target.value;
    }
  }
})
</script>