<template>
  <div class="right_bar">
    <div class="right_one_container">
      <div class="top_title">
        <span class="title_label">各区域多发事故情况</span>
        <div class="sort_btns"></div>
      </div>
      <div class="right_one_chart"></div>
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
        <div class="sort_btns"></div>
      </div>
      <div class="right_three_chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"

export default {
  data() {
    return {
      sortType: "1",
    }
  },
  methods: {
    sortChange(chartType, btnType) {
      this[chartType] = btnType
    },
    getChart4() {
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
      let xAxisData = ["海南大道A线", "海南大道B线", "海南大道C线", "海南大道D线", "海南大道E线"]
      let seriesData = [20, 45, 80, 46, 57]
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

      if (!this._myChart4) {
        this._myChart4 = echarts.init(document.querySelector(".right_two_chart"))
      }
      this._myChart4.setOption(option)
    },
  },
  created() {
    this.$nextTick(() => {
      this.getChart4()
    })
  },
}
</script>

<style lang="less">
.right_bar {
  position: absolute;
  right: 44rem;
  top: 115rem;
  .right_one_container {
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
    .right_three_chart {
      margin-top: 20rem;
      margin-bottom: 20rem;
      border: 1px solid #fff;
      width: 440rem;
      height: 200rem;
    }
  }
}
</style>
