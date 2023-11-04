<template>
  <div id="app">
    <div class="head_bar">
      <div class="now_date">
        <span style="color: #00a2ff">{{ dayValue }}</span>
        <span style="color: #abd1eb">{{ timeValue }}</span>
      </div>
      <div class="head_label">非现场采集监管驾驶舱</div>
      <div class="search_btn" @click="pageTo">查询</div>
    </div>
    <div class="center_map"></div>
    <Left />
  </div>
</template>
<script>
import dayjs from "dayjs"
import Left from "./views/Left"

export default {
  components: {Left},
  data() {
    return {
      dayValue: "",
      timeValue: "",
    }
  },
  methods: {
    pageTo() {
      window.open("https://www.baidu.com")
    },
    computedREM() {
      let change = () => {
        document.documentElement.style.fontSize = document.documentElement.clientHeight / 1080 + "px"
        /* if (this._myChart1) {
          this._myChart1.resize()
          this._myChart4.resize()
          this._myChart_radar.resize()
        } */
      }
      change()
      window.addEventListener("resize", change, false)
    },
    getTime() {
      this.dayValue = dayjs().locale("zh-cn").format("YYYY年MM月DD日 ")
      this.timeValue = dayjs().format("HH:mm:ss")
      setInterval(() => {
        this.timeValue = dayjs().format("HH:mm:ss")
      }, 1000)
    },
  },
  created() {
    this.getTime()
  },
  mounted() {
    this.computedREM()
  },
}
</script>

<style lang="less">
#app {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  color: #fff;
  position: relative;
  font-size: 16rem;
  // background: url(~@/assets/fbjsc/Header.png) top/contain no-repeat, url(~@/assets/fbjsc/Footers.png) bottom/contain no-repeat,
  //   url(~@/assets/fbjsc/bg.png) 40% 9% / 1600rem 856rem no-repeat, #000;
  background: url(~@/assets/fbjsc/Header.png) center 30rem / contain no-repeat, url(~@/assets/fbjsc/Footers.png) bottom/contain no-repeat,
    url(~@/assets/fbjsc/Lift.png) left/contain no-repeat, url(~@/assets/fbjsc/Right.png) right/contain no-repeat, #000;

  .head_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 95rem;
    padding: 0 32rem;
    .now_date {
      font-size: 26rem;
      padding-bottom: 15rem;
    }
    .head_label {
      font-family: DingTalk JinBuTi;
      font-size: 44rem;
      color: #bde6ff;
      padding-right: 206rem;
    }
    .search_btn {
      width: 168rem;
      height: 50rem;
      background: url(~@/assets/fbjsc/btn.png) center/cover no-repeat;
      font-size: 26rem;
      margin-bottom: 15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .center_map {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 626rem;
    height: 538rem;
    background: url(~@/assets/fbjsc/map.png) no-repeat;
  }
}
</style>
