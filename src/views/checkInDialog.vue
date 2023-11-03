<template>
  <div v-show="dialogShow" class="checkInDialog">
    <div class="dialog_title">宾馆入住</div>
    <div class="dialog_content">
      <TitleSub name="入住情况分析" style="margin: 20rem; 0" />
      <div class="in_card">
        <div
          :style="{
            visibility: item.name ? 'visible' : 'hidden',
          }"
          class="card_item"
          v-for="(item, i) in cardList"
          :key="i"
        >
          <div class="card_img">
            <div class="card_pin1"></div>
            <div class="card_pin2"></div>
            <div class="card_pin3"></div>
            <div class="card_pin4"></div>
          </div>
          <div class="card_label">
            <div class="name">入住总数</div>
            <div class="num">3200</div>
          </div>
        </div>
      </div>
      <TitleSub name="入住来源分布" style="margin: 20rem; 0" />
      <div class="chart_card">
        <div class="radar_chart3"></div>
        <div class="pie_chart3"></div>
      </div>
      <TitleSub name="入住客流分布" style="margin: 20rem; 0" />
      <div class="line_chart3"></div>
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
  props: ["dialogShow"],
  data() {
    return {
      cardList: [
        { name: "入住总数", num: 3200 },
        { name: "同比昨日", num: "3%" },
        { name: "环比上周", num: "3%" },
        { name: "", num: 0 },
        { name: "沈家门入住数", num: 1233 },
        { name: "东港入住数", num: 899 },
        { name: "朱家尖入住数", num: 311 },
        { name: "普陀山入住数", num: 311 },
      ],
    }
  },
  methods: {
    closeHandle() {
      this.$emit("close")
    },
    radarChart() {
      const radarData = [
        {
          car_type: "杭州市",
          flow_rate: "12.77%",
          kk_flow: 200,
        },
        {
          car_type: "宁波市",
          flow_rate: "19.16%",
          kk_flow: 300,
        },
        {
          car_type: "温州市",
          flow_rate: "21.43%",
          kk_flow: 325,
        },
        {
          car_type: "嘉兴市",
          flow_rate: "26.83%",
          kk_flow: 420,
        },
        {
          car_type: "金华市",
          flow_rate: "20.44%",
          kk_flow: 320,
        },
      ]
      let maxObj = radarData.reduce((max, currentObj) => {
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
            indicator: radarData.map(e => {
              return { text: `${e.car_type}: ${e.flow_rate}`, max: maxObj.kk_flow }
            }),
            center: ["46%", "50%"],
            radius: 90,
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
                value: radarData.map(e => e.kk_flow),
                // name: "A Software",
                areaStyle: {
                  color: "rgba(13, 121, 211, 0.6)",
                },
              },
            ],
          },
        ],
      }
      // if (!this._myChart_radar3) {
      this._myChart_radar3 = echarts.init(document.querySelector(".radar_chart3"))
      // }
      this._myChart_radar3.setOption(option)
    },
    pieChart() {
      const radarData = [
        {
          name: "杭州市(12.77%)",
          label: "杭州市",
          flow_rate: "12.77%",
          value: 200,
        },
        {
          name: "宁波市(19.16%)",
          label: "宁波市",
          flow_rate: "19.16%",
          value: 300,
        },
        {
          name: "温州市(21.43%)",
          label: "温州市",
          flow_rate: "21.43%",
          value: 325,
        },
        {
          name: "嘉兴市(26.83%)",
          label: "嘉兴市",
          flow_rate: "26.83%",
          value: 420,
        },
        {
          name: "金华市(20.44%)",
          label: "金华市",
          flow_rate: "20.44%",
          value: 320,
        },
      ]
      let option = {
        color: ["#1890FF", "#1EE7E7", "#2F54EB", "#BAE7FF", "#00D68A"],
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} ({d}%)",
          formatter: params => {
            return `${params.marker + " " + params.data.label + " : " + params.data.value + " (" + params.data.flow_rate + ")"} `
          },
        },
        legend: {
          icon: "rect",
          top: "center",
          right: "15%",
          orient: "vertical",
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              // borderRadius: 10,
              borderColor: "#09192E",
              borderWidth: 5,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: radarData,
          },
        ],
      }
      // if (!this._myChart_pin) {
      this._myChart_pin = echarts.init(document.querySelector(".pie_chart3"))
      // }
      this._myChart_pin.setOption(option)
    },
    lineCharts() {
      const mockData = [
        {
          name: "杭州市",
          flow_rate: "12.77%",
          value: [144, 80, 144, 159, 224, 233, 300, 170, 245, 164, 232, 290, 236, 212, 285, 248, 138, 131, 165, 188, 226, 193, 299, 273, 211, 187, 165, 116, 283, 223, 300],
        },
        {
          name: "宁波市",
          flow_rate: "19.16%",
          value: [225, 178, 60, 122, 100, 155, 288, 267, 231, 280, 138, 273, 258, 261, 271, 271, 223, 134, 145, 247, 255, 185, 276, 139, 277, 288, 210, 200, 113, 242, 179],
        },
        {
          name: "温州市",
          flow_rate: "21.43%",
          value: [225, 178, 60, 222, 247, 255, 185, 276, 139, 288, 267, 231, 280, 138, 273, 277, 288, 210, 200, 113, 242, 100, 155, 258, 261, 271, 271, 223, 134, 145, 179],
        },
        {
          name: "嘉兴市",
          flow_rate: "26.83%",
          value: [225, 178, 60, 255, 185, 276, 280, 238, 373, 258, 261, 139, 277, 288, 210, 200, 113, 122, 100, 155, 688, 267, 231, 271, 271, 223, 134, 145, 247, 242, 179],
        },
        {
          name: "金华市",
          flow_rate: "20.44%",
          value: [125, 223, 134, 145, 247, 255, 185, 276, 278, 60, 222, 200, 255, 388, 367, 331, 180, 238, 273, 258, 161, 271, 271, 139, 277, 288, 210, 200, 113, 342, 179],
        },
      ]
      let option = {
        grid: {
          top: 50,
          left: 40,
          bottom: 20,
          right: 0,
        },
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "单位",
          padding: [5, 0, 0, 10],
          textStyle: {
            fontSize: 12,
            color: "#97BED4",
          },
        },
        legend: {
          data: mockData.map(e => e.name),
          icon: "rect",
          itemHeight: 5,
          itemWidth: 15,
          right: "center",
          top: 0,
          textStyle: {
            fontSize: 10,
            color: "#E6FAFF",
          },
        },
        xAxis: {
          type: "category",
          data: [
            "08-24",
            "08-25",
            "08-26",
            "08-27",
            "08-28",
            "08-29",
            "08-30",
            "08-31",
            "09-01",
            "09-02",
            "09-03",
            "09-04",
            "09-05",
            "09-06",
            "09-07",
            "09-08",
            "09-09",
            "09-10",
            "09-11",
            "09-12",
            "09-13",
            "09-14",
            "09-15",
            "09-16",
            "09-17",
            "09-18",
            "09-19",
            "09-20",
            "09-21",
            "09-22",
            "09-23",
            "09-24",
          ],
          axisLabel: {
            color: "#97BED4",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#97BED4",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(151,190,212,0.3)",
            },
          },
        },
        series: [
          {
            name: mockData[0].name,
            data: mockData[0].value,
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(24,144,255)",
            lineStyle: {
              color: "rgba(24,144,255)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(24,144,255,0.6)",
                },
                {
                  offset: 1,
                  color: "rgba(24,144,255,0.1)",
                },
              ]),
            },
          },
          {
            name: mockData[1].name,
            data: mockData[1].value,
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(30,231,231)",
            lineStyle: {
              color: "rgba(30,231,231)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(30,231,231,0.6)",
                },
                {
                  offset: 1,
                  color: "rgba(30,231,231,0.1)",
                },
              ]),
            },
          },
          {
            name: mockData[2].name,
            data: mockData[2].value,
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(47,84,235)",
            lineStyle: {
              color: "rgba(47,84,235)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(47,84,235,0.6)",
                },
                {
                  offset: 1,
                  color: "rgba(47,84,235,0.1)",
                },
              ]),
            },
          },
          {
            name: mockData[3].name,
            data: mockData[3].value,
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(186,231,255)",
            lineStyle: {
              color: "rgba(186,231,255)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(186,231,255,0.6)",
                },
                {
                  offset: 1,
                  color: "rgba(186,231,255,0.1)",
                },
              ]),
            },
          },
          {
            name: mockData[4].name,
            data: mockData[4].value,
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(0,214,138)",
            lineStyle: {
              color: "rgba(0,214,138)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0,214,138,0.6)",
                },
                {
                  offset: 1,
                  color: "rgba(0,214,138,0.1)",
                },
              ]),
            },
          },
        ],
      }
      // if (!this._myChart6) {
      this._myChart6 = echarts.init(document.querySelector(".line_chart3"))
      // }
      this._myChart6.setOption(option)
    },
  },
  mounted() {},
  watch: {
    dialogShow() {
      this.$nextTick(() => {
        this.radarChart()
        this.pieChart()
        this.lineCharts()
      })
    },
  },
}
</script>

<style lang="less">
.checkInDialog {
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
    width: 94%;
    height: 580rem;
    overflow: auto;
    .in_card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .card_item {
        display: flex;
        align-items: center;
        margin: 10rem 20rem;
        .card_label {
          margin-left: 10rem;
          .name {
            font-size: 26rem;
            filter: drop-shadow(rgb(0, 117, 255) 0px 0px 8px);
            margin-bottom: 7rem;
          }
          .num {
            font-size: 30rem;
            filter: drop-shadow(rgb(0, 117, 255) 0px 0px 8px);
            font-weight: 600;
          }
        }
        .card_img {
          position: relative;
          width: 91rem;
          height: 91rem;
          background: url(~@/assets/card1.png) center/cover no-repeat, url(~@/assets/card2.png) center/31rem 31rem no-repeat;
        }
        .card_pin1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 6rem;
          height: 6rem;
          background: #2ef0ff;
          border-radius: 6rem;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 2s;
          animation-name: flicker;
        }
        .card_pin2 {
          position: absolute;
          top: 0;
          right: 0;
          width: 6rem;
          height: 6rem;
          background: #2ef0ff;
          border-radius: 6rem;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 2s;
          animation-name: flicker;
        }
        .card_pin3 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 6rem;
          height: 6rem;
          background: #2ef0ff;
          border-radius: 6rem;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 2s;
          animation-name: flicker;
        }
        .card_pin4 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 6rem;
          height: 6rem;
          background: #2ef0ff;
          border-radius: 6rem;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 2s;
          animation-name: flicker;
        }
      }
    }
    .chart_card {
      display: flex;
      height: 300rem;
      .radar_chart3 {
        flex: 1;
      }
      .pie_chart3 {
        flex: 1;
      }
    }
    .line_chart3 {
      width: 100%;
      height: 300rem;
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
}
@keyframes movetop2 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
</style>
