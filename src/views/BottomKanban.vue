<template>
  <div class="BottomKanban">
    <div class="kanban_item" v-for="(item, i) in kanbanList" :key="i">
      <div class="card_kanban">
        <div class="card_img"></div>
        <div class="card_name">{{ item.name }}</div>
        <animate-number mode="manual" class="card_num" :ref="'myNum' + i" from="0" to="0" :formatter="formatter" duration="3000" easing="easeOutQuad" />
      </div>

      <div class="percent_num">
        同比上周
        <span :class="item.lastWeek <= 0 ? 'blue-num' : 'red-num'">{{ item.lastWeek <= 0 ? item.lastWeek : "+" + item.lastWeek }}%</span>
      </div>
      <div class="percent_num">
        环比昨日
        <span :class="item.lastDay <= 0 ? 'blue-num' : 'red-num'">{{ item.lastDay <= 0 ? item.lastDay : "+" + item.lastDay }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kanbanList: [
        {
          name: "审验数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "审验率",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "录入数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
        {
          name: "录入数",
          num: "73712",
          lastWeek: 10,
          lastDay: -10,
        },
      ],
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
  },
  created() {
    this.$nextTick(() => {
      this.kanbanList.forEach((e, i) => {
        this.$refs["myNum" + i][0].reset("0", e.num)
        this.$refs["myNum" + i][0].start()
      })
    })
  },
}
</script>

<style lang="less">
.BottomKanban {
  position: absolute;
  bottom: 50rem;
  left: 50%;
  transform: translateX(-50%);
  width: 800rem;
  // height: 130rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30rem;
  // border: 1px solid #fff;

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
    color: #FC2626;
    font-weight: 600;
  }
  .blue-num {
    color: #14D23E;
    font-weight: 600;
  }
}
</style>
