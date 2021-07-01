<template>
  <div class="test"></div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      websock: null,
    }
  },
  created() {
    this.initWebSocket()
  },
  destroyed() {
    this.websock.close()
  },
  methods: {
    initWebSocket() {
      const wsurl = 'ws://127.0.0.1:8080'
      this.websock = new WebSocket(wsurl)
      this.websock.onopen = this.websockonopen //建立连接
      this.websock.onmessage = this.websockonmessage //接收数据
      this.websock.onerror = this.websockonerror //报错
      this.websock.onclose = this.websockclose //关闭连接
    },
    websockonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: '12345' }
      this.websocksend(JSON.stringify(actions))
    },
    websockonerror() {
      //建立连接失败重连
      this.initWebSocket()
    },
    websockonmessage(e) {
      const resData = JSON.parse(e.data)
    },
    websocksend(Data) {
      this.websock.send(Data)
    },
    websockclose() {
      console.log('close')
    },
  },
}
</script>
