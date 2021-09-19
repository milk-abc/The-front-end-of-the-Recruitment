<template>
  <div class="btn"
       @click="handleclick"
       :class="type">
    <slot>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'mybutton',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "greenbgc"
    }
  },
  methods: {
    handleclick ($event) {
      this.$emit("click", $event);
    }
  }
}
</script>
<style>
.greenbgc {
  background-color: green;
}
</style>