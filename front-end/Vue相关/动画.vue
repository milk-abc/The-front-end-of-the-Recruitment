<template>
  <div>
    <button @click="fetchdata"></button>
    <div v-if="isLoding">
      <Loading></Loading>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      deviceInfo: null,
      isLoading: false,
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    getDeviceInfo () {
      this.$axios.get('/getDeviceInfo').then(res => {
        this.deviceInfo = res.data;
      })
    },
    KNB () {
      return Promise.all([this.getDeviceInfo])
    },
    fetchdata () {
      this.isLoading = true;
      fetch('').then(res => {
        this.isLoading = false;
      })
    },
    async init () {
      await this.KNB();
      this.fetchData();
    },
  }
}
</script>
