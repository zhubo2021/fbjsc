<template>
  <div class="TopKanban">
    <div class="kanban_item" v-for="(item, i) in kanbanList" :key="i">
      <div class="card_kanban">
        <div class="card_img"></div>
        <div class="card_name">{{ item.name }}</div>
        <animate-number mode="manual" class="card_num" :ref="'myNum' + i" from="0" to="0" :formatter="n => formatter(n, item.name)" duration="3000" easing="easeOutQuad" />
      </div>

      <div :style="{ opacity: i < 3 ? 0 : 1 }" class="percent_num">
        同比上周
        <span v-if="item.lastWeek == 0" class="orange-num">持平</span>
        <span v-else :class="item.lastWeek < 0 ? 'blue-num' : 'red-num'">{{ item.lastWeek < 0 ? item.lastWeek : "+" + item.lastWeek }}%</span>
      </div>
      <div :style="{ opacity: i < 3 ? 0 : 1 }" class="percent_num">
        环比昨日
        <span v-if="item.lastDay == 0" class="orange-num">持平</span>
        <span v-else :class="item.lastDay < 0 ? 'blue-num' : 'red-num'">{{ item.lastDay < 0 ? item.lastDay : "+" + item.lastDay }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataList"],
  data() {
    return {
      kanbanList: [
        /* {
          name: "设备总数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "运行设备数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "设备完好率",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "采集数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        }, */
      ],
    }
  },
  watch: {
    dataList: {
      handler(newVal) {
        if (newVal.length > 0) {
          // console.log("采集数", newVal)
          this.kanbanList = [
            {
              name: "设备总数",
              num: newVal.find(e => e.tag == 1).cnt,
              lastWeek: parseInt(newVal.find(e => e.tag == 1).ztb * 100),
              lastDay: parseInt(newVal.find(e => e.tag == 1).rhb * 100),
            },
            {
              name: "运行设备数",
              num: newVal.find(e => e.tag == 2).cnt,
              lastWeek: parseInt(newVal.find(e => e.tag == 2).ztb * 100),
              lastDay: parseInt(newVal.find(e => e.tag == 2).rhb * 100),
            },
            {
              name: "设备完好率",
              num: parseInt(newVal.find(e => e.tag == 3).cnt * 100),
              lastWeek: parseInt(newVal.find(e => e.tag == 3).ztb * 100),
              lastDay: parseInt(newVal.find(e => e.tag == 3).rhb * 100),
            },
            {
              name: "采集数",
              num: newVal.find(e => e.tag == 4).cnt,
              lastWeek: parseInt(newVal.find(e => e.tag == 4).ztb * 100),
              lastDay: newVal.find(e => e.tag == 4).rhb,
            },
          ]
          this.takeChange()
        }
      },
      immediate: true,
    },
  },
  methods: {
    formatter(n = 0, name) {
      // console.log("formatter", n)
      const regex = /\d{1,3}(?=(\d{3})+(\.|$))/g // 替换规则
      n = String(Math.round(n * Math.pow(10, 2))) // 乘100 四舍五入
      let integer = n.substr(0, n.length - 2).replace(regex, "$&,") // 最后两位前的为整数
      // let decimal = n.substr(n.length - 2) // 最后两位为小数
      let result = `${integer || 0}`
      // const result = `${integer || 0}.${decimal}`
      if (name == "设备完好率") {
        result = result + "%"
      }
      return result
    },
    takeChange() {
      this.$nextTick(() => {
        this.kanbanList.forEach((e, i) => {
          this.$refs["myNum" + i][0].reset("0", e.num)
          this.$refs["myNum" + i][0].start()
        })
      })
    },
  },
  created() {},
}
</script>

<style lang="less">
.TopKanban {
  position: absolute;
  top: 140rem;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  // height: 130rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30rem;
  // border: 1px solid #fff;
  padding: 20rem;
  background: rgba(16, 27, 58, 0.5);

  .card_kanban {
    background: url(~@/assets/fbjsc/icon.png) left center/contain no-repeat;
    // border: 1px solid red;
    width: 150rem;
    display: grid;
    grid-template-rows: 18rem 1fr;
    grid-template-columns: 52rem 1fr;
    // grid-row-gap: 0;
    grid-column-gap: 4rem;
    .card_img {
      grid-row: 1/3;
    }
    .card_name {
      font-size: 13rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.74);
      margin-top: 2rem;
    }
    .card_num {
      font-size: 23rem;
      font-weight: 900;
      color: #fff;
    }
  }
  .percent_num {
    margin-top: 6rem;
    font-size: 16rem;
    font-weight: 500;
    font-family: PingFang SC;
  }
  .red-num {
    color: #fc2626;
    font-weight: 600;
  }
  .blue-num {
    color: #14d23e;
    font-weight: 600;
  }
  .orange-num {
    color: rgb(237, 103, 1);
    font-weight: 600;
  }
}
</style>
