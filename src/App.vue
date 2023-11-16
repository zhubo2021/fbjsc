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
    <div v-if="false" class="center_map">
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
    <div id="container"></div>
    <Left />
    <Right />
    <TopKanban :dataList="dataList" />
    <BottomKanban :dataList="dataList" />
    <div class="Footers_img"></div>
  </div>
</template>
<script>
import dayjs from "dayjs"
import Left from "./views/Left"
import Right from "./views/Right"
import TopKanban from "./views/TopKanban"
import BottomKanban from "./views/BottomKanban"
import axios from "@/axios.js"
import styleCss from "./custom_map_config.json"

let apiUrl = "https://cube.yucekj.com/api/cubeMockApi/getContent?bizCode="
if (process.env.NODE_ENV == "production") {
  apiUrl = "/api/cubeMockApi/getContent?bizCode="
}

var _map = null
var customOverlay = null
// let _centerPoint = [121.71839041988835, 29.843869487183433]
let _centerPoint = [122.154, 29.991]
let point2 = []

let ComplexCustomOverlay

export default {
  components: { Left, Right, TopKanban, BottomKanban },
  data() {
    return {
      dayValue: "",
      timeValue: "",
      dataList: [],
    }
  },
  methods: {
    axiosRquest(path) {
      return axios.get(apiUrl + path)
    },
    pageTo() {
      window.open("https://41.248.129.75/#/analyze/F1aAvZ1MTP/report-edit/vIKmkNk6Ne")
      // _map.clearOverlays()
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
    async getKanbanData() {
      this.dataList = await this.axiosRquest("zs_vio_equip_total_ol")
    },
    initMap() {
      window.init = () => {
        this.init()
      }
      let script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `//api.map.baidu.com/api?v=3.0&ak=GAp7ANvstQXFo9sBF4TO772lvNPzz7ib&callback=init`
      document.body.appendChild(script)
    },
    init() {
      let self = this
      _map = new BMap.Map("container")
      let point = new BMap.Point(..._centerPoint)
      _map.centerAndZoom(point, 13)
      _map.enableScrollWheelZoom()
      _map.setMapStyleV2({ styleJson: styleCss })
      _map.addEventListener("click", function (event) {
        // console.log(event)
        if (!event.overlay) {
          this.removeOverlay(customOverlay)
        }
        if (event?.overlay?.customData) {
          this.removeOverlay(customOverlay)
          let item = event.overlay.customData
          customOverlay = new ComplexCustomOverlay(new BMap.Point(item.jd, item.wd), item)
          _map.addOverlay(customOverlay)
        }
      })

      ComplexCustomOverlay = function (point, item) {
        this._point = point
        this._item = item
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay()
      ComplexCustomOverlay.prototype.initialize = function (map) {
        this._map = map
        this._div = self.createDOM(this._item)
        map.getPanes().labelPane.appendChild(this._div)
        return this._div
      }
      ComplexCustomOverlay.prototype.draw = function () {
        let pixel = this._map.pointToOverlayPixel(this._point)
        // console.log("drawdrawdrawdraw", pixel)
        this._div.style.left = pixel.x + 10 + "px"
        this._div.style.top = pixel.y + 10 + "px"
        // console.log(this._div.style.left)
      }
      // customOverlay = new ComplexCustomOverlay(new BMap.Point(..._centerPoint))
      this.setPoint()
    },
    async setPoint() {
      _map.clearOverlays()
      let res = await this.axiosRquest("zs_acd_area_map_ol")
      // console.log("事故撒点", res)
      let res2 = await this.axiosRquest("zs_equip_map_ol")
      // console.log("设备撒点", new Set(res2.map(e => e.ztmc)))
      let accidentIcon = require("@/assets/fbjsc/point_warning.png")
      let facilityIcon1 = require("@/assets/fbjsc/point1.png")
      let facilityIcon2 = require("@/assets/fbjsc/point2.png")
      let facilityIcon3 = require("@/assets/fbjsc/point3.png")
      let facilityIcon4 = require("@/assets/fbjsc/point4.png")
      let facilityIcon5 = require("@/assets/fbjsc/point5.png")
      let accidentIconSize = new BMap.Size(30, 34)
      let facilityIconSize = new BMap.Size(50, 38)
      res.forEach(e => {
        if (e.jd && e.wd) {
          let point = new BMap.Point(e.jd, e.wd)
          let icon = new BMap.Icon(accidentIcon, accidentIconSize)
          let marker = new BMap.Marker(point, { icon })
          marker.customData = { type: "accident", ...e }
          // console.log("marker", marker)
          _map.addOverlay(marker)
        }
      })
      res2.forEach(e => {
        if (e.jd && e.wd) {
          let point = new BMap.Point(e.jd, e.wd)
          let icon = new BMap.Icon(facilityIcon1, facilityIconSize)
          let marker = new BMap.Marker(point, { icon })
          marker.customData = { type: "facility", ...e }
          _map.addOverlay(marker)
        }
      })
      /*  marker.addEventListener("click", function () {
        _map.addOverlay(customOverlay)
      }) */
    },
    createDOM(item) {
      let img = require("@/assets/fbjsc/tankuang_head.png")
      let div = document.createElement("div")
      div.style.position = "absolute"
      div.style.left = "0"
      div.style.top = "0"
      // div.style.background = "url(./imgs/tankuang_head.png) top center/contain no-repeat, rgba(8, 12, 23, 0.78);"
      div.style.backgroundImage = "url(" + img + ")"
      div.style.backgroundPosition = "top center"
      div.style.backgroundSize = "contain"
      div.style.backgroundRepeat = "no-repeat"
      div.style.backgroundColor = "rgba(8, 12, 23, 0.78)"
      div.style.width = "339rem"
      div.style.color = "#fff"
      div.style.borderBottom = "2rem solid #00a2ff"
      let domString
      if (item.type == "accident") {
        domString = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 25rem;
            padding-right: 10rem;
            height: 49rem;
            font-size: 18rem;
            font-weight: 600;
          ">
            <span>警情事故</span>
          </div>
          <div style="
            padding: 10rem;
            gap: 5rem;
            display: flex;
            flex-direction: column;"
          >
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">事故地址：${item.sgdz}</div>
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">事故时间：${item.sgsj.replace("T", " ")}</div>
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">事故当事人：${item.sgdsr}</div>
          </div>
      `
      } else {
        domString = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 25rem;
            padding-right: 10rem;
            height: 49rem;
            font-size: 18rem;
            font-weight: 600;
          ">
            <span>${item.sbdw}</span>
            <span class="status"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 56rem;
              "
            ><span style="
                background:#8D9293;
                margin-right: 10rem;
                display: inline-block;
                width: 7rem;
                height: 7rem;
                border-radius: 7rem;"
              ></span>${item.ztmc}</span>
          </div>
          <div style="
            padding: 10rem;
            gap: 5rem;
            display: flex;
            flex-direction: column;"
          >
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">设备点位：${item.sbdw}</div>
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">设备名称：${item.sbmc}</div>
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">设备编号：${item.sbbh}</div>
            <div style="
              display: flex;
              align-items: center;
              background: rgba(0, 170, 255, 0.15);
              height: 32rem;
              font-size: 16rem;
              font-weight: 400;
              padding-left: 10rem;
            ">所属大队：${item.ssdd}</div>
          </div>
      `
      }
      div.innerHTML = domString
      return div
    },
  },
  created() {
    this.getTime()
    this.getKanbanData()
    setInterval(() => {
      this.getKanbanData()
      // this.setPoint()
      console.log("app_setInterval")
    }, 60000 * 5)
  },
  mounted() {
    this.computedREM()
    this.initMap()
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
  // background: #000;
  background: url(~@/assets/fbjsc/bg.png) center/cover no-repeat, #000;
  .head_bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    height: 113rem;
    padding: 0 32rem;
    background: url(~@/assets/fbjsc/Header.png) center 30rem / contain no-repeat;
    .now_date {
      font-size: 26rem;
      // padding-bottom: 15rem;
    }
    .head_label {
      font-family: DingTalk JinBuTi;
      font-size: 44rem;
      color: #bde6ff;
      padding-right: 206rem;
      // padding-top: 20rem;
    }
    .search_btn {
      width: 168rem;
      height: 50rem;
      background: url(~@/assets/fbjsc/btn.png) center/cover no-repeat;
      font-size: 26rem;
      // margin-bottom: 15rem;
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
  #container {
    width: 100%;
    height: 100%;
  }
  .Footers_img {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 80rem;
    width: 100vw;
    background: url(~@/assets/fbjsc/Footers.png) bottom/contain no-repeat;
  }
}
</style>
