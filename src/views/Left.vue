<template>
  <div class="left_bar">
    <div class="left_one_container">
      <div class="top_title">
        <span class="title_label">设备利用率 TOP10</span>
        <div class="sort_btns">
          <div :class="{ normal_btn: true, active_btn: sortOne == '1' }" @click="sortChange('sortOne', '1')">最高</div>
          <div :class="{ normal_btn: true, active_btn: sortOne == '2' }" @click="sortChange('sortOne', '2')">最低</div>
        </div>
      </div>
      <div class="left_one_chart"></div>
    </div>
    <div class="left_two_container">
      <div class="top_title">
        <span class="title_label">多次违法车辆 TOP9</span>
        <div class="sort_btns"></div>
      </div>
      <div class="get_out_car">
        <div class="car_item" v-for="(item, i) in carList" :key="i">
          <div class="num">{{ item.num }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="plateId">{{ item.plateId }}</div>
          <div class="dialog_point">
            <div class="dialog_title">
              <span>浙LDA2778</span>
              <span class="pages">
                <div class="page_item" :style="{ background: '#FDE701' }"></div>
                <div class="page_item"></div>
                <div class="page_item"></div>
                <div class="page_item"></div>
              </span>
            </div>
            <div class="dialog_content">
              <div class="content_item">事故地址：事故地址信息</div>
              <div class="content_item">事故时间：2023-11-01 12:22:30</div>
              <div class="content_item">事故当事人：王先生</div>
              <div class="content_item">事故责任车辆信息：浙LDA2778</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left_three_container">
      <div class="top_title">
        <span class="title_label">区域违法排行分布TOP5</span>
        <div class="sort_btns">
          <div :class="{ normal_btn: true, active_btn: sortThree == '1' }" @click="sortChange('sortThree', '1')">最高</div>
          <div :class="{ normal_btn: true, active_btn: sortThree == '2' }" @click="sortChange('sortThree', '2')">最低</div>
        </div>
      </div>
      <div class="select_tabs">
        <div :class="{ tab_item: true, tab_sel: selectThree == '1' }" @click="sortChange('selectThree', '1')">
          <span class="label">全部</span>
          <!-- <span class="num">3213</span> -->
          <animate-number mode="manual" class="num" ref="myNum1" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />
        </div>
        <div :class="{ tab_item: true, tab_sel: selectThree == '2' }" @click="sortChange('selectThree', '2')">
          <span class="label">定海</span>
          <animate-number mode="manual" class="num" ref="myNum2" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />

          <!-- <span class="num">3213</span> -->
        </div>
        <div :class="{ tab_item: true, tab_sel: selectThree == '3' }" @click="sortChange('selectThree', '3')">
          <span class="label">普陀</span>
          <animate-number mode="manual" class="num" ref="myNum3" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />

          <!-- <span class="num">3213</span> -->
        </div>
        <div :class="{ tab_item: true, tab_sel: selectThree == '4' }" @click="sortChange('selectThree', '4')">
          <span class="label">普陀山</span>
          <animate-number mode="manual" class="num" ref="myNum4" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />

          <!-- <span class="num">3213</span> -->
        </div>
        <div :class="{ tab_item: true, tab_sel: selectThree == '5' }" @click="sortChange('selectThree', '5')">
          <span class="label">新城</span>
          <animate-number mode="manual" class="num" ref="myNum5" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />

          <!-- <span class="num">3213</span> -->
        </div>
      </div>
      <div class="left_three_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"

export default {
  data() {
    return {
      sortOne: "1",
      sortThree: "1",
      selectThree: "1",
      carList: [
        { num: 8, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 11, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
      ],
    }
  },
  methods: {
    sortChange(chartType, btnType) {
      this[chartType] = btnType
    },
    formatter(n = 0) {
      const regex = /\d{1,3}(?=(\d{3})+(\.|$))/g // 替换规则
      n = String(Math.round(n * Math.pow(10, 2))) // 乘100 四舍五入
      let integer = n.substr(0, n.length - 2).replace(regex, "$&,") // 最后两位前的为整数
      // let decimal = n.substr(n.length - 2) // 最后两位为小数
      const result = `${integer || 0}`
      // const result = `${integer || 0}.${decimal}`
      return result
    },
    getChart1() {
      const offsetX = 10 //bar宽
      const offsetY = 5 // 顶部菱形倾斜角度 (bar宽度的一半)
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y] // 左侧面 右上点
          const c1 = [shape.x - offsetX, shape.y - offsetY + 5] // 左侧面  左上点
          const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY + 5] // 左侧面 左下点
          const c3 = [xAxisPoint[0], xAxisPoint[1] + 5] // 左侧面 右下点
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        },
      })
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint
          const c1 = [shape.x, shape.y] //右侧面左上点
          const c2 = [xAxisPoint[0], xAxisPoint[1] + 5] //右侧面 左下点
          const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY + 5] //右侧面  右下点
          const c4 = [shape.x + offsetX, shape.y - offsetY + 5] //右侧面 右上点
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        },
      })
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y + 5] //顶部菱形下点
          const c2 = [shape.x + offsetX, shape.y - offsetY + 5] //顶部菱形右点
          const c3 = [shape.x, shape.y - offsetX + 5] //顶部菱形上点
          const c4 = [shape.x - offsetX, shape.y - offsetY + 5] //顶部菱形左点
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        },
      })
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft)
      echarts.graphic.registerShape("CubeRight", CubeRight)
      echarts.graphic.registerShape("CubeTop", CubeTop)
      let xAxisData = ["定海大道A口", "定海大道B口", "定海大道C口", "定海大道D口", "定海大道E口", "定海大道F口", "定海大道G口", "定海大道H口", "定海大道I口", "定海大道J口"]
      let seriesData = [20, 45, 80, 46, 57, 94, 54, 35, 66, 14]
      let seriesData2 = [202, 425, 80, 46, 57, 94, 54, 35, 66, 14]
      // 蓝色渐变
      let colorArr = [
        ["rgba(0, 114, 221, 1)", "rgba(129, 228, 255, 1)"],
        ["rgba(0, 147, 221, 1)", "rgba(0, 88, 255, 0.2)"],
        ["rgba(0, 107, 188, 1)", "rgba(1, 56, 222, 0.2)"],
      ]
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          position: ["100%", "0%"],
          formatter: function (params, ticket, callback) {
            console.log("params", params)
            const item = params[0]
            let bg = require("@/assets/fbjsc/tankuang_head.png")
            let dom = `
            <div 
              style="
              background: url(${bg}) top center/contain no-repeat, #000;
              width: 339rem;
              border-bottom: 2rem solid #00a2ff;">
              <div
                style="display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left: 25rem;
                padding-right: 10rem;
                height: 49rem;
                color: #fff;
                font-size: 18rem;
                font-weight: 600;"
              >
                <span>${item.name}</span>
                <span style="">
                  ${item.value}%
                </span>
              </div>
              <div 
                style="padding: 10rem;
                gap: 5rem;
                display: flex;
                color: #fff;
                flex-direction: column;"
              >
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                采集数量：123123213</div>
                <div 
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  正式违法数量：123123123</div>
              </div>
            </div>
            `

            /* dom = `
             <div
             style="
              background: url(${bg}) top center/contain no-repeat, rgba(8, 12, 23, 0.78);width: 339rem;border-bottom: 2rem solid #00a2ff;
             ">
              ${item.name}
              </div>
            ` */
            // return item.name + " : " + item.value
            return dom
          },
        },
        grid: {
          left: "0%",
          right: "0",
          top: "5%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            interval: 0,
            color: "rgba(255, 255, 255, 0.6)",
            // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
            /* formatter: function (value) {
              const length = value.length
              if (length > 3) {
                const start = Math.floor(length / 2)
                const str = value.slice(0, start) + "\n" + value.slice(start, length)
                return str
              }
              return value
            }, */
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          // y轴（竖直线）
          axisLine: {
            show: false,
          },
          // y轴横向 标线
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.16)",
            },
          },
          // y轴刻度线
          axisTick: {
            show: false,
          },
          // y轴文字
          axisLabel: {
            fontSize: 14,
            color: "#fff",
            formatter: function (value) {
              return value + "%"
            },
          },
        },
        series: [
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              return {
                type: "group",
                children: [
                  // 左侧面
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[1][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[1][1],
                        },
                      ]),
                    },
                  },
                  // 右侧面
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[2][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[2][1],
                        },
                      ]),
                    },
                  },
                  // 顶部
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[0][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[0][1],
                        },
                      ]),
                    },
                  },
                ],
              }
            },
            data: seriesData,
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: seriesData,
          },
        ],
      }

      if (!this._myChart1) {
        this._myChart1 = echarts.init(document.querySelector(".left_one_chart"))
      }
      this._myChart1.setOption(option)
    },
    getChart2() {
      const offsetX = 10 //bar宽
      const offsetY = 5 // 顶部菱形倾斜角度 (bar宽度的一半)
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y] // 左侧面 右上点
          const c1 = [shape.x - offsetX, shape.y - offsetY + 5] // 左侧面  左上点
          const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY + 5] // 左侧面 左下点
          const c3 = [xAxisPoint[0], xAxisPoint[1] + 5] // 左侧面 右下点
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        },
      })
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint
          const c1 = [shape.x, shape.y] //右侧面左上点
          const c2 = [xAxisPoint[0], xAxisPoint[1] + 5] //右侧面 左下点
          const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY + 5] //右侧面  右下点
          const c4 = [shape.x + offsetX, shape.y - offsetY + 5] //右侧面 右上点
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        },
      })
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y + 5] //顶部菱形下点
          const c2 = [shape.x + offsetX, shape.y - offsetY + 5] //顶部菱形右点
          const c3 = [shape.x, shape.y - offsetX + 5] //顶部菱形上点
          const c4 = [shape.x - offsetX, shape.y - offsetY + 5] //顶部菱形左点
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        },
      })
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft)
      echarts.graphic.registerShape("CubeRight", CubeRight)
      echarts.graphic.registerShape("CubeTop", CubeTop)
      let xAxisData = ["闯红灯", "未系安全带", "非法停车", "禁闯", "占用车道"]
      let seriesData = [20, 45, 60, 10, 20]
      // 蓝色渐变
      let colorArr = [
        ["rgba(0, 114, 221, 1)", "rgba(129, 228, 255, 1)"],
        ["rgba(0, 147, 221, 1)", "rgba(0, 88, 255, 0.2)"],
        ["rgba(0, 107, 188, 1)", "rgba(1, 56, 222, 0.2)"],
      ]
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params, ticket, callback) {
            const item = params[1]
            return item.name + " : " + item.value
          },
        },
        grid: {
          left: "0%",
          right: "0",
          top: "5%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 14,
            interval: 0,
            color: "#fff",
            // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
            /* formatter: function (value) {
              const length = value.length
              if (length > 3) {
                const start = Math.floor(length / 2)
                const str = value.slice(0, start) + "\n" + value.slice(start, length)
                return str
              }
              return value
            }, */
            // rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          // y轴（竖直线）
          axisLine: {
            show: false,
          },
          // y轴横向 标线
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.16)",
            },
          },
          // y轴刻度线
          axisTick: {
            show: false,
          },
          // y轴文字
          axisLabel: {
            fontSize: 14,
            color: "#fff",
            /* formatter: function (value) {
              return value + "%"
            }, */
          },
        },
        series: [
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              return {
                type: "group",
                children: [
                  // 左侧面
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[1][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[1][1],
                        },
                      ]),
                    },
                  },
                  // 右侧面
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[2][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[2][1],
                        },
                      ]),
                    },
                  },
                  // 顶部
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[0][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[0][1],
                        },
                      ]),
                    },
                  },
                ],
              }
            },
            data: seriesData,
          },
          {
            type: "bar",
            label: {
              /* normal: {
                show: true,
                position: "top",
                formatter: e => {
                  return e.value
                },
                fontSize: 16,
                color: "#43C4F1",
                offset: [0, -5],
              }, */
            },
            itemStyle: {
              color: "transparent",
            },
            tooltip: {},
            data: seriesData,
          },
        ],
      }

      if (!this._myChart2) {
        this._myChart2 = echarts.init(document.querySelector(".left_three_chart"))
      }
      this._myChart2.setOption(option)
    },
  },

  created() {
    this.$nextTick(() => {
      this.getChart1()
      this.getChart2()
      ;["123", "523", "1233", "123", "1223"].forEach((e, i) => {
        this.$refs["myNum" + (i + 1)].reset("0", e)
        this.$refs["myNum" + (i + 1)].start()
      })
    })
  },
  mounted() {
    let change = () => {
      if (this._myChart1) {
        setTimeout(() => {
          this._myChart1.resize()
          this._myChart2.resize()
        }, 200)
      }
    }
    window.addEventListener("resize", change) // 固定写法
  },
}
</script>

<style lang="less">
.left_bar {
  position: absolute;
  left: 44rem;
  top: 115rem;

  .left_one_container {
    .left_one_chart {
      margin-top: 20rem;
      margin-bottom: 20rem;
      // border: 1px solid #fff;
      width: 440rem;
      height: 200rem;
    }
  }
  .left_two_container {
    .get_out_car {
      margin-top: 12rem;
      margin-bottom: 20rem;
      display: grid;
      width: 443rem;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: 20rem;
      grid-column-gap: 12rem;
      .car_item {
        cursor: pointer;
        position: relative;
        // width: 140rem;
        height: 58rem;
        background: url(~@/assets/fbjsc/part_bg.png) center/cover no-repeat;
        display: grid;
        grid-template-columns: 38rem 1fr;
        grid-template-rows: 29rem 30rem;
        // grid-row-gap: 16px;
        // grid-column-gap: 13px;
        .num {
          grid-row: 1/3;
          display: grid;
          place-items: center;
          color: #00a2ff;
          font-size: 16rem;
          margin-left: 5rem;
        }
        .name {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12rem;
          text-align: right;
          margin-top: 9rem;
          margin-right: 8rem;
        }
        .plateId {
          font-size: 16rem;
          font-weight: 700;
          color: #fff;
          text-align: left;
          margin-top: 3rem;
          margin-left: 8rem;
        }
        &:hover {
          .dialog_point {
            display: block;
          }
        }
      }
      .car_item:nth-child(-n + 3) {
        .num {
          color: #fde701;
        }
      }
    }
  }
  .left_three_container {
    .select_tabs {
      display: flex;
      margin: 20rem 0;
      .tab_item {
        cursor: pointer;
        padding-right: 7rem;
        width: 91rem;
        height: 40rem;
        background: url(~@/assets/fbjsc/tab_nor.png) center/cover no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #00a2ff;
        .label {
          font-size: 13rem;
          font-weight: 500;
        }
        .num {
          font-size: 17rem;
          font-weight: 900;
        }
      }
      .tab_sel {
        color: #fff;
        background: url(~@/assets/fbjsc/tab_sel.png) center/cover no-repeat;
      }
    }
    .left_three_chart {
      width: 440rem;
      height: 200rem;
      // border: 1px solid #fff;
    }
  }
  .dialog_point {
    display: none;
    position: relative;
    top: -10rem;
    left: 10rem;
    background: url(~@/assets/fbjsc/tankuang_head.png) top center/contain no-repeat, rgba(8, 12, 23, 0.78);
    width: 339rem;
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
      .pages {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6rem;
        .page_item {
          background: #0091ff;
          width: 9rem;
          height: 9rem;
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
.top_title {
  width: 443rem;
  height: 50rem;
  background: url(~@/assets/fbjsc/title.png) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title_label {
    background: linear-gradient(180deg, #ffffff 52.16%, #cde4ff 73.17%, #95ccff 93.75%), linear-gradient(0deg, #ffffff, #ffffff);
    color: transparent;
    box-shadow: 0px 2px 2px 0px #0000004d;
    -webkit-background-clip: text;
    font-size: 24rem;
    font-weight: 500;
    padding-left: 30rem;
  }
  .sort_btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rem;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #00a2ff;
      font-size: 16rem;
      cursor: pointer;
    }
    .normal_btn {
      width: 65rem;
      height: 40rem;
      background: url(~@/assets/fbjsc/btn_nor.png) center/cover no-repeat;
    }
    .active_btn {
      color: #fff;
      background: url(~@/assets/fbjsc/btn_sel.png) center/cover no-repeat;
    }
  }
}
</style>
