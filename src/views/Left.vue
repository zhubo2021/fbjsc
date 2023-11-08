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
        <div class="car_item" @mouseenter="cardChange(item.children[0])" v-for="(item, i) in carList" :key="i">
          <div class="num">{{ item.num }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="plateId">{{ item.plateId }}</div>
          <div class="dialog_point">
            <div class="dialog_title">
              <span>{{ item.plateId }}</span>
              <span class="pages">
                <div
                  class="page_item"
                  :style="{ background: child.in_rk == currentCard.in_rk ? '#FDE701' : '#0091ff' }"
                  v-for="child in item.children"
                  :key="child.in_rk"
                  @click="cardChange(child)"
                ></div>
              </span>
            </div>
            <div class="dialog_content">
              <div class="content_item">所有人：{{ currentCard.belong }}</div>
              <div class="content_item">电话：{{ currentCard.phone }}</div>
              <div class="content_item">违法行为：{{ currentCard.against }}</div>
              <div class="content_item">违法地点：{{ currentCard.addr }}</div>
              <div class="content_item">违法时间：{{ currentCard.time }}</div>
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
        <div v-for="item in cardThree" :key="item.xh" :class="{ tab_item: true, tab_sel: selectThree == item.xh }" @click="sortChange('selectThree', item.xh)">
          <span class="label">{{ item.xzqhmc }}</span>
          <animate-number mode="manual" class="num" :ref="'myNum' + item.xh" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />
        </div>
      </div>
      <div class="left_three_chart"></div>
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
      sortOne: "1",
      sortThree: "1",
      selectThree: "0",
      cardThree: [
        { xh: 0, sm_cnt: 100, xzqhmc: "全部1" },
        { xh: 1, sm_cnt: 100, xzqhmc: "全部2" },
        { xh: 2, sm_cnt: 100, xzqhmc: "全部3" },
        { xh: 3, sm_cnt: 100, xzqhmc: "全部4" },
        { xh: 4, sm_cnt: 100, xzqhmc: "全部5" },
      ],
      currentCard: {},
      carList: [
        /* { num: 8, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 11, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" },
        { num: 4, name: "小型新能源汽车", plateId: "浙LDA2778" }, */
      ],
    }
  },
  methods: {
    axiosRquest(path) {
      return axios.get(apiUrl + path)
    },
    sortChange(chartType, btnType) {
      this[chartType] = btnType
      if (chartType == "sortOne") {
        this.getChart1()
      }
      if (chartType == "sortThree" || chartType == "selectThree") {
        this.getChart2()
      }
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
    cardChange(v) {
      console.log(v)
      this.currentCard = v
    },
    async getCarData() {
      let res = await this.axiosRquest("zs_vio_vehicle_many_time_ol")
      // console.log("getCarData", res)
      let arr = new Map()
      for (let index = 0; index < res.length; index++) {
        const element = res[index]

        let obj = {
          out_rk: element.out_rk,
          num: element.wfcs,
          name: element.hpzlmc,
          plateId: element.hphm,
          children: [
            {
              in_rk: element.in_rk,
              belong: element.syr,
              phone: element.lxdh,
              against: element.wfxw,
              addr: element.wfdd,
              time: element.wfsj,
            },
          ],
        }
        if (arr.has(element.out_rk)) {
          obj = arr.get(element.out_rk)
          obj.children.push({
            in_rk: element.in_rk,
            belong: element.syr,
            phone: element.lxdh,
            against: element.wfxw,
            addr: element.wfdd,
            time: element.wfsj,
          })
        }
        arr.set(element.out_rk, obj)
      }
      this.carList = Array.from(arr.values())
      // console.log(arr, this.carList)
    },
    async getChart1() {
      let path
      if (this.sortOne == "1") {
        path = "zs_vio_equip_use_rate_desc_ol"
      } else {
        path = "zs_vio_equip_use_rate_asc_ol"
      }
      let res = await this.axiosRquest(path)
      res = res.sort((a, b) => a.rk - b.rk)
      // console.log("getChart1", res)

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

      // let xAxisData = ["定海大道A口", "定海大道B口", "定海大道C口", "定海大道D口", "定海大道E口", "定海大道F口", "定海大道G口", "定海大道H口", "定海大道I口", "定海大道J口"]
      let xAxisData = res.map(e => e.sbmc)
      let seriesData1 = res.map(e => e.cjs)
      let seriesData2 = res.map(e => e.lrs)
      let seriesData3 = res.map(e => e.cjl * 100)

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
                采集数量：${params[1].value}</div>
                <div
                  style="display: flex;
                  align-items: center;
                  background: rgba(0, 170, 255, 0.3);
                  height: 32rem;
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  正式违法数量：${params[2].value}</div>
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
            // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
            formatter: function (value) {
              const length = value.length
              if (length > 10) {
                const str = value.slice(0, 10) + "..."
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
          max: 100,
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
            data: seriesData3,
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: seriesData1,
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: seriesData2,
          },
        ],
      }

      if (!this._myChart1) {
        this._myChart1 = echarts.init(document.querySelector(".left_one_chart"))
      }
      this._myChart1.setOption(option)
    },
    async getChart2() {
      let res = await this.axiosRquest("zs_vio_area_many_time_ol")
      console.log("getChart2", res)

      // selectThree
      let data = res.filter(e => e.xh == this.selectThree)

      let arr = new Map()
      for (let index = 0; index < data.length; index++) {
        const element = data[index]

        let obj = {
          name: element.wfxw,
          wf_cnt: element.wf_cnt,
          children: [
            {
              rk1: element.rk1,
              sbmc: element.sbmc,
              wfxh: element.wfxh,
            },
          ],
        }
        if (arr.has(element.rk)) {
          obj = arr.get(element.rk)
          obj.children.push({
            rk1: element.rk1,
            sbmc: element.sbmc,
            wfxh: element.wfxh,
          })
        }
        arr.set(element.rk, obj)
      }
      if (this.sortThree == "1") {
        data = Array.from(arr.values()).sort((a, b) => b.wf_cnt - a.wf_cnt)
      } else {
        data = Array.from(arr.values()).sort((a, b) => a.wf_cnt - b.wf_cnt)
      }
      console.log("data", data)

      this.cardThree = [res.find(e => e.xh == 0), res.find(e => e.xh == 1), res.find(e => e.xh == 2), res.find(e => e.xh == 3), res.find(e => e.xh == 4)]
      this.$nextTick(() => {
        this.cardThree.forEach(e => {
          this.$refs["myNum" + e.xh][0].reset("0", e.sm_cnt + "")
          this.$refs["myNum" + e.xh][0].start()
        })
      })
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
      let xAxisData = data.map(e => e.name)
      let seriesData = data.map(e => e.wf_cnt)
      let seriesData2 = data.map(e => JSON.stringify(e.children))
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
            // console.log("params", params)
            const item = params[0]
            const child = JSON.parse(params[2].value)
            let bg = require("@/assets/fbjsc/tankuang_head.png")
            let icon1 = require("@/assets/fbjsc/1.png")
            let icon2 = require("@/assets/fbjsc/2.png")
            let icon3 = require("@/assets/fbjsc/3.png")
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
                  ${item.value}
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
                  style="
                  display: grid;
                  grid-template-columns: 38rem 1fr;
                  grid-template-rows: 30rem 25rem;
                  background: rgba(0, 170, 255, 0.3);
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  <div style="margin-top:10rem;margin-right:10rem;grid-row: 1/3;background: url(${icon1}) top center/contain no-repeat;"></div>
                  <div style="margin-top:2rem;">地点：${child[0]?.sbmc || "-"}</div>
                  <div>时间：${child[0]?.wfxh || "-"}</div>
                </div>
                <div
                  style="
                  display: grid;
                  grid-template-columns: 38rem 1fr;
                  grid-template-rows: 25rem 25rem;
                  background: rgba(0, 170, 255, 0.3);
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  <div style="margin-top:10rem;margin-right:10rem;grid-row: 1/3;background: url(${icon2}) top center/contain no-repeat;"></div>
                  <div>地点：${child[1]?.sbmc || "-"}</div>
                  <div>时间：${child[1]?.wfxh || "-"}</div>
                </div>
                <div
                  style="
                  display: grid;
                  grid-template-columns: 38rem 1fr;
                  grid-template-rows: 25rem 25rem;
                  background: rgba(0, 170, 255, 0.3);
                  font-size: 16rem;
                  font-weight: 400;
                  padding-left: 10rem;">
                  <div style="margin-top:10rem;margin-right:10rem;grid-row: 1/3;background: url(${icon3}) top center/contain no-repeat;"></div>
                  <div>地点：${child[2]?.sbmc || "-"}</div>
                  <div>时间：${child[2]?.wfxh || "-"}</div>
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
              if (length > 10) {
                const str = value.slice(0, 10) + "..."
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
            itemStyle: {
              color: "transparent",
            },
            data: seriesData,
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent",
            },
            data: seriesData2,
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
    })
    this.getCarData()
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
        margin-left: 90rem;
        text-indent: -80rem;
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
