<template>
  <div id="app">
    <div class="top-bar"></div>
    <div class="bottom-bar">
      <img src="~@/assets/精准推送.png" @click="pushHandle" />
    </div>
    <div class="contain">
      <div class="left-box">
        <div class="title-new1"></div>
        <div class="panel">
          <div class="animated-circle1">
            <div class="animated-bg"></div>
            <div>
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum3"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">人</span>
            </div>
            <div class="check-detail" @click="toPageHandle(0)">查看详情</div>
          </div>
          <div class="panel__right">
            <img style="width: 319rem; margin-top: 26rem" src="~@/assets/Frame 897.png" />
            <div class="num-title">
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum1"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">人</span>
            </div>
            <img style="width: 319rem; margin-top: 26rem" src="~@/assets/Frame 898.png" />
            <div class="num-title">
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum2"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">人</span>
            </div>
          </div>
        </div>

        <div class="title1"></div>
        <div class="table">
          <div class="table__th">
            <div class="table__th__item1">姓名</div>
            <div class="table__th__item2">所在地</div>
            <div class="table__th__item4">逾期天数</div>
          </div>
          <div class="roll-box">
            <div id="box1">
              <div class="table__tr" v-for="(item, index) in list1" :key="index">
                <div class="table__tr__item1">{{ item.XM }}</div>
                <div class="table__tr__item2">{{ item.LXZSXXDZ }}</div>
                <div class="table__tr__item4">{{ item.YQTS + "天" }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <div class="title2"></div>
        <div class="table">
          <div class="table__th">
            <div class="table__th__item1">姓名</div>
            <div class="table__th__item2">所在地</div>
            <div class="table__th__item4">剩余天数</div>
          </div>
          <div class="roll-box">
            <div id="box2">
              <div class="table__tr" v-for="(item, index) in list2" :key="index">
                <div class="table__tr__item1">{{ item.XM }}</div>
                <div class="table__tr__item2">{{ item.XZQHQJMC }}</div>
                <div class="table__tr__item4">{{ item.YYQTS + "天" }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="title-new2"></div>
        <div class="panel">
          <div class="animated-circle2">
            <div class="animated-bg"></div>
            <div>
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum8"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">辆</span>
            </div>
            <div class="check-detail" @click="toPageHandle(1)">查看详情</div>
          </div>
          <div class="panel__right">
            <img style="width: 319rem; margin-top: 26rem" src="~@/assets/Frame 899.png" />
            <div class="num-title">
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum12"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">人</span>
            </div>
            <img style="width: 319rem; margin-top: 26rem" src="~@/assets/Frame 900.png" />
            <div class="num-title">
              <animate-number
                style="font-family: 'Gotham'; font-size: 40rem; font-weight: 700; vertical-align: sub"
                mode="manual"
                class="num"
                ref="myNum13"
                from="0"
                to="0"
                :formatter="formatter"
                duration="3000"
                easing="easeOutQuad"
              />
              <span style="font-family: 'Gotham'; font-weight: 700; font-size: 24rem">人</span>
            </div>
          </div>
        </div>
        <div class="title3"></div>
        <div class="table">
          <div class="table__th">
            <div class="table__th__item1">车牌号码</div>
            <div class="table__th__item2">所在地</div>
            <div class="table__th__item4">逾期月数</div>
          </div>
          <div class="roll-box">
            <div id="box3">
              <div class="table__tr" v-for="(item, index) in list3" :key="index">
                <div class="table__tr__item1">{{ item.HPHM }}</div>
                <div class="table__tr__item2">{{ item.SZD }}</div>
                <div class="table__tr__item4">{{ item.YGYQYS + "个月" }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <div class="title4"></div>

        <div class="table">
          <div class="table__th">
            <div class="table__th__item1">车牌号码</div>
            <div class="table__th__item2">所在地</div>
            <div class="table__th__item4">剩余月数</div>
          </div>
          <div class="roll-box">
            <div id="box4">
              <div class="table__tr" v-for="(item, index) in list4" :key="index">
                <div class="table__tr__item1">{{ item.HPHM }}</div>
                <div class="table__tr__item2">{{ item.SYRZSXXDZ }}</div>
                <div class="table__tr__item4">{{ item.SYYS + "个月" }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-pin">
      <div v-for="(item, i) in mapList" :key="i" :class="['pin__item', item.class]">
        <img src="~@/assets/icon_point.gif" style="display: inline-block; margin: 0; width: 56rem; height: 56rem" />
        <div class="right-label">
          <div class="person-num">渔民数 {{item.outNum + item.inNum}}</div>
          <img style="height: 21rem; margin: 8rem 0" :src="require(`@/assets/${item.name}.png`)" />
          <div class="in-out-num">
            <div class="in-title">
              <span class="label">在岸</span><span class="num">{{ formatter(item.inNum) }}</span>
            </div>
            <div class="out-title">
              <span class="label">出海</span><span class="num">{{ formatter(item.outNum) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dialogShow" class="dialog">
      <div class="dialog__title">
        <img class="img1" src="~@/assets/Group_1154.png" />
        <img @click="closeHandle" class="img2" src="~@/assets/close.png" />
      </div>
      <div class="line"></div>
      <div class="dialog__body">
        <el-form :model="ruleForm" ref="ruleForm">
          <div class="label-name">联系人</div>
          <el-form-item prop="value1" :rules="{ required: true, message: '姓名不能为空' }">
            <el-input class="input" v-model="ruleForm.value1" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <div class="label-push">发送至</div>
          <el-form-item prop="value2" :rules="{ required: true, message: '手机号码不能为空' }">
            <el-input class="input" v-model="ruleForm.value2" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <div class="label-content">短信内容</div>
          <el-form-item prop="value3" :rules="{ required: true, message: '短信内容不能为空' }">
            <el-input class="textarea" type="textarea" placeholder="请输入短信内容" v-model="ruleForm.value3" maxlength="140" show-word-limit> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog__footer">
        <el-upload class="upload" action="/" limit="1">
          <img style="width: 20rem" src="~@/assets/export.png" />
          <span>批量导入</span>
        </el-upload>
        <div class="btns">
          <el-button class="btn1" @click="closeHandle">取消</el-button>
          <el-button class="btn2" @click="sendHandle">发送</el-button>
        </div>
      </div>
    </div>
    <div v-if="msgShow" class="msg">
      <img src="~@/assets/states_success.png" />
      <span>发送成功</span>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
// import dayjs from "dayjs"
// import "dayjs/locale/zh-cn"
import axios from "./axios.js"
let apiUrl = "https://cube.yucekj.com/api/cubeMockApi/getContent?bizCode="
// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV == "production") {
  apiUrl = "/api/cubeMockApi/getContent?bizCode="
}

export default {
  name: "App",
  data() {
    return {
      ruleForm: {
        value1: "",
        value2: "",
        value3: "",
      },
      dialogShow: false,
      msgShow: false,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      tableNums: [0, 0, 0, 0],
      leftNums: [0, 0, 0, 0, 0],
      rightNums: [0, 0, 0, 0],
      pagePath1: "",
      pagePath2: "",
      mapList: [
        {
          class: "pin1",
          name: "嵊泗中心渔港",
          outNum: 0,
          inNum: 0,
        },
        {
          class: "pin2",
          name: "衢山岛锚地",
          outNum: 0,
          inNum: 0,
        },
        {
          class: "pin3",
          name: "高亭中心渔港",
          outNum: 0,
          inNum: 0,
        },
        {
          class: "pin4",
          name: "西码头渔港",
          outNum: 0,
          inNum: 0,
        },
        {
          class: "pin5",
          name: "沈家门渔港",
          outNum: 0,
          inNum: 0,
        },
        {
          class: "pin6",
          name: "月岙渔港",
          outNum: 0,
          inNum: 0,
        },
      ],
    }
  },
  methods: {
    axiosRquest(path) {
      return axios.get(apiUrl + path)
    },
    getData() {
      axios
        .all([
          this.axiosRquest("zs_yqwsyds"),
          this.axiosRquest("zs_yqwhzds"),
          this.axiosRquest("zs_jdcyqwjyds"),
          this.axiosRquest("zs_jdcljjyrqds"),

          this.axiosRquest("zs_yqwsymd"),
          this.axiosRquest("zs_yqwhzmd"),
          this.axiosRquest("zs_jdcyqwjymd"),
          this.axiosRquest("zs_jdcljjymd"),

          this.axiosRquest("zs_jsrds"),
          this.axiosRquest("zs_ljhzrqds"),
          this.axiosRquest("zs_zxkhfds"),
          this.axiosRquest("zs_AB9f"),
          this.axiosRquest("zs_ljmf"),

          this.axiosRquest("zs_jdcds"),
          this.axiosRquest("zs_yqwbfds"),
          this.axiosRquest("zs_ljbfds"),
          this.axiosRquest("zs_2wjy"),

          this.axiosRquest("zs_jszxxybp"),
          this.axiosRquest("zs_jdcxxybp"),
          this.axiosRquest("zs_crgyms "),
        ])
        .then(
          axios.spread(
            (
              tableNum1,
              tableNum2,
              tableNum3,
              tableNum4,
              list1,
              list2,
              list3,
              list4,
              leftNums1,
              leftNums2,
              leftNums3,
              leftNums4,
              leftNums5,
              rightNums1,
              rightNums2,
              rightNums3,
              rightNums4,
              pagePath1,
              pagePath2,
              pinList,
            ) => {
              this.tableNums = [tableNum1, tableNum2, tableNum3, tableNum4]
              this.list1 = [...list1, ...list1, ...list1]
              this.list2 = [...list2, ...list2, ...list2]
              this.list3 = [...list3, ...list3, ...list3]
              this.list4 = [...list4, ...list4, ...list4]
              this.leftNums = [leftNums1, leftNums2, leftNums3, leftNums4, leftNums5]
              this.rightNums = [rightNums1, rightNums2, rightNums3, rightNums4]
              this.pagePath1 = pagePath1
              this.pagePath2 = pagePath2
              pinList.forEach(e => {
                this.mapList.forEach(ele => {
                  if (e.GKMC == ele.name && e.CHLX == "出海") {
                    ele.outNum = e.YMS
                  } else if (e.GKMC == ele.name && e.CHLX == "在岸") {
                    ele.inNum = e.YMS
                  }
                })
              })
              this.$nextTick(() => {
                this.$refs.myNum1.reset("0", tableNum1)
                this.$refs.myNum1.start()
                this.$refs.myNum2.reset("0", tableNum2)
                this.$refs.myNum2.start()

                this.$refs.myNum3.reset("0", leftNums1)
                this.$refs.myNum3.start()
                // this.$refs.myNum4.reset("0", leftNums2)
                // this.$refs.myNum4.start()
                // this.$refs.myNum5.reset("0", leftNums3)
                // this.$refs.myNum5.start()
                // this.$refs.myNum6.reset("0", leftNums4)
                // this.$refs.myNum6.start()
                // this.$refs.myNum7.reset("0", leftNums5)
                // this.$refs.myNum7.start()

                this.$refs.myNum8.reset("0", rightNums1)
                this.$refs.myNum8.start()
                /*  this.$refs.myNum9.reset("0", rightNums2)
                this.$refs.myNum9.start()
                this.$refs.myNum10.reset("0", rightNums3)
                this.$refs.myNum10.start()
                this.$refs.myNum11.reset("0", rightNums4)
                this.$refs.myNum11.start() */

                this.$refs.myNum12.reset("0", tableNum3)
                this.$refs.myNum12.start()
                this.$refs.myNum13.reset("0", tableNum4)
                this.$refs.myNum13.start()

                this.setAnimationList("#box1", "movetop1", this.list1)
                this.setAnimationList("#box2", "movetop2", this.list2)
                this.setAnimationList("#box3", "movetop3", this.list3)
                this.setAnimationList("#box4", "movetop4", this.list4)
              })
            },
          ),
        )
    },
    pushHandle() {
      this.dialogShow = true
    },
    closeHandle() {
      this.dialogShow = false
      this.ruleForm = {
        value1: "",
        value2: "",
        value3: "",
      }
    },
    sendHandle() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.msgShow = true
          setTimeout(() => {
            this.msgShow = false
          }, 3000)
          // this.dialogShow = false
          /* this.ruleForm = {
            value1: "",
            value2: "",
            value3: "",
          } */
        } else {
          return false
        }
      })
    },
    toPageHandle(type) {
      if (type == 0) {
        window.open(this.pagePath1)
      } else {
        window.open(this.pagePath2)
      }
    },
    formatterTEL(num) {
      return num.toString().slice(0, 3) + " " + num.toString().slice(3, 6) + " " + num.toString().slice(6)
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
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(40 * index) / 2}rem; }\n`
        } else {
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(40 * (index - 1)) / 2}rem; }\n`
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
    setAnimationList(domId, keyframesName, list) {
      let dom = document.querySelector(domId)
      dom.style.animation = ""
      this.initAnimation(list.length, dom, keyframesName)
    },
    computedREM() {
      let change = () => {
        document.documentElement.style.fontSize = document.documentElement.clientHeight / 1080 + "px"
        if (this._myChart1) {
          this._myChart1.resize()
          this._myChart2.resize()
          this._myChart3.resize()
        }
      }
      change()
      window.addEventListener("resize", change, false)
    },
  },
  created() {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 1000 * 60 * 15)
  },
  mounted() {
    this.computedREM()
  },
}
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #000;
  position: relative;
  background: url(~@/assets/bg.png) center/1980rem no-repeat, rgba(0, 41, 106);
  .top-bar {
    width: 100%;
    height: 112rem;
    background: url(~@/assets/Group_984.png) center bottom/2090rem no-repeat, url(~@/assets/舟山市渔海车管一件事.png) 50% 30% /531rem no-repeat;
  }
  .bottom-bar {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: url(~@/assets/Group_1056.png) center bottom/900rem no-repeat;
    height: 63rem;
    text-align: center;
    img {
      width: 92rem;
      margin-top: 31rem;
      cursor: pointer;
    }
  }
  .contain {
    width: 100%;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    .title1,
    .title2,
    .title3,
    .title4 {
      margin-bottom: 14rem;
      width: 470rem;
      height: 35rem;
      background: url("~@/assets/Group 1117.png") top -20rem left/506rem 95rem no-repeat;
    }
    .title2 {
      background: url("~@/assets/Group 1157.png") top -20rem left/506rem 95rem no-repeat;
    }
    .title3 {
      background: url("~@/assets/Group 1158.png") top -20rem left/506rem 95rem no-repeat;
    }
    .title4 {
      background: url("~@/assets/Group 1159.png") top -20rem left/506rem 95rem no-repeat;
    }
    .triangle {
      margin-left: 14rem;
      font-size: 16rem;
      color: #989ea8;
      vertical-align: middle;
      &::before {
        content: "";
        margin-right: 5rem;
        display: inline-block;
        opacity: 0.5;
        vertical-align: middle;
        width: 0;
        height: 0;
        border-right: 5px solid #4d79d1;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
    .num-title {
      margin-left: 26rem;
    }
    .table {
      margin-left: 23rem;
      margin-bottom: 27rem;
      width: 444rem;
      .table__th {
        background: rgba(6, 122, 229, 0.2);
        height: 40rem;
        font-family: "PingFang SC";
        font-size: 16rem;
        color: #4d79d1;
        line-height: 40rem;
        .table__th__item1 {
          width: 21%;
          display: inline-block;
          padding-left: 14rem;
        }
        .table__th__item2 {
          width: 60%;
          display: inline-block;
          // padding-left: 43rem;
          text-align: center;
        }
        .table__th__item4 {
          width: 15%;
          display: inline-block;
          // padding-right: 14rem;
          text-align: right;
        }
      }
      .roll-box {
        position: relative;
        overflow: hidden;
        height: 200rem;
        .table__tr {
          height: 40rem;
          font-family: "PingFang SC";
          font-size: 16rem;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .table__tr__item1 {
            width: 21%;
            display: inline-block;
            padding-left: 14rem;
          }
          .table__tr__item2 {
            width: 60%;
            max-width: 235rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            // padding-left: 43rem;
            text-align: center;
          }
          .table__tr__item4 {
            width: 15%;
            display: inline-block;
            padding-right: 12rem;
            text-align: right;
          }
        }
        .table__tr:nth-child(even) {
          background: rgba(255, 255, 255, 0.15);
        }
        #box1,
        #box2,
        #box3,
        #box4 {
          position: absolute;
          width: 444rem;
        }
        .animation-stop {
          animation-play-state: paused !important;
        }
        .animation-start {
          animation-play-state: running !important;
        }
      }
    }
    .title-new1 {
      width: 590rem;
      height: 35rem;
      background: url(~@/assets/Group-1141.png) top -22rem left / 629rem 95rem no-repeat;
    }
    .title-new2 {
      width: 590rem;
      height: 35rem;
      background: url(~@/assets/Group-1156.png) top -22rem left / 629rem 95rem no-repeat;
    }

    .panel {
      display: flex;
      .animated-circle1 {
        width: 286rem;
        height: 286rem;
        // background: url(~@/assets/Frame_887.png) center/100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .animated-bg {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background: url(~@/assets/Frame_887.png) center/100%;
          animation: rotation 5s linear infinite;
        }
        .check-detail {
          margin-top: 2rem;
          color: #4d79d1;
          font-family: "PingFang SC";
          font-weight: 500;
          font-size: 14rem;
          cursor: pointer;
        }
      }
      .animated-circle2 {
        width: 286rem;
        height: 286rem;
        // background: url(~@/assets/Frame_888.png) center/100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        .animated-bg {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          background: url(~@/assets/Frame_888.png) center/100%;
          animation: rotation2 5s linear infinite;
        }
        .check-detail {
          margin-top: 2rem;
          color: #4d79d1;
          font-family: "PingFang SC";
          font-weight: 500;
          font-size: 14rem;
          cursor: pointer;
        }
      }
      .panel__right {
        margin-left: 14rem;
      }
    }
  }
  .left-box {
    margin-left: 35rem;
  }
  .right-box {
    margin-right: 35rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .left-num-box {
    margin-top: 28rem;
    width: 292rem;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .right-num-box {
    margin-top: 28rem;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .center-pin {
    width: 50%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .pin__item {
      position: absolute;
      display: flex;
      .right-label {
        .person-num {
          font-family: "PingFang SC";
          color: #989ea8;
          font-size: 16rem;
        }
        .in-out-num {
          .label {
            display: inline-block;
            font-size: 12rem;
            font-family: PingFang SC-Regular, PingFang SC;
            color: #fff;
            padding: 2rem 4rem;
            background: rgba(0, 0, 0, 0.8);
          }
          .num {
            display: inline-block;
            font-size: 12rem;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            padding: 2rem 8rem;
          }
          .in-title {
            display: inline-block;
            .num {
              background: rgba(47, 100, 255, 0.6);
            }
          }
          .out-title {
            display: inline-block;
            margin-left: 10rem;
            .num {
              background: rgba(255, 78, 79, 0.6);
            }
          }
        }
      }
    }
    .pin1 {
      top: 10%;
      right: 20%;
    }
    .pin2 {
      top: 30%;
      left: 50%;
    }
    .pin3 {
      top: 50%;
      left: 33%;
    }
    .pin4 {
      top: 64%;
      left: 20%;
    }
    .pin5 {
      bottom: 5%;
      left: 44%;
      flex-direction: column-reverse;
    }
    .pin6 {
      bottom: 0;
      left: 57%;
    }
  }
}
.dialog {
  position: absolute;
  top: 22%;
  left: 36%;
  width: 660rem;
  background: rgba(0, 20, 49, 0.95);
  .dialog__title {
    height: 70rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img1 {
      height: 32rem;
      margin-left: 20rem;
    }
    .img2 {
      cursor: pointer;
      height: 18rem;
      margin-right: 20rem;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90.13deg, rgba(47, 100, 255, 0.9) 10.16%, rgba(47, 100, 255, 0) 137.86%);
  }
  .dialog__body {
    padding-left: 56rem;
    .label-name {
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 16rem;
      margin: 30rem 0 10rem;
    }
    .label-push {
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 16rem;
      margin: 30rem 0 10rem;
    }
    .label-content {
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 16rem;
      margin: 30rem 0 10rem;
    }
    .el-input__inner::placeholder,
    .el-textarea__inner::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .input .el-input__inner {
    color: rgba(255, 255, 255, 0.85);
    width: 548rem;
    height: 44rem;
    background: rgba(5, 5, 5, 0.5);
    border: 1px solid #204dbe;
    border-radius: 8px;
  }
  .textarea {
    .el-textarea__inner {
      color: rgba(255, 255, 255, 0.85);
      width: 548rem;
      height: 164rem;
      background: rgba(5, 5, 5, 0.5);
      border: 1px solid #204dbe;
      border-radius: 8px;
      resize: none;
    }
    .el-input__count {
      right: 59rem;
      background: rgba(5, 5, 5, 0.5);
    }
  }
  .dialog__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 65rem 57rem 33rem;
    .upload {
      cursor: pointer;
      .el-upload {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-right: 8rem;
        }
      }
    }
    .btn1 {
      width: 105rem;
      height: 44rem;
      border: 1rem solid #204dbe;
      border-radius: 8px;
      font-family: "PingFang SC";
      font-weight: 600;
      font-size: 16rem;
      color: #204dbe;
      background: transparent;
    }
    .btn2 {
      width: 157rem;
      height: 44rem;
      background: #0b50ff;
      border-color: #0b50ff;
      border-radius: 8px;
      font-family: "PingFang SC";
      font-weight: 600;
      font-size: 16rem;
      color: #fff;
    }
  }
}
.msg {
  position: absolute;
  top: 50%;
  left: 47%;
  z-index: 2;
  width: 139rem;
  height: 45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 20rem;
  background: rgba(5, 5, 5, 0.5);
  border: 1px solid #204dbe;
  border-radius: 8px;
  img {
    width: 22rem;
    margin-right: 5rem;
  }
  span {
    font-family: "PingFang SC";
    font-weight: 600;
    font-size: 16rem;
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
@keyframes rotation2 {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes movetop1 {
  from {
    top: 0;
  }
  to {
    top: 0;
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
@keyframes movetop3 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
@keyframes movetop4 {
  from {
    top: 0;
  }
  to {
    top: 0;
  }
}
</style>
