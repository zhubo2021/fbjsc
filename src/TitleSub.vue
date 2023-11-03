<template>
  <div class="title_label">
    <div class="icon1">
      <div class="icon1_spin"></div>
    </div>
    <div class="icon2"></div>
    <div
      :class="{
        icon3: true,
        icon3_plus: indexNum,
      }"
    >
      <div class="label" :style="type == 1 ? 'line-height:22rem' : ''">{{ name }}</div>
      <div v-if="indexNum" class="indexNum">{{ indexNum }}</div>
      <div class="icon3_flicker">
        <img class="flicker_item" src="@/assets/daliuliang/title8.png" />
        <img class="flicker_item" src="@/assets/daliuliang/title8.png" />
        <img class="flicker_item" src="@/assets/daliuliang/title8.png" />
      </div>
      <div class="icon_move">
        <img class="move_item" src="@/assets/daliuliang/bottom_move.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "type", "indexNum"],
}
</script>

<style lang="less">
.title_label {
  font-family: "newFont";
  width: 320rem;
  height: 40rem;
  display: flex;
  align-items: center;
  .icon1 {
    display: inline-block;
    position: relative;
    width: 40rem;
    height: 100%;
    background: url(~@/assets/daliuliang/title2.png) center / 50% no-repeat, url(~@/assets/daliuliang/title1.png) right / 66% no-repeat;
    .icon1_spin {
      position: absolute;
      top: 0;
      width: 40rem;
      height: 100%;
      background: url(~@/assets/daliuliang/title3.png) center / cover no-repeat;
      animation: rotation 4s linear infinite;
    }
  }
  .icon2 {
    display: inline-block;
    width: 10rem;
    height: 100%;
    background: url(~@/assets/daliuliang/title9.png) center / 200% no-repeat;
  }
  .icon3 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20rem;
    padding-left: 30rem;
    font-size: 18rem;
    width: 275rem;
    height: 30rem;
    background: url(~@/assets/daliuliang/jiantou.png) 100% 100% / 90rem no-repeat, url(~@/assets/daliuliang/title7.png) center / cover no-repeat,
      url(~@/assets/daliuliang/title6.png) left bottom / 100% no-repeat, url(~@/assets/daliuliang/title4.png) -4% 47% / 11% no-repeat,
      url(~@/assets/daliuliang/title5.png) 104% 29% / 10% no-repeat;
    .label {
      font-size: 22rem;
      // height: 20rem;
    }
    .icon3_flicker {
      position: absolute;
      right: 5rem;
      top: -12rem;
      .flicker_item {
        display: inline-block;
        margin-left: -19rem;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 2s;
        animation-delay: 2s;
        animation-name: flicker;
        width: 27rem;
      }
      .flicker_item:nth-of-type(1) {
        animation-delay: 1s;
      }
      .flicker_item:nth-of-type(2) {
        animation-delay: 1.5s;
      }
    }
    .icon_move {
      position: absolute;
      left: -50rem;
      top: 19rem;
      animation: moveRight 3s linear infinite;
      .move_item {
        width: 134rem;
      }
    }
  }
  .icon3_plus {
    background: url(~@/assets/daliuliang/title7.png) center / cover no-repeat, url(~@/assets/daliuliang/title6.png) left bottom / 100% no-repeat,
      url(~@/assets/daliuliang/title4.png) -4% 47% / 11% no-repeat, url(~@/assets/daliuliang/title5.png) 104% 29% / 10% no-repeat;
  }
  .indexNum {
    color: #ff9c73;
  }
}

@keyframes moveRight {
  0% {
    left: -50rem;
    opacity: 0;
  }
  50% {
    left: 62rem;
    opacity: 1;
  }
  100% {
    left: 174rem;
    opacity: 0;
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
