<template>
  <div id="app">
    <demo />
  </div>
</template>

<script>
import demo from "./views/demo.vue"

export default {
  name: "App",
  components: { demo },
  data() {
    return {}
  },
  created() {},
}
</script>

<style lang="less">
#app {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  color: #fff;
  background-color: #000;
}
</style>
