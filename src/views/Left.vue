<template>
  <div class="left_bar">
    <div class="left_one_container">
      <div class="top_title">
        <span class="title_label">设备利用率 TOP10</span>
        <div class="sort_btns">
          <span>最高</span>
          <span>最低</span>
        </div>
      </div>
    </div>
    <div class="left_two_container"></div>
    <div class="left_three_container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortOne: "1",
      sortThree: "1",
    }
  },
  created() {},
}
</script>

<style lang="less">
.left_bar {
  position: absolute;
  left: 30rem;
  top: 115rem;
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
  }
  .left_one_container {
  }
  .left_two_container {
  }
  .left_three_container {
  }
}
</style>
e
