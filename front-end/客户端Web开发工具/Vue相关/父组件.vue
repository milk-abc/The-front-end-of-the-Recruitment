<template>
  <mybutton @click="login"
            type="greenbgc">登录</mybutton>
</template>
<script>
import mybutton from './mybutton';
export default {
  components: {
    mybutton,
  },
  methods: {
    login () {
      console.log(123);
    }
  }
}
</script>