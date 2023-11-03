<template>
  <div id="app">
    <img class="left-bg" src="~@/assets/Lift.png" />
    <img class="right-bg" src="~@/assets/Right.png" />
    <div class="top-bar">
      <div class="cloud">
        <img src="~@/assets/icon_cloud.png" />
        <span class="weather">多云</span>
        <span>20-35℃</span>
      </div>
      <div class="title">
        <img style="width: 64rem" src="~@/assets/logo.png" />
        <img style="width: 628rem" src="~@/assets/宁波高速交警支队数据管理驾驶舱.png" />
      </div>
      <div class="date-right">
        <span class="day">{{ dayValue }}</span>
        <span class="h-m-s">{{ timeValue }}</span>
      </div>
    </div>
    <div class="left-bar">
      <!-- 1 -->
      <div class="left-bar__item1">
        <div class="title-row"></div>
        <!-- <img style="width: 611rem" src="~@/assets/Title_出入甬流量分析.png" /> -->
        <div class="left-bar__item1__flex">
          <div class="car-in-num">
            <img src="~@/assets/gif/icon_in.gif" />
            <div class="car-in-num__right">
              <div class="label">当前入甬流量（辆次）</div>
              <!-- <div class="num">3,123,213</div> -->
              <animate-number mode="manual" class="num" ref="myNum1" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />
            </div>
          </div>
          <div class="car-out-num">
            <img src="~@/assets/gif/icon_out.gif" />
            <div class="car-in-num__right">
              <div class="label">当前出甬流量（辆次）</div>
              <animate-number mode="manual" class="num" ref="myNum2" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />
            </div>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div class="left-bar__item2">
        <img style="width: 196rem; margin: 7rem 0" src="~@/assets/Title_市际卡口流量.png" />
        <br />
        <img style="padding-left: 28rem" src="~@/assets/icon-title.png" />
        <div class="left-chart1"></div>
      </div>
      <!-- 3 -->
      <div class="left-bar__item3">
        <img style="width: 167rem" src="~@/assets/Title_收费站流量.png" />
        <div class="left-chart2"></div>
      </div>
      <!-- 4 -->
      <div class="left-bar__item4">
        <img style="width: 394rem" src="~@/assets/Title_“两客一危一货”出入甬流量.png" />
        <div class="legend-icon">
          <div class="red-icon">
            <div class="icon">两客一危一货重入甬流量（辆次）</div>
            <animate-number class="num" mode="manual" ref="myNum3" from="0" to="0" :formatter="formatter" duration="2000" easing="easeOutQuad" />
          </div>
          <div class="blue-icon">
            <div class="icon">两客一危一货重出甬流量（辆次）</div>
            <animate-number class="num" mode="manual" ref="myNum4" from="0" to="0" :formatter="formatter" duration="2000" easing="easeOutQuad" />
          </div>
        </div>
        <div class="left-chart3"></div>
      </div>
    </div>
    <img style="width: 260rem; position: absolute; top: 120rem; left: 50%; transform: translateX(-50%)" src="~@/assets/Group6572.png" />
    <img style="position: absolute; top: 172rem; left: 50%; transform: translateX(-50%)" src="~@/assets/icon-title.png" />
    <div class="center-bar">
      <div v-for="(item, i) in mapList" :key="i" :class="['map-icon', item.class]">
        <img src="~@/assets/gif/icon_point.gif" />
        <div class="out-title">
          <span class="label">入甬</span><span class="num">{{ formatter(item.inNum) }}</span>
        </div>
        <div class="in-title">
          <span class="label">出甬</span><span class="num">{{ formatter(item.outNum) }}</span>
        </div>
      </div>
    </div>
    <div class="right-bar">
      <div class="right-bar__item1">
        <img style="width: 295rem" src="~@/assets/Title_收费站流量排名.png" />
        <div class="list-title">
          <span>收费站</span>
          <span>流量</span>
        </div>
        <div class="list-item" v-for="(item, index) in list1" :key="index">
          <div class="item-left">
            <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
            <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
            <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
            <span class="rank-num" v-else>{{ item.rank }}</span>
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="item-right">
            <span class="num">{{ item.num }}</span>
            <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
            <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
            <img v-else src="~@/assets/icon_hold.png" />
          </div>
        </div>
      </div>
      <div class="vertical-bar1"></div>
      <div class="right-bar__item2">
        <img style="width: 295rem" src="~@/assets/Title_枢纽流量排名.png" />
        <div class="list-title">
          <span>枢纽</span>
          <span>流量</span>
        </div>
        <div class="list-item" v-for="(item, index) in list2" :key="index">
          <div class="item-left">
            <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
            <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
            <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
            <span class="rank-num" v-else>{{ item.rank }}</span>
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="item-right">
            <span class="num">{{ item.num }}</span>
            <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
            <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
            <img v-else src="~@/assets/icon_hold.png" />
          </div>
        </div>
      </div>
      <div class="right-bar__item3">
        <img style="width: 295rem" src="~@/assets/Title_重点路段断面流量排行.png" />
        <div class="list-title">
          <span>路段名称</span>
          <span>断面流量</span>
        </div>
        <div class="roll-box">
          <div id="box1" :class="isHover1 ? 'animation-stop' : 'animation-start'">
            <div class="list-item" v-for="(item, index) in list3" :key="index">
              <div class="item-left">
                <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
                <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
                <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
                <span class="rank-num" v-else>{{ item.rank }}</span>
                <span class="name">{{ item.name }}</span>
              </div>
              <div class="item-right">
                <span class="num">{{ item.num }}</span>
                <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
                <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
                <img v-else src="~@/assets/icon_hold.png" />
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div id="box2" :class="isHover1 ? 'animation-stop' : 'animation-start'">
            <div class="list-item" v-for="(item, index) in list3" :key="index">
              <div class="item-left">
                <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
                <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
                <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
                <span class="rank-num" v-else>{{ item.rank }}</span>
                <span class="name">{{ item.name }}</span>
              </div>
              <div class="item-right">
                <span class="num">{{ item.num }}</span>
                <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
                <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
                <img v-else src="~@/assets/icon_hold.png" />
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div class="vertical-bar2"></div>
      <div class="right-bar__item4">
        <img style="width: 295rem" src="~@/assets/Title_重点路段通行压力排行.png" />
        <div class="list-title">
          <span>路段名称</span>
          <span>车道平均流量</span>
        </div>
        <div class="roll-box">
          <div id="box3" :class="isHover2 ? 'animation-stop' : 'animation-start'">
            <div class="list-item" v-for="(item, index) in list4" :key="index">
              <div class="item-left">
                <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
                <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
                <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
                <span class="rank-num" v-else>{{ item.rank }}</span>
                <span class="name">{{ item.name }}</span>
              </div>
              <div class="item-right">
                <span class="num">{{ item.num }}</span>
                <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
                <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
                <img v-else src="~@/assets/icon_hold.png" />
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div id="box4" :class="isHover2 ? 'animation-stop' : 'animation-start'">
            <div class="list-item" v-for="(item, index) in list4" :key="index">
              <div class="item-left">
                <img v-if="item.rank == 1" src="~@/assets/icon_top1.png" />
                <img v-else-if="item.rank == 2" src="~@/assets/icon_top2.png" />
                <img v-else-if="item.rank == 3" src="~@/assets/icon_top3.png" />
                <span class="rank-num" v-else>{{ item.rank }}</span>
                <span class="name">{{ item.name }}</span>
              </div>
              <div class="item-right">
                <span class="num">{{ item.num }}</span>
                <img v-if="item.change == 'up'" src="~@/assets/icon_up.png" />
                <img v-else-if="item.change == 'down'" src="~@/assets/icon_down.png" />
                <img v-else src="~@/assets/icon_hold.png" />
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import axios from "axios"
// const apiUrl = "https://cube.yucekj.com/api/cubeMockApi/getContent?bizCode="
const apiUrl = "/api/cubeMockApi/getContent?bizCode="
const PLACE_NAME = ["G1512甬金", "G9211甬舟", "G15甬台温", "G15沈海跨海大桥", "G92杭甬", "G1523甬莞"]
const CHANGE_MAP = new Map([
  ["上升", "up"],
  ["下降", "down"],
  ["相等", "hold"],
])
export default {
  name: "App",
  data() {
    return {
      dayValue: "",
      timeValue: "",
      list1All: [
        {
          rank: 1,
          name: "观海卫1",
          num: 122,
          change: "hold",
        },
        {
          rank: 2,
          name: "观海卫2",
          num: 15,
          change: "up",
        },
        {
          rank: 3,
          name: "观海卫3",
          num: 133,
          change: "down",
        },
        {
          rank: 4,
          name: "观海卫4",
          num: 11,
          change: "down",
        },
        {
          rank: 5,
          name: "观海卫5",
          num: 111,
          change: "down",
        },
        {
          rank: 6,
          name: "观海卫6",
          num: 111,
          change: "down",
        },
        {
          rank: 7,
          name: "观海卫7",
          num: 111,
          change: "down",
        },
        {
          rank: 8,
          name: "观海卫8",
          num: 111,
          change: "down",
        },
        {
          rank: 9,
          name: "观海卫9",
          num: 111,
          change: "down",
        },
        {
          rank: 10,
          name: "观海卫10",
          num: 111,
          change: "down",
        },
        {
          rank: 11,
          name: "观海卫11",
          num: 111,
          change: "down",
        },
        {
          rank: 12,
          name: "观海卫12",
          num: 111,
          change: "down",
        },
        {
          rank: 13,
          name: "观海卫13",
          num: 111,
          change: "down",
        },
        {
          rank: 14,
          name: "观海卫14",
          num: 111,
          change: "down",
        },
        {
          rank: 15,
          name: "观海卫15",
          num: 111,
          change: "down",
        },
        {
          rank: 16,
          name: "观海卫16",
          num: 111,
          change: "down",
        },
        {
          rank: 17,
          name: "观海卫17",
          num: 111,
          change: "down",
        },
        {
          rank: 18,
          name: "观海卫18",
          num: 111,
          change: "down",
        },
        {
          rank: 19,
          name: "观海卫19",
          num: 111,
          change: "down",
        },
      ],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      mapList: [
        {
          class: "shkhdq",
          name: "G15沈海跨海大桥",
        },
        {
          class: "hy",
          name: "G92杭甬",
        },
        {
          class: "yz",
          name: "G9211甬舟",
        },
        {
          class: "yj",
          name: "G1512甬金",
        },
        {
          class: "ytw",
          name: "G15甬台温",
        },
        {
          class: "yw",
          name: "G1523甬莞",
        },
      ],
      isHover1: true,
      isHover2: true,
    }
  },
  methods: {
    formatter(n = 0) {
      const regex = /\d{1,3}(?=(\d{3})+(\.|$))/g // 替换规则
      n = String(Math.round(n * Math.pow(10, 2))) // 乘100 四舍五入
      let integer = n.substr(0, n.length - 2).replace(regex, "$&,") // 最后两位前的为整数
      // let decimal = n.substr(n.length - 2) // 最后两位为小数
      const result = `${integer || 0}`
      // const result = `${integer || 0}.${decimal}`
      return result
    },
    getKeyframes(keyframesName) {
      let animationList = []
      //通过定义的动画函数名来查询函数
      let styleSheet = document.styleSheets //获取所有样式表
      //定义一个animation来装获得的值
      for (let i = 0; i < styleSheet.length; i++) {
        //遍历循环获取styleSheet
        for (let j = 0; j < styleSheet[i].cssRules.length; j++) {
          //遍历循环获取styleSheet[i].cssRules
          //判断样式名字是否为CSSKeyframesRule
          if (styleSheet[i].cssRules[j].constructor.name === "CSSKeyframesRule") {
            //再判断此时这个动画函数名是否为传入的值
            if (keyframesName === styleSheet[i].cssRules[j].name) {
              //获取此时的cssRules，index，和styleShee
              let animation = {}
              animation.cssRules = styleSheet[i].cssRules[j]
              animation.index = j
              animation.styleSheet = styleSheet[i]
              animationList.push(animation) //返回获取的animation
            }
          }
        }
      }
      return animationList
    },
    initAnimation(length, type) {
      let srcollLength = length + 1
      if (type == 0) {
        let s1List = this.getKeyframes("movetop1")
        let s1 = s1List[0]
        s1List.reverse().forEach(e => {
          e.styleSheet.deleteRule(e.index)
        })
        let box1 = document.querySelector("#box1")
        box1.style.animation = `movetop1 ${srcollLength}s infinite`
        box1.style.animationTimingFunction = `linear`
        s1.styleSheet.insertRule(
          `@keyframes movetop1 {
            from {
                top: 0;
            }
            to {
                top: -${40 * srcollLength}rem;
            }
        }`,
          s1.index,
        )

        let s2List = this.getKeyframes("movetop2")
        let s2 = s2List[0]
        s2List.reverse().forEach(e => {
          e.styleSheet.deleteRule(e.index)
        })
        let box2 = document.querySelector("#box2")
        box2.style.animation = `movetop2 ${srcollLength}s infinite`
        box2.style.animationTimingFunction = `linear`
        box2.style.visibility = "visible"
        s2.styleSheet.insertRule(
          `@keyframes movetop2 {
            from {
                top: ${40 * srcollLength}rem;
            }
            to {
                top: 0;
            }
        }`,
          s2.index,
        )
      } else {
        let s3List = this.getKeyframes("movetop3")
        let s3 = s3List[0]
        s3List.reverse().forEach(e => {
          e.styleSheet.deleteRule(e.index)
        })
        let box3 = document.querySelector("#box3")
        box3.style.animation = `movetop3 ${srcollLength}s infinite`
        box3.style.animationTimingFunction = `linear`
        s3.styleSheet.insertRule(
          `@keyframes movetop3 {
            from {
                top: 0;
            }
            to {
                top: -${40 * srcollLength}rem;
            }
        }`,
          s3.index,
        )

        let s4List = this.getKeyframes("movetop4")
        let s4 = s4List[0]
        s4List.reverse().forEach(e => {
          e.styleSheet.deleteRule(e.index)
        })
        let box4 = document.querySelector("#box4")
        box4.style.animation = `movetop4 ${srcollLength}s infinite`
        box4.style.animationTimingFunction = `linear`
        box4.style.visibility = "visible"
        s4.styleSheet.insertRule(
          `@keyframes movetop4 {
            from {
                top: ${40 * srcollLength}rem;
            }
            to {
                top: 0;
            }
        }`,
          s4.index,
        )
      }
    },
    async getList1() {
      let res = await axios.get(apiUrl + "ningbo_sfzllpl")
      // console.log("收费站流量排行---ningbo_sfzllpl", JSON.parse(res.data.data))
      this.list1 = JSON.parse(res.data.data)
        .sort((a, b) => a.PM - b.PM)
        .map(e => {
          return {
            rank: e.PM,
            name: e.SFZMC,
            num: e.JLS,
            change: CHANGE_MAP.get(e.QS),
          }
        })
    },
    async getList2() {
      let res = await axios.get(apiUrl + "ningbo_snllpm")
      // console.log("枢纽流量排名---ningbo_snllpm", JSON.parse(res.data.data))
      this.list2 = JSON.parse(res.data.data)
        .sort((a, b) => a.PM - b.PM)
        .map(e => {
          return {
            rank: e.PM,
            name: e.SN,
            num: e.JLS,
            change: CHANGE_MAP.get(e.QS),
          }
        })
        .filter(e => e.rank < 6)
    },
    async getList3() {
      let res = await axios.get(apiUrl + "ningbo_zdlddmllph")
      // console.log("重点路段断面流量排行---ningbo_zdlddmllph", JSON.parse(res.data.data))
      this.list3 = JSON.parse(res.data.data)
        .sort((a, b) => a.PM - b.PM)
        .map(e => {
          return {
            rank: e.PM,
            name: e.SSKKMC,
            num: e.LLS,
            change: CHANGE_MAP.get(e.QS),
          }
        })
    },
    async getList4() {
      let res = await axios.get(apiUrl + "ningbo_zyldtxylph")
      // console.log("重要路段通行压力排行---ningbo_zyldtxylph", JSON.parse(res.data.data))
      this.list4 = JSON.parse(res.data.data)
        .sort((a, b) => a.PM - b.PM)
        .map(e => {
          return {
            rank: e.PM,
            name: e.SSKKMC,
            num: e.YLZHZ,
            change: CHANGE_MAP.get(e.QS),
          }
        })
      if (this._timer1) {
        clearInterval(this._timer1)
        clearTimeout(this._timer2)
      }
      this.isHover1 = true
      this.isHover2 = true
      let box1 = document.querySelector("#box1")
      box1.style.animation = ""
      let box2 = document.querySelector("#box2")
      box2.style.animation = ""
      box2.style.visibility = "hidden"
      let box3 = document.querySelector("#box3")
      box3.style.animation = ""
      let box4 = document.querySelector("#box4")
      box4.style.animation = ""
      box4.style.visibility = "hidden"
      await setTimeout(async () => {
        this.initAnimation(this.list3.length, 0)
        this.initAnimation(this.list4.length, 1)
      }, 3000)
      this._timer1 = setInterval(() => {
        this.isHover1 = true
        this.isHover2 = true
        this._timer2 = setTimeout(() => {
          this.isHover1 = false
          this.isHover2 = false
        }, 1000)
      }, 2000)
    },
    async leftChart1() {
      let res = await axios.get(apiUrl + "ningbo_sjkkll")
      // console.log("市际卡口流量---ningbo_sjkkll", JSON.parse(res.data.data))
      let outList = [],
        inList = []
      let list = JSON.parse(res.data.data)

      PLACE_NAME.forEach(name => {
        list.forEach(e => {
          if (name == e.LD && e.FX == "出甬") {
            outList.push(e.SJKKZLL)
          } else if (name == e.LD && e.FX == "入甬") {
            inList.push(e.SJKKZLL)
          }
        })
      })
      // console.log(outList, inList)
      if (!this._myChart1) {
        this._myChart1 = echarts.init(document.querySelector(".left-chart1"))
      }
      // 绘制图表
      let option = {
        grid: {
          top: 10,
          left: 0,
          bottom: 20,
          right: 0,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "rgba(255,255,255, 0.8)",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255, 0.1)",
            },
          },
          data: PLACE_NAME,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(57, 69, 106, 0.2)",
            },
          },
        },
        series: [
          {
            name: "入甬",
            data: inList,
            type: "bar",
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FF4E4F",
              },
              {
                offset: 1,
                color: "rgba(255, 78, 79, 0.1)",
              },
            ]),
            label: {
              show: true,
              position: "top",
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
          {
            name: "出甬",
            data: outList,
            type: "bar",
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#2F64FF",
              },
              {
                offset: 1,
                color: "rgba(47, 100, 255, 0.1)",
              },
            ]),
            label: {
              show: true,
              position: "top",
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        ],
      }
      this._myChart1.setOption(option)
    },
    async leftChart2() {
      let res = await axios.get(apiUrl + "ningbo_sfzll")
      // console.log("收费站流量---ningbo_sfzll", JSON.parse(res.data.data))
      let timeList = JSON.parse(res.data.data).sort((a, b) => {
        return Date.parse(a.SJ) - Date.parse(b.SJ)
      })
      // console.log(dayjs('2022-07-14 3:00:00').format('HH'));
      if (!this._myChart2) {
        this._myChart2 = echarts.init(document.querySelector(".left-chart2"))
      }
      // 绘制图表
      let option = {
        grid: {
          top: 20,
          left: 0,
          bottom: 20,
          right: 0,
        },
        xAxis: {
          type: "category",
          data: timeList.map(e => dayjs(e.SJ).format("HH")),
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255,255,255, 0.8)",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255, 0.1)",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(57, 69, 106, 0.2)",
            },
          },
        },
        series: [
          {
            data: timeList.map(e => e.JLS),
            type: "line",
            smooth: true,
            color: "rgba(47, 100, 255, 1)",
            symbolSize: 8,
            symbol: "circle",
            lineStyle: {
              width: 3,
              color: "rgba(47, 100, 255, 0.5)",
            },
            label: {
              show: true,
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        ],
      }
      this._myChart2.setOption(option)
    },
    async leftChart3() {
      let res1 = await axios.get(apiUrl + "ningbo_lkywcryll")
      // console.log("两客一危出入甬流量---ningbo_lkywcryll", JSON.parse(res1.data.data))
      let outList = [],
        inList = []
      let list = JSON.parse(res1.data.data)
      PLACE_NAME.forEach(name => {
        list.forEach(e => {
          if (name == e.LD && e.FX == "出甬") {
            outList.push(e.LLQH)
          } else if (name == e.LD && e.FX == "入甬") {
            inList.push(e.LLQH)
          }
        })
      })

      let res2 = await axios.get(apiUrl + "ningbo_lkywcrylldj")
      // console.log("两客一危出入甬流量统计---ningbo_lkywcrylldj", JSON.parse(res2.data.data))
      let nums = JSON.parse(res2.data.data)
      this.$nextTick(() => {
        this.$refs.myNum3.reset("0", nums.find(e => e.FX == "入甬").JLS)
        this.$refs.myNum4.reset("0", nums.find(e => e.FX == "出甬").JLS)
        this.$refs.myNum3.start()
        this.$refs.myNum4.start()
      })
      if (!this._myChart3) {
        this._myChart3 = echarts.init(document.querySelector(".left-chart3"))
      }
      // 绘制图表
      let option = {
        grid: {
          top: 0,
          left: 0,
          bottom: 20,
          right: 0,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "rgba(255,255,255, 0.8)",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255, 0.1)",
            },
          },
          data: PLACE_NAME,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "rgba(57, 69, 106, 0.2)",
            },
          },
        },
        series: [
          {
            name: "入甬",
            data: inList,
            type: "bar",
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FF4E4F",
              },
              {
                offset: 1,
                color: "rgba(255, 78, 79, 0.1)",
              },
            ]),
            label: {
              show: true,
              position: "top",
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
          {
            name: "出甬",
            data: outList,
            type: "bar",
            barWidth: 20,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#2F64FF",
              },
              {
                offset: 1,
                color: "rgba(47, 100, 255, 0.1)",
              },
            ]),
            label: {
              show: true,
              position: "top",
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        ],
      }
      this._myChart3.setOption(option)
    },
    computedREM() {
      let change = () => {
        document.documentElement.style.fontSize = document.documentElement.clientHeight / 1080 + "px"
        if (this._myChart1) {
          this._myChart1.resize()
          this._myChart2.resize()
          this._myChart3.resize()
        }
      }
      change()
      window.addEventListener("resize", change, false)
    },
    getTime() {
      this.dayValue = dayjs().locale("zh-cn").format("YYYY.MM.DD dddd")
      this.timeValue = dayjs().format("HH:mm:ss")
      setInterval(() => {
        this.timeValue = dayjs().format("HH:mm:ss")
      }, 1000)
    },
    async getLeftbar1() {
      // 接口格式有问题
      let res = await axios.get(apiUrl + "ningbo_cryllfx")
      // console.log("出入甬流量分析---ningbo_cryllfx", JSON.parse(res.data.data))
      let nums = JSON.parse(res.data.data)
      this.$nextTick(() => {
        this.$refs.myNum1.reset("0", nums.find(e => e.FX == "入甬").JLS)
        this.$refs.myNum2.reset("0", nums.find(e => e.FX == "出甬").JLS)
        this.$refs.myNum1.start()
        this.$refs.myNum2.start()
      })
    },
    async getMapList() {
      let res = await axios.get(apiUrl + "ningbo_cryllts")
      // console.log("出入甬流量态势---ningbo_cryllts", JSON.parse(res.data.data))
      let list = JSON.parse(res.data.data)
      list.forEach(e => {
        this.mapList.forEach(ele => {
          if (e.LD == ele.name && e.FX == "入甬") {
            ele.inNum = e.JLS
          } else if (e.LD == ele.name && e.FX == "出甬") {
            ele.outNum = e.JLS
          }
        })
      })
    },
  },
  async created() {
    this.getTime()
    this.getLeftbar1()
    this.getMapList()
    this.getList1()
    this.getList2()
    await this.getList3()
    await this.getList4()
    await setInterval(async () => {
      this.getLeftbar1()
      this.getMapList()
      this.getList1()
      this.getList2()
      await this.getList3()
      await this.getList4()
    }, 1000 * 60 * 5)
  },
  mounted() {
    this.computedREM()
    this.leftChart1()
    this.leftChart2()
    this.leftChart3()
    setInterval(() => {
      this.leftChart1()
      this.leftChart2()
      this.leftChart3()
    }, 1000 * 60 * 5)
  },
}
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  color: #fff;
  position: relative;
  background: url(~@/assets/Footers.png) center bottom no-repeat, url(~@/assets/bg.png) center no-repeat, #070619;
  .left-bg {
    width: 12rem;
    height: 100vh;
    position: absolute;
    z-index: 1;
    left: 0;
  }
  .right-bg {
    width: 12rem;
    height: 100vh;
    position: absolute;
    z-index: 1;
    right: 0;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 72rem;
    transform: translateY(24px);
    padding: 0 25rem;
    background: url(~@/assets/Header.png) no-repeat;
    background-size: cover;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    font-size: 20rem;
    color: #4d79d1;
    .cloud {
      .weather {
        margin: 0 15rem;
      }
    }
    .title {
      padding-left: 84rem;
    }
    .h-m-s {
      width: 90rem;
      display: inline-block;
      color: #b7c2e6;
      margin-left: 15rem;
      text-align: left;
    }
  }
  .left-bar {
    position: absolute;
    z-index: 2;
    left: 20rem;
    top: 113rem;
    width: 634rem;
    .left-bar__item1 {
      .title-row {
        width: 611rem;
        height: 40rem;
        background: url("~@/assets/Title_出入甬流量分析.png") top center no-repeat;
        background-size: cover;
        margin-bottom: 13rem;
      }
      .left-bar__item1__flex {
        padding-left: 27rem;
        display: flex;
        .car-in-num,
        .car-out-num {
          flex: 1;
          display: flex;
          img {
            width: 72rem;
            margin-right: 12px;
          }
          .car-in-num__right {
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            .label {
              font-size: 16rem;
              color: #989ea8;
            }
            .num {
              font-size: 32rem;
              font-weight: 900;
            }
          }
        }
      }
    }
    .left-bar__item2 {
      // margin-top: 20rem;
      .left-chart1 {
        padding-left: 27rem;
        width: 615rem;
        height: 200rem;
        margin-bottom: 13rem;
      }
    }
    .left-bar__item3 {
      // margin-top: 14rem;
      .left-chart2 {
        padding-left: 27rem;
        width: 615rem;
        height: 200rem;
        margin-bottom: 13rem;
      }
    }
    .left-bar__item4 {
      margin-bottom: 16rem;
      .legend-icon {
        display: flex;
        padding-left: 27rem;
        margin-top: 7rem;
        .red-icon,
        .blue-icon {
          display: inline-block;
          .icon {
            font-size: 14rem;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #989ea8;
            margin-bottom: 4rem;
            &::before {
              content: "";
              display: inline-block;
              width: 10rem;
              height: 10rem;
              background: linear-gradient(180deg, #ff4e4f 0%, rgba(255, 78, 79, 0) 100%);
              border-radius: 8rem;
              margin-right: 5rem;
            }
          }
          .num {
            font-size: 24rem;
            font-family: Gotham-Bold, Gotham;
            font-weight: bold;
            color: #ffffff;
            margin-left: 15rem;
          }
        }
        .blue-icon {
          margin-left: 56rem;
          & .icon::before {
            background: linear-gradient(180deg, #2f64ff 0%, rgba(47, 100, 255, 0) 100%);
          }
        }
      }
      .left-chart3 {
        padding-left: 27rem;
        width: 615rem;
        height: 200rem;
      }
    }
  }
  .center-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    height: 752px;
    padding-top: 20rem;
    img {
      display: block;
      margin: 0 auto;
    }
    .map-icon {
      display: inline-block;
      position: absolute;
      img {
        display: inline-block;
        margin: 0;
        width: 56rem;
      }
      .out-title {
        display: inline-block;
        transform: translateX(-32rem);
        .num {
          background: rgba(255, 78, 79, 0.6);
        }
      }
      .in-title {
        transform: translate(60rem, -13rem);
        .num {
          background: rgba(47, 100, 255, 0.6);
        }
      }
      .label {
        display: inline-block;
        font-size: 12rem;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #fff;
        padding: 2rem 4rem;
        background: rgba(0, 0, 0, 0.8);
      }
      .num {
        display: inline-block;
        font-size: 12rem;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        padding: 2rem 8rem;
      }
    }

    .shkhdq {
      top: 23%;
      left: 25%;
    }

    .hy {
      top: 34%;
      left: -2%;
    }

    .yz {
      top: 35%;
      left: 62%;
    }

    .yj {
      top: 58%;
      left: 10%;
    }

    .ytw {
      top: 81%;
      left: 21%;
    }

    .yw {
      top: 87%;
      left: 48%;
    }
  }
  .right-bar {
    position: absolute;
    z-index: 2;
    right: 20rem;
    top: 113rem;
    width: 631rem;
    .vertical-bar1 {
      display: inline-block;
      margin: 65rem 0 0 10rem;
      height: 225rem;
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(0, 64, 253, 0), rgba(47, 100, 255, 0.6), rgba(0, 64, 253, 0)) 1 1;
    }
    .vertical-bar2 {
      display: inline-block;
      margin: 35rem 0 0 10rem;
      height: 534rem;
      border: 1px solid;
      border-image: linear-gradient(180deg, rgba(0, 64, 253, 0), rgba(47, 100, 255, 0.6), rgba(0, 64, 253, 0)) 1 1;
    }
    [class^="right-bar__item"] {
      vertical-align: top;
      display: inline-block;
      width: 300rem;
      .list-title {
        display: flex;
        justify-content: space-between;
        color: rgba(152, 158, 168, 0.53);
        font-size: 16rem;
        margin: 0 0 7rem 33rem;
      }
      .list-item {
        height: 40rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16rem;
        color: rgba(255, 255, 255, 0.6);
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        .item-left {
          padding-left: 35rem;
          display: flex;
          align-items: center;
          img {
            width: 16rem;
          }
          .rank-num {
            display: inline-block;
            width: 16rem;
            height: 16rem;
            line-height: 16rem;
            text-align: center;
          }
          .name {
            margin-left: 12rem;
            display: inline-block;
            width: 140px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          img {
            width: 16rem;
            margin-left: 5rem;
          }
        }
      }
    }
    .right-bar__item1,
    .right-bar__item2 {
      margin-bottom: 25rem;
      min-height: 332rem;
    }
    .right-bar__item3,
    .right-bar__item4 {
      .roll-box {
        position: relative;
        overflow: hidden;
        height: 477rem;
        margin-top: 10rem;
        .line {
          width: 265rem;
          margin: 19rem 0 19rem 38rem;
          border: 1rem solid;
          border-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0)) 1 1;
        }
        #box1,
        #box2,
        #box3,
        #box4 {
          position: absolute;
          width: 100%;
        }
        /* #box1 {
          animation: movetop1 20s infinite;
          animation-timing-function: linear;
        }
        #box2 {
          animation: movetop2 20s infinite;
          animation-timing-function: linear;
        } */
        .animation-stop {
          animation-play-state: paused !important;
        }
        .animation-start {
          animation-play-state: running !important;
        }
      }
    }
  }
}
@keyframes movetop1 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
@keyframes movetop2 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
@keyframes movetop3 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
@keyframes movetop4 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
</style>
