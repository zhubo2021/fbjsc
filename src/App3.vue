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
    <div class="center_map">
      <div class="map_point1">
        <div class="dialog_point">
          <div class="dialog_title">警情事故</div>
          <div class="dialog_content">
            <div class="content_item">事故地址：事故地址信息</div>
            <div class="content_item">事故时间：2023-11-01 12:22:30</div>
            <div class="content_item">事故当事人：王先生</div>
            <div class="content_item">事故责任车辆信息：浙LDA2778</div>
          </div>
        </div>
      </div>
      <div class="map_point2">
        <div class="dialog_point">
          <div class="dialog_title">
            <span>海南大道C线违法抓拍</span>
            <span class="status"><span class="point" :style="{ background: '#FC2626' }"></span>异常</span>
          </div>
          <div class="dialog_content">
            <div class="content_item">设备点位：id55124</div>
            <div class="content_item">设备名称：红绿灯摄像头</div>
            <div class="content_item">设备编号：abc22233</div>
            <div class="content_item">所属大队：浙江交警大队</div>
          </div>
        </div>
      </div>
      <div class="map_point3">
        <div class="dialog_point">
          <div class="dialog_title">
            <span>海南大道C线违法抓拍</span>
            <span class="status"><span class="point" :style="{ background: '#8D9293' }"></span>停用</span>
          </div>
          <div class="dialog_content">
            <div class="content_item">设备点位：id55124</div>
            <div class="content_item">设备名称：红绿灯摄像头</div>
            <div class="content_item">设备编号：abc22233</div>
            <div class="content_item">所属大队：浙江交警大队</div>
          </div>
        </div>
      </div>
      <div class="map_point4">
        <div class="dialog_point">
          <div class="dialog_title">
            <span>海南大道C线违法抓拍</span>
            <span class="status"><span class="point" :style="{ background: '#00A2FF' }"></span>正常</span>
          </div>
          <div class="dialog_content">
            <div class="content_item">设备点位：id55124</div>
            <div class="content_item">设备名称：红绿灯摄像头</div>
            <div class="content_item">设备编号：abc22233</div>
            <div class="content_item">所属大队：浙江交警大队</div>
          </div>
        </div>
      </div>
      <div class="map_point5">
        <div class="dialog_point">
          <div class="dialog_title">
            <span>海南大道C线违法抓拍</span>
            <span class="status"><span class="point" :style="{ background: '#FDE701' }"></span>警告</span>
          </div>
          <div class="dialog_content">
            <div class="content_item">设备点位：id55124</div>
            <div class="content_item">设备名称：红绿灯摄像头</div>
            <div class="content_item">设备编号：abc22233</div>
            <div class="content_item">所属大队：浙江交警大队</div>
          </div>
        </div>
      </div>
      <div class="map_point6">
        <div class="dialog_point">
          <div class="dialog_title">
            <span>海南大道C线违法抓拍</span>
            <span class="status"><span class="point" :style="{ background: '#14D23E' }"></span>正常</span>
          </div>
          <div class="dialog_content">
            <div class="content_item">设备点位：id55124</div>
            <div class="content_item">设备名称：红绿灯摄像头</div>
            <div class="content_item">设备编号：abc22233</div>
            <div class="content_item">所属大队：浙江交警大队</div>
          </div>
        </div>
      </div>
    </div>
    <Left />
    <Right />
    <TopKanban />
    <BottomKanban />
  </div>
</template>
<script>
import dayjs from "dayjs"
import Left from "./views/Left"
import Right from "./views/Right"
import TopKanban from "./views/TopKanban"
import BottomKanban from "./views/BottomKanban"

export default {
  components: { Left, Right, TopKanban, BottomKanban },
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
  font-weight: 400;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  color: #fff;
  position: relative;
  font-size: 16rem;
  background: url(~@/assets/fbjsc/Header.png) center 30rem / contain no-repeat, url(~@/assets/fbjsc/Footers.png) bottom/contain no-repeat,
    url(~@/assets/fbjsc/Lift.png) left/contain no-repeat, url(~@/assets/fbjsc/Right.png) right/contain no-repeat, url(~@/assets/fbjsc/bg.png) center/cover no-repeat, #000;

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
    // background: url(~@/assets/fbjsc/map.png) center/cover no-repeat;
    .map_point1 {
      position: absolute;
      left: 30%;
      top: 30%;
      width: 31rem;
      height: 37rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point_warning.png) center/cover no-repeat;

      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .map_point2 {
      position: absolute;
      left: 40%;
      top: 40%;
      width: 50rem;
      height: 38rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point1.png) center/cover no-repeat;
      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .map_point3 {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 50rem;
      height: 38rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point2.png) center/cover no-repeat;
      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .map_point4 {
      position: absolute;
      left: 55%;
      top: 55%;
      width: 50rem;
      height: 38rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point3.png) center/cover no-repeat;
      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .map_point5 {
      position: absolute;
      left: 60%;
      top: 60%;
      width: 50rem;
      height: 38rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point4.png) center/cover no-repeat;
      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .map_point6 {
      position: absolute;
      left: 66%;
      top: 66%;
      width: 50rem;
      height: 38rem;
      cursor: pointer;
      background: url(~@/assets/fbjsc/point5.png) center/cover no-repeat;
      &:hover {
        .dialog_point {
          display: block;
        }
      }
    }
    .dialog_point {
      display: none;
      position: relative;
      top: 10rem;
      left: 10rem;
      background: url(~@/assets/fbjsc/tankuang_head.png) top center/contain no-repeat, rgba(8, 12, 23, 0.78);
      width: 339rem;
      // height: 500rem;
      border-bottom: 2rem solid #00a2ff;
      z-index: 10;
      .dialog_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 25rem;
        padding-right: 10rem;
        height: 49rem;
        font-size: 18rem;
        font-weight: 600;
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          .point {
            margin-right: 10rem;
            display: inline-block;
            // background: #14D23E;
            width: 7rem;
            height: 7rem;
            border-radius: 7rem;
          }
        }
      }
      .dialog_content {
        padding: 10rem;
        gap: 5rem;
        display: flex;
        flex-direction: column;
        .content_item {
          display: flex;
          align-items: center;
          background: rgba(0, 170, 255, 0.15);
          height: 32rem;
          font-size: 16rem;
          font-weight: 400;
          padding-left: 10rem;
        }
      }
    }
  }
}
</style>
