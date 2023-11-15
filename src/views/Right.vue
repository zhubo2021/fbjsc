<template>
  <div class="right_bar">
    <div class="right_one_container">
      <div class="top_title">
        <span class="title_label">各区域多发事故情况</span>
        <div class="sort_btns"></div>
      </div>
      <div class="pie_container">
        <div class="right_one_chart"></div>
        <div class="right_chart_legend">
          <div class="legend_item" v-for="(item, i) in threeDdata" :key="i">
            <div class="label">
              <div class="pin" :style="{ background: item.color }"></div>
              <span>{{ item.name }}</span>
            </div>
            <div class="num">
              <span class="percent" :style="{ color: item.color }">{{ item.percent }}</span>
              <span class="line" :style="{ background: item.color }"></span>
              <span class="count">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_two_container">
      <div class="top_title">
        <span class="title_label">设备违法增降趋势分析</span>
        <div class="sort_btns">
          <div :class="{ normal_btn: true, active_btn: sortType == '1' }" @click="sortChange('sortType', '1')">上升</div>
          <div :class="{ normal_btn: true, active_btn: sortType == '2' }" @click="sortChange('sortType', '2')">下降</div>
        </div>
      </div>
      <div class="right_two_chart"></div>
    </div>
    <div class="right_three_container">
      <div class="top_title">
        <span class="title_label">工作量分布情况</span>
        <div class="sort_btns">
          <div :class="{ normal_btn: true, active_btn: filterType == '1' }" @click="sortChange('filterType', '1')">全部</div>
          <div :class="{ normal_btn: true, active_btn: filterType == '2' }" @click="sortChange('filterType', '2')">核对数</div>
          <div :class="{ normal_btn: true, active_btn: filterType == '3' }" @click="sortChange('filterType', '3')">录入数</div>
          <div :class="{ normal_btn: true, active_btn: filterType == '4' }" @click="sortChange('filterType', '4')">录入率</div>
        </div>
      </div>
      <div class="filter_bts">
        <!-- <div class="filter_item filter_active">违法录入总数：{{ threeChartNum[0] }}</div>
        <div class="filter_item">违法核对总数：{{ threeChartNum[1] }}</div> -->
        <div class="filter_item">
          违法录入总数：<span>{{ formatter(threeChartNum[0]) }}</span>
        </div>
        <div class="filter_item">
          违法核对总数：<span>{{ formatter(threeChartNum[1]) }}</span>
        </div>
      </div>
      <div class="right_three_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import axios from "@/axios.js"
let apiUrl = "https://cube.yucekj.com/api/cubeMockApi/getContent?bizCode="
if (process.env.NODE_ENV == "production") {
  apiUrl = "/api/cubeMockApi/getContent?bizCode="
}

export default {
  data() {
    return {
      sortType: "1",
      filterType: "1",
      threeChartNum: [0, 0],
      threeDdata: [
        /*  { name: "普陀区管委", percent: "20%", count: "123.54", color: "#00A2FF" },
        { name: "普陀区", percent: "20%", count: "123.54", color: "#FC2626" },
        { name: "新城区", percent: "20%", count: "123.54", color: "#14D23E" },
        { name: "定海区", percent: "20%", count: "123.54", color: "#ED6701" }, */
      ],
    }
  },
  methods: {
    axiosRquest(path) {
      return axios.get(apiUrl + path)
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
    sortChange(chartType, btnType) {
      this[chartType] = btnType
      if (chartType == "sortType") {
        this.getChart4()
      }
      if (chartType == "filterType") {
        this._myChart5.setOption({
          legend: {
            selected: {
              custom1: btnType == "2" || btnType == "1",
              custom2: btnType == "3" || btnType == "1",
              custom3: btnType == "4",
              bar11: btnType == "2" || btnType == "1",
              bar12: btnType == "3" || btnType == "1",
              bar13: btnType == "4",
            },
          },
        })
      }
    },
    async get3Dpie() {
      let res = await this.axiosRquest("zs_acd_many_area_time_ol")
      // console.log("get3Dpie", res)

      let colorList = ["rgba(0, 162, 255, 1)", "rgba(255, 71, 128, 1)", "rgba(20, 210, 62, 1)", "rgba(237, 103, 1, 1)", "rgba(253, 231, 1, 1)"]
      let data = res.map((e, i) => {
        return {
          name: e.xzqh,
          value: e.sgzb * 100,
          itemStyle: {
            color: colorList[i],
          },
          _value: e.sgzs,
        }
      })
      this.threeDdata = data.map(e => {
        return { name: e.name, percent: e.value + "%", count: e._value, color: e.itemStyle.color }
      })
      if (!this._myChart3) {
        this._myChart3 = echarts.init(document.querySelector(".right_one_chart"), null, { devicePixelRatio: 2 })
      }
      // 传入数据生成 option
      let option = this.getPie3D(
        data,
        0.7, // 圆圈宽度
      )
      if (option) {
        this._myChart3.setOption(option)
        this.initMouse(this._myChart3)
      }
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2

      let startRadian = startRatio * Math.PI * 2
      let endRadian = endRatio * Math.PI * 2
      let midRadian = midRatio * Math.PI * 2

      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false
      }

      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3

      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1

      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u)
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
        },
      }
    },
    initMouse(myChart) {
      if (this.onceFlag) {
        return
      }
      this.onceFlag = true
      let that = { option: { series: myChart.getOption().series } }
      let hoveredIndex = ""
      myChart.on("mouseover", params => {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = that.option.series[hoveredIndex].pieStatus.selected
            isHovered = false
            startRatio = that.option.series[hoveredIndex].pieData.startRatio
            endRatio = that.option.series[hoveredIndex].pieData.endRatio
            k = that.option.series[hoveredIndex].pieStatus.k
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            that.option.series[hoveredIndex].parametricEquation = this.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, 20)
            that.option.series[hoveredIndex].pieStatus.hovered = isHovered
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = ""
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            // console.log(that.option)
            isSelected = that.option.series[params.seriesIndex].pieStatus.selected
            isHovered = true
            startRatio = that.option.series[params.seriesIndex].pieData.startRatio
            endRatio = that.option.series[params.seriesIndex].pieData.endRatio
            k = that.option.series[params.seriesIndex].pieStatus.k
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            that.option.series[params.seriesIndex].parametricEquation = this.getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, 40)
            that.option.series[params.seriesIndex].pieStatus.hovered = isHovered
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(that.option)
        }
      })
    },
    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      let series = []
      let sumValue = 0
      let startValue = 0
      let endValue = 0
      let legendData = []
      let k = typeof internalDiameterRatio !== "undefined" ? (1 - internalDiameterRatio) / (1.5 + internalDiameterRatio) : 1 / 3 // 内径计算

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value

        let seriesItem = {
          name: pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
        }

        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {}

          typeof pieData[i].itemStyle.color != "undefined" ? (itemStyle.color = pieData[i].itemStyle.color) : null
          typeof pieData[i].itemStyle.opacity != "undefined" ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null

          seriesItem.itemStyle = itemStyle
        }
        series.push(seriesItem)
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value
        series[i].pieData.startRatio = startValue / sumValue
        series[i].pieData.endRatio = endValue / sumValue
        series[i].parametricEquation = this.getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, 20)
        startValue = endValue
        legendData.push(series[i].name)
      }

      // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: {
          show: false,
        },
        itemStyle: {
          opacity: 0,
        },
        parametricEquation: {
          u: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },
          v: {
            min: 0,
            max: Math.PI,
            step: Math.PI / 20,
          },
          x: function (u, v) {
            return Math.sin(v) * Math.sin(u) + Math.sin(u)
          },
          y: function (u, v) {
            return Math.sin(v) * Math.cos(u) + Math.cos(u)
          },
          z: function (u, v) {
            return Math.cos(v) > 0 ? 0.1 : -0.1
          },
        },
      })

      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        animation: false,
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          textStyle: {
            color: "#fff",
          },
          formatter: params => {
            if (params.seriesName !== "mouseoutSeries") {
              return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${option.series[params.seriesIndex].pieData.value}% | ${option.series[params.seriesIndex].pieData._value}`
            }
          },
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: 8,
          // 控制饼图大小
          boxDepth: 105,
          boxWidth: 105,
          viewControl: {
            //3d效果可以放大、旋转等，请自己去查看官方配置
            animation: false,
            autoRotate: true,

            alpha: 25, // 上下倾斜角度
            rotateSensitivity: [2, 0], // 旋转  0代表不转
            zoomSensitivity: 0,
            panSensitivity: 0,
            distance: 120,
            center: [0, -20, 0],
          },
          //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
          postEffect: {
            //配置这项会出现锯齿，请自己去查看官方配置有办法解决
            enable: true,
            bloom: {
              enable: true,
              bloomIntensity: 0.1,
            },
            SSAO: {
              enable: true,
            },
          },
        },
        series: series,
      }
      return option
    },
    async getChart4() {
      let path
      if (this.sortType == "1") {
        path = "zs_vio_equip_collect_asc_ol"
      } else {
        path = "zs_vio_equip_collect_desc_ol"
      }
      let res = await this.axiosRquest(path)
      // console.log("getChart4", res)
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
      let xAxisData = res.map(e => e.sbmc)
      let seriesData
      if (this.sortType == "1") {
        seriesData = res.map(e => e.zf * 100)
      } else {
        seriesData = res.map(e => e.jf * 100)
      }
      let seriesData1 = res.map(e => "_" + e.sbbh)
      let seriesData2 = res.map(e => e.ssdd)
      let seriesData3 = res.map(e => e.sblx)

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
          position: ["-80%", "0%"],
          formatter: (params, ticket, callback) => {
            // console.log("params", params)
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
                  ${this.sortType == "1" ? parseInt(item.value) : -parseInt(item.value)}%
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
                设备编号：${params[1].value.slice(1)}</div>
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                设备类型：${params[2].value}</div>
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  所属大队：${params[3].value}</div>
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
            color: "#fff",
            formatter: function (value) {
              const length = value.length
              if (length > 5) {
                const str = value.slice(0, 5) + "..."
                return str
              }
              return value
            },
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
            // show: false,
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
            data: seriesData1,
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            tooltip: {},
            data: seriesData3,
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
            data: seriesData2,
          },
        ],
      }

      if (!this._myChart4) {
        this._myChart4 = echarts.init(document.querySelector(".right_two_chart"))
      }
      this._myChart4.setOption(option)
    },
    async getChart5() {
      let res = await this.axiosRquest("zs_vio_handle_time_ol")
      let res2 = await this.axiosRquest("zs_vio_handle_total_ol")
      // console.log("getChart5", res, res2)
      this.threeChartNum = [res2[0].lrzs, res2[0].hdzs]

      let xaxisData = res.map(e => e.sxr || "-")
      let yaxisData = res.map(e => e.hds || 0)
      let yaxisData2 = res.map(e => e.lrs || 0)
      let yaxisData3 = res.map(e => parseInt(e.lrl * 100) + "%")
      let yaxisData4 = res.map(e => parseInt(e.lrl * 100))
      const offsetX = 8
      const offsetY = 4
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint
          const c0 = [shape.x, shape.y]
          const c1 = [shape.x - offsetX, shape.y - offsetY]
          const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
          const c3 = [xAxisPoint[0], xAxisPoint[1]]
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
          const c1 = [shape.x, shape.y]
          const c2 = [xAxisPoint[0], xAxisPoint[1]]
          const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
          const c4 = [shape.x + offsetX, shape.y - offsetY]
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
          const c1 = [shape.x, shape.y]
          const c2 = [shape.x + offsetX, shape.y - offsetY] //右点
          const c3 = [shape.x, shape.y - offsetX]
          const c4 = [shape.x - offsetX, shape.y - offsetY]
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        },
      })

      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft)
      echarts.graphic.registerShape("CubeRight", CubeRight)
      echarts.graphic.registerShape("CubeTop", CubeTop)

      let colorArr = [
        ["rgba(0, 188, 188, 1)", "rgba(1, 169, 222, 0.2)"],
        ["rgba(0, 208, 221, 1)", "rgba(0, 194, 255, 0.2)"],
        ["rgba(0, 181, 221, 1)", "rgba(165, 255, 255, 1)"],

        ["rgba(0, 147, 221, 1)", "rgba(0, 88, 255, 0.2)"],
        ["rgba(0, 107, 188, 1)", "rgba(1, 56, 222, 0.2)"],
        ["rgba(0, 114, 221, 1)", "rgba(129, 228, 255, 1)"],

        ["rgba(255, 214, 0, 1)", "rgba(255, 138, 0, 0.2)"],
        ["rgba(255, 184, 0, 1)", "rgba(255, 138, 0, 0.2)"],
        ["rgba(255, 138, 0, 1)", "rgba(252, 255, 108, 1)"],
      ]

      let option = {
        // backgroundColor: "black",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          position: ["-80%", "0%"],
          formatter: function (params, ticket, callback) {
            // const item = params[0]
            let item = res.find((e, i) => i == params[0].dataIndex)
            // console.log("params", params, params.dataIndex, item)
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
                <span>${item.sxr}</span>
                <span style="">
                  ${item.hds + item.lrs}
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
                  <span style="display: inline-block; width:8rem;height:8rem;border-radius:8rem;background:rgba(0, 188, 188, 1);margin-right:10rem;"></span>
                  核对数：${item.hds}</div>
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  <span style="display: inline-block; width:8rem;height:8rem;border-radius:8rem;background:rgba(0, 114, 221, 1);margin-right:10rem;"></span>
                  录入数：${item.lrs}</div>
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  <span style="display: inline-block; width:8rem;height:8rem;border-radius:8rem;background:rgba(253, 231, 1, 1);margin-right:10rem;"></span>
                  录入率：${parseInt(item.lrl * 100) + "%"}</div>
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
        legend: {
          show: false,
          selected: {
            custom1: true,
            custom2: true,
            custom3: false,
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
          data: xaxisData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            fontSize: 14,
            color: "#fff",
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
            formatter: value => {
              if (this.filterType == "4") {
                return value + "%"
              }
              return value
            },
          },
        },
        series: [
          /* {
            name: "bar1",
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: yaxisData,
          },
          {
            name: "bar2",
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: yaxisData2,
          },
          {
            name: "bar3",
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: yaxisData3,
          }, */
          {
            name: "custom1",
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              const xAxisPoint = api.coord([api.value(0), 0])
              const distance = 11
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] - distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] - distance, xAxisPoint[1]],
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
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] - distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] - distance, xAxisPoint[1]],
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
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] - distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] - distance, xAxisPoint[1]],
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
                ],
              }
            },
            data: yaxisData,
          },
          {
            name: "custom2",
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              const xAxisPoint = api.coord([api.value(0), 0])
              const distance = 11
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[3][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[3][1],
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[4][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[4][1],
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[5][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[5][1],
                        },
                      ]),
                    },
                  },
                ],
              }
            },
            data: yaxisData2,
          },
          {
            name: "custom3",
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              const xAxisPoint = api.coord([api.value(0), 0])
              const distance = 11
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[6][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[6][1],
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[7][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[7][1],
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0] + distance,
                      y: location[1],
                      xAxisPoint: [xAxisPoint[0] + distance, xAxisPoint[1]],
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: colorArr[8][0],
                        },
                        {
                          offset: 1,
                          color: colorArr[8][1],
                        },
                      ]),
                    },
                  },
                ],
              }
            },

            data: yaxisData4,
          },
        ],
      }
      if (!this._myChart5) {
        this._myChart5 = echarts.init(document.querySelector(".right_three_chart"))
      }
      this._myChart5.setOption(option)
    },
  },
  created() {
    this.$nextTick(() => {
      this.get3Dpie()
      this.getChart4()
      this.getChart5()
    })
  },
  mounted() {
    let change = () => {
      if (this._myChart3) {
        setTimeout(() => {
          this._myChart3.resize()
          this._myChart4.resize()
          this._myChart5.resize()
        }, 200)
      }
    }
    window.addEventListener("resize", change) // 固定写法
  },
}
</script>

<style lang="less">
.right_bar {
  position: absolute;
  right: 44rem;
  top: 115rem;
  background: rgba(16,27,58,0.9);
  .right_one_container {
    .pie_container {
      height: 250rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .right_one_chart {
        width: 280rem;
        height: 160rem;
        // border: 1px solid #fff;
        background: url(~@/assets/fbjsc/bottom3d.png) center 95% / contain no-repeat;
      }
      .right_chart_legend {
        display: flex;
        // align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 160rem;
        height: 100%;
        .legend_item {
          .label {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 14rem;
            font-weight: 500;
            .pin {
              margin-right: 5rem;
              width: 7rem;
              height: 7rem;
              border-radius: 7rem;
              // background: #00a2ff;
            }
          }
          .num {
            display: flex;
            align-items: center;
            // justify-content: center;
            .percent {
              // color: #00a2ff;
              font-size: 18rem;
              font-weight: 400;
            }
            .line {
              margin: 8rem;
              // background: #00a2ff;
              width: 2rem;
              height: 14rem;
            }
            .count {
              color: #c0c0c5;
              font-size: 18rem;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .right_two_container {
    .right_two_chart {
      margin-top: 20rem;
      margin-bottom: 20rem;
      // border: 1px solid #fff;
      width: 440rem;
      height: 200rem;
    }
  }
  .right_three_container {
    .sort_btns {
      gap: 5rem;
      .normal_btn {
        width: 53rem;
        height: 32rem;
        font-size: 14rem;
      }
    }
    .filter_bts {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20rem 10rem;
      gap: 15rem;
      .filter_item {
        // cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200rem;
        height: 40rem;
        color: #00a3ff;
        font-size: 16rem;
        font-weight: 500;
        // background: url(~@/assets/fbjsc/part6_tab_nor.png) center/cover no-repeat;
        span {
          color: #fff;
          font-family: DIN Black;
          font-size: 22px;
          font-weight: 900;
        }
      }
      .filter_active {
        color: #fff;
        background: url(~@/assets/fbjsc/part6_tab_sel.png) center/cover no-repeat;
      }
    }
    .right_three_chart {
      margin-top: 20rem;
      margin-bottom: 20rem;
      // border: 1px solid #fff;
      width: 440rem;
      height: 200rem;
    }
  }
}
</style>
