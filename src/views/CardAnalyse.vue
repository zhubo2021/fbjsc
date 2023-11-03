<template>
  <div v-show="dialogShow" class="dialog4">
    <div class="dialog_title">车流态势</div>
    <div class="dialog_content">
      <div>
        <TitleSub name="进入朱家尖车辆来源" />
        <div class="radar-chart5"></div>
        <TitleSub name="朱家尖车辆迁移指数" />
        <div class="table_move">
          <!-- <div class="table_one">
            <div class="btns">
              <div :class="['btn1', { isAcitve: tableTab == '0' }]" @click="tabChange('0')">迁入</div>
              <div :class="['btn2', { isAcitve: tableTab == '1' }]" @click="tabChange('1')">迁出</div>
            </div>
            <div class="migration">
              迁移指数:<span>{{ tableData.length > 0 ? tableData[0].migrate_index : "0" }}</span>
            </div>
          </div> -->
          <div class="table_two">
            <div class="table_th">
              <div class="th_one">序号</div>
              <div class="th_two">路线</div>
              <div class="th_three">迁入比例</div>
            </div>
            <div class="roll-box">
              <div id="box1">
                <div class="table_td" v-for="(item, i) in tableData1" :key="i">
                  <div class="td_one">
                    <div class="table_icon"></div>
                    {{ item.index }}
                  </div>
                  <div class="td_two">{{ item.path }}</div>
                  <div class="td_three">{{ item.ratio }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TitleSub name="进入舟山西车辆来源" />
        <div class="radar-chart2"></div>
        <TitleSub name="舟山西车辆迁移指数" />
        <div class="table_move">
          <!-- <div class="table_one">
            <div class="btns">
              <div :class="['btn1', { isAcitve: tableTab == '0' }]" @click="tabChange('0')">迁入</div>
              <div :class="['btn2', { isAcitve: tableTab == '1' }]" @click="tabChange('1')">迁出</div>
            </div>
            <div class="migration">
              迁移指数:<span>{{ tableData.length > 0 ? tableData[0].migrate_index : "0" }}</span>
            </div>
          </div> -->
          <div class="table_two">
            <div class="table_th">
              <div class="th_one">序号</div>
              <div class="th_two">路线</div>
              <div class="th_three">迁入比例</div>
            </div>
            <div class="roll-box">
              <div id="box2">
                <div class="table_td" v-for="(item, i) in tableData2" :key="i">
                  <div class="td_one">
                    <div class="table_icon"></div>
                    {{ item.index }}
                  </div>
                  <div class="td_two">{{ item.path }}</div>
                  <div class="td_three">{{ item.ratio }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="close_btn" @click="closeHandle">
      <div class="btn_left"></div>
      <div class="btn_center">关闭</div>
      <div class="btn_right"></div>
    </div>
  </div>
</template>

<script>
import TitleSub from "../TitleSub.vue"
import * as echarts from "echarts"

export default {
  components: { TitleSub },
  props: ["dialogShow", "radarData", "tableData1","tableData2"],
  /* computed: {
    tableData1() {
      return this.tableData.filter(e => e.kk_type == 7)
    },
    tableData2() {
      return this.tableData.filter(e => e.kk_type == 1)
    },
  }, */
  data() {
    return {}
  },
  methods: {
    closeHandle() {
      this.$emit("close")
    },
    radarChart() {
      let maxObj = this.radarData
        .filter(e => e.kk_type == 1)
        .reduce((max, currentObj) => {
          return currentObj.kk_flow > max.kk_flow ? currentObj : max
        })
      let option = {
        color: "#0D79D3",
        tooltip: {
          trigger: "axis",
        },
        radar: [
          {
            /* indicator: [
              { text: `本市: ${this.radarData[0].flow_rate}`, max: maxObj.kk_flow },
              { text: `省内\n(非舟): ${this.radarData[1].flow_rate}`, max: maxObj.kk_flow },
              { text: `苏沪: ${this.radarData[2].flow_rate}`, max: maxObj.kk_flow },
              { text: `其他: ${this.radarData[3].flow_rate}`, max: maxObj.kk_flow },
            ], */
            indicator: this.radarData
              .filter(e => e.kk_type == 1)
              .map(e => {
                return { text: `${e.car_type}: ${e.flow_rate}`, max: maxObj.kk_flow }
              }),
            center: ["46%", "50%"],
            radius: 80,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"],
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
          },
        ],
        series: [
          {
            name: "车辆来源",
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: [
              {
                value: this.radarData.filter(e => e.kk_type == 1).map(e => e.kk_flow),
                // name: "A Software",
                areaStyle: {
                  color: "rgba(13, 121, 211, 0.6)",
                },
              },
            ],
          },
        ],
      }
      if (!this._myChart_radar2) {
        this._myChart_radar2 = echarts.init(document.querySelector(".radar-chart2"))
      }
      this._myChart_radar2.setOption(option)
    },
    radarChart2() {
      let maxObj = this.radarData
        .filter(e => e.kk_type == 7)
        .reduce((max, currentObj) => {
          return currentObj.kk_flow > max.kk_flow ? currentObj : max
        })
      let option = {
        color: "#0D79D3",
        tooltip: {
          trigger: "axis",
        },
        radar: [
          {
            /* indicator: [
              { text: `本市: ${this.radarData[0].flow_rate}`, max: maxObj.kk_flow },
              { text: `省内\n(非舟): ${this.radarData[1].flow_rate}`, max: maxObj.kk_flow },
              { text: `苏沪: ${this.radarData[2].flow_rate}`, max: maxObj.kk_flow },
              { text: `其他: ${this.radarData[3].flow_rate}`, max: maxObj.kk_flow },
            ], */
            indicator: this.radarData
              .filter(e => e.kk_type == 7)
              .map(e => {
                return { text: `${e.car_type}: ${e.flow_rate}`, max: maxObj.kk_flow }
              }),
            center: ["46%", "50%"],
            radius: 80,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            splitArea: {
              areaStyle: {
                color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"],
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
          },
        ],
        series: [
          {
            name: "车辆来源",
            type: "radar",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {},
            data: [
              {
                value: this.radarData.filter(e => e.kk_type == 7).map(e => e.kk_flow),
                // name: "A Software",
                areaStyle: {
                  color: "rgba(13, 121, 211, 0.6)",
                },
              },
            ],
          },
        ],
      }
      if (!this._myChart_radar5) {
        this._myChart_radar5 = echarts.init(document.querySelector(".radar-chart5"))
      }
      this._myChart_radar5.setOption(option)
    },
    getTableList() {
      this.setAnimationList(
        "#box2",
        "movetop2",
        this.tableData2,
      )
    },
    getTableList2() {
      this.setAnimationList(
        "#box1",
        "movetop1",
        this.tableData1,
      )
    },
    setAnimationList(domId, keyframesName, list) {
      let dom = document.querySelector(domId)
      dom.style.animation = ""
      this.initAnimation(list.length, dom, keyframesName)
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
    initAnimation(length, dom, name) {
      let srcollLength = length / 3
      let s1List = this.getKeyframes(name)
      let s1 = s1List[0]
      s1List.reverse().forEach(e => {
        e.styleSheet.deleteRule(e.index)
      })
      dom.style.animation = `${name} ${srcollLength * 4 + 1}s linear infinite`
      let str = ""
      for (let index = 0; index < srcollLength * 4 + 2; index++) {
        if (index % 2 == 0) {
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(30 * index) / 2}rem; }\n`
        } else {
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(30 * (index - 1)) / 2}rem; }\n`
        }
        // console.log(str);
      }
      // console.log(str)
      let keyframes = `@keyframes ${name} {` + str + `}`
      s1.styleSheet.insertRule(keyframes, s1.index)
      /* s1.styleSheet.insertRule(
        `@keyframes ${name} {
            from {
                top: 0;
            }
            to {
                top: -${40 * srcollLength}rem;
            }
        }`,
        s1.index,
      ) */
      /* setTimeout(()=>{
        dom.style.animation = ""
      },srcollLength * 1000 ) */
    },
  },
  watch: {
    radarData() {
      this.$nextTick(() => {
        this.radarChart()
        this.radarChart2()
      })
    },
    tableData1() {
      this.$nextTick(() => {
        this.getTableList()
        this.getTableList2()
      })
    },
  },
  mounted() {},
}
</script>

<style lang="less">
.dialog4 {
  position: absolute;
  top: 184rem;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%);
  width: 1093rem;
  height: 751rem;
  background: url(~@/assets/daliuliang/dialog.png) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog_title {
    font-size: 42rem;
    font-family: newFont;
    padding: 6rem 20rem 26rem 0;
  }
  .dialog_content {
    width: 867rem;
    height: 580rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .stop_car {
      zoom: 1.5;
      font-size: 20rem;
      font-family: newFont;
      .label_title {
        margin-top: 10rem;
      }
      .stop_card {
        display: inline-block;
        font-size: 16rem;
        width: 165rem;
        height: 55rem;
        background: url(~@/assets/daliuliang/stop_card1.svg) center/contain no-repeat, url(~@/assets/daliuliang/stop_card2.svg) left/69rem 64rem no-repeat;
        .label_one {
          text-align: right;
          padding: 5rem 10rem 0 0;
        }
        .label_two {
          font-size: 18rem;
          text-align: right;
          padding: 0 10rem 0 0;
        }
      }
    }
    .table_move {
      zoom: 1.5;
      width: 350rem;
      padding-right: 26rem;
      .table_one {
        margin: 10rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btns {
          display: flex;
          .btn1,
          .btn2 {
            margin-right: 10rem;
            width: 56rem;
            height: 25rem;
            line-height: 25rem;
            text-align: center;
            cursor: pointer;
            background: url(~@/assets/daliuliang/btn1.png) center/contain no-repeat;
          }
          .isAcitve {
            background: url(~@/assets/daliuliang/btn2.png) center/contain no-repeat;
          }
        }
        .migration {
          padding: 5rem 15rem;
          background-color: rgba(18, 137, 221, 0.3);
          span {
            font-family: newFont;
            padding-left: 5rem;
          }
        }
      }
      .table_two {
        overflow: hidden;
        height: 180rem;
        .table_th {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30rem;
          & > div {
            text-align: center;
          }
          .th_one {
            width: 50rem;
          }
          .th_two {
            width: 50rem;
            text-align: left;
          }
        }
        .roll-box {
          position: relative;
          overflow: hidden;
          height: 150rem;
          .table_td {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 30rem;

            & > div {
              text-align: center;
            }
            .td_one {
              display: flex;
              align-items: center;
              .table_icon {
                display: inline-block;
                background: url(~@/assets/daliuliang/table-icon.png) center/30rem no-repeat;
                width: 30rem;
                height: 30rem;
              }
            }
            .td_two {
              width: 100rem;
              margin-left: 37rem;
              text-align: left;
            }
          }
          .table_td:nth-of-type(even) {
            background: rgba(25, 214, 255, 0.1);
          }
          #box1,
          #box2 {
            position: absolute;
            width: 100%;
          }
          .animation-stop {
            animation-play-state: paused !important;
          }
          .animation-start {
            animation-play-state: running !important;
          }
        }
      }
    }
    .bar-chart {
      width: (350 * 1.5rem);
      height: (180 * 1.5rem);
    }
  }
  .close_btn {
    margin-top: 20rem;
    height: 45rem;
    line-height: 45rem;
    font-family: newFont;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    display: flex;
    .btn_left {
      width: 35rem;
      height: 45rem;
      background: url(~@/assets/daliuliang/dialog_left.png) left center/35rem 45rem no-repeat;
    }
    .btn_center {
      font-size: 21rem;
      width: 80rem;
      height: 45rem;
      background: url(~@/assets/daliuliang/dialog_center.png) center/80rem 45rem;
    }
    .btn_right {
      width: 35rem;
      height: 45rem;
      background: url(~@/assets/daliuliang/dialog_right.png) right center/35rem 45rem no-repeat;
    }
  }
  .radar-chart2,
  .radar-chart5 {
    width: 450rem;
    height: 230rem;
  }
}
</style>
