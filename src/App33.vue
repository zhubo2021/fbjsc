<template>
  <div id="app">
    <div class="weather">
      <div class="weather_item1">{{ weatherData[0] }}</div>
      <div class="weather_item2">{{ weatherData[1] }}</div>
      <div class="weather_item3">{{ weatherData[2] }}</div>
    </div>
    <div class="top-bar">舟道先知-路网流量预测预警</div>
    <div class="bottom-bar">
      <div class="bottom_btn" style="left: 25%" @click="openDialog2(1)">景区停车态势</div>
      <div class="bottom_btn" style="left: 34%" @click="openDialog2(2)">岱山流量</div>
      <div class="bottom_btn" style="left: 43.3%" @click="openDialog2(4)">车流趋势</div>
      <div class="bottom_btn" style="left: 52.7%" @click="openDialog2(5)">宾馆入住</div>
      <div class="bottom_btn" style="left: 62%" @click="openDialog2(3)">近30日客流走势</div>
      <!-- <div class="pass-analyse">
        <div class="analyse_item">
          <div class="icon-row">
            <span>通行时效分析</span>
          </div>
          <div class="row-label" v-for="(item, i) in analyseList" :key="i">{{ item }}</div>
        </div>
      </div> -->
    </div>
    <div class="contain">
      <div class="left-box">
        <TitleSub name="舟山西流量" />
        <div class="cards">
          <div class="card_small">
            <div class="row-one">进舟山西 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[0]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">出舟山西 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[1]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">进舟山西(总数):</div>
            <div class="row-two">{{ formatter(dayList[0]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[0] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[0] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[0] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[0] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">出舟山西(总数):</div>
            <div class="row-two">{{ formatter(dayList[1]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[1] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[1] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[1] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[1] }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title_oneself">舟山西流量时段分布及预测</div>
        <div class="line-charts1"></div>
        <TitleSub name="徐家东西快速路流量" />
        <div class="cards" style="margin-bottom: 10rem">
          <div class="card_small">
            <div class="row-one">进朱家尖方向 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[2]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">出朱家尖方向 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[3]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">进朱家尖方向(总数):</div>
            <div class="row-two">{{ formatter(dayList[2]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[2] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[2] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[2] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[2] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">出朱家尖方向(总数):</div>
            <div class="row-two">{{ formatter(dayList[3]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[3] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[3] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[3] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[3] }}%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="title_oneself">徐家东西快速路流量时段分布</div>
        <div class="line-charts2"></div> -->
        <TitleSub name="徐家海天大道方向" />
        <div class="cards" style="margin-bottom: 10rem">
          <div class="card_small">
            <div class="row-one">进朱家尖方向 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[4]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">出朱家尖方向 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[5]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">进朱家尖方向(总数):</div>
            <div class="row-two">{{ formatter(dayList[4]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[4] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[4] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[4] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[4] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">出朱家尖方向(总数):</div>
            <div class="row-two">{{ formatter(dayList[5]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[5] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[5] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[5] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[5] }}%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="title_oneself">徐家海天大道方向流量时段分布</div>
        <div class="line-charts3"></div> -->
        <TitleSub name="金塘大桥流量" :indexNum="(indexList[2] * 100).toFixed(2) + '%'" />
        <div class="cards">
          <div class="card_small">
            <div class="row-one">今日进 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[14]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">今日出 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[15]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">今日进(总数):</div>
            <div class="row-two">{{ formatter(dayList[14]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[14] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ formatter(lastWeek[14]) }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[14] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ formatter(lastDay[14]) }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">今日出(总数):</div>
            <div class="row-two">{{ formatter(dayList[15]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[15] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[15] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastWeek[15] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[15] }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <TitleSub name="进入朱家尖车辆来源" />
        <div class="radar-chart"></div>
        <TitleSub name="朱家尖流量" :indexNum="(indexList[0] * 100).toFixed(2) + '%'" />
        <div class="cards">
          <div class="card_small">
            <div class="row-one">今日进 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[6]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">今日出 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[7]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">今日进(总数):</div>
            <div class="row-two">{{ formatter(dayList[6]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[6] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[6] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[6] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[6] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">今日出(总数):</div>
            <div class="row-two">{{ formatter(dayList[7]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[7] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[7] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[7] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[7] }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title_oneself" style="transform: translateY(-5rem)">朱家尖流量时段分布及预测</div>
        <div style="transform: translateY(-5rem)" class="line-charts4"></div>
        <TitleSub :type="1" name="朱家尖潮汐车道流量" />
        <div class="cards">
          <div class="card_small">
            <div class="row-one">今日进 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[8]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">今日出 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[9]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">今日进(总数):</div>
            <div class="row-two">{{ formatter(dayList[8]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[8] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[8] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[8] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[8] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">今日出(总数):</div>
            <div class="row-two">{{ formatter(dayList[9]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[9] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[9] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[9] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[9] }}%</span>
              </div>
            </div>
          </div>
        </div>
        <TitleSub name="南沙流量" :indexNum="(indexList[1] * 100).toFixed(2) + '%'" />
        <div class="cards">
          <div class="card_small">
            <div class="row-one">今日进 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[10]) }}</div>
          </div>
          <div class="card_small">
            <div class="row-one">今日出 (前1小时):</div>
            <div class="row-two">{{ formatter(hourList[11]) }}</div>
          </div>
          <div class="card_big">
            <div class="row-one">今日进(总数):</div>
            <div class="row-two">{{ formatter(dayList[10]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[10] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[10] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[10] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[10] }}%</span>
              </div>
            </div>
          </div>
          <div class="card_big">
            <div class="row-one">今日出(总数):</div>
            <div class="row-two">{{ formatter(dayList[11]) }}</div>
            <div class="row-three">
              <div class="row-three-one">
                <div class="icon1_img"></div>
                <span>同比上周:</span>
                <span :class="lastWeek[11] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[11] }}%</span>
              </div>
              <div class="row-three-two">
                <div class="icon1_img"></div>
                <span>环比昨日:</span>
                <span :class="lastDay[11] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[11] }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'time-warning': true,
        'time-warning_more': getMore,
      }"
    >
      <div class="carousel-container">
        <ul>
          <li>
            <div class="alarm-content">
              <div class="time_title">当前通行时效</div>
              <div class="time_card">
                <span class="row-label" v-for="(item, i) in analyseList_com" :key="i">
                  {{ item.label }}<span :style="{ color: item.index >= 1.5 ? 'red' : 'green' }">{{ item.index }}</span
                  >)
                </span>
              </div>
              <div class="get_more" @click="getMore = !getMore">{{ !getMore ? "更多" : "收起" }} <i class="el-icon-d-arrow-right"></i></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="warningList.length > 0"
      :class="{
        'alarm-warning': true,
        'alarm-warning_more': getMore,
      }"
    >
      <div class="carousel-container">
        <ul id="carousel-list">
          <li v-for="(item, i) in warningList" :key="i">
            <div class="alarm-content">
              <img src="@/assets/daliuliang/warning_icon1.svg" />
              <span>{{ item.warn_code == 1 ? "一" : item.warn_code == 2 ? "二" : "三" }}级预警: {{ item.warn_desc }} {{ item.create_time.substring(11, 16) }}</span>
              <div class="alarm_btn" @click="openHandle(item)">启动措施</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="alarm_tooltips">
      <div class="tooltip_item">
        <div class="icon-row">
          <div class="icon_alarm"></div>
          <span>排队报警</span>
        </div>
        <div class="row-two">排队长度: 3264米</div>
        <div class="row-three">地点: 朱家尖大桥进口</div>
        <div class="row-four">时间: 2023-12-01 14:33</div>
      </div>
    </div> -->
    <div class="map">
      <Pin name="A" top="420rem" left="0rem" />
      <Pin name="B" top="336rem" left="363rem" />
      <Pin name="C" top="384rem" left="555rem" />
      <Pin name="D" top="733rem" left="977rem" />
      <div class="liuliang_card">
        <div class="liuliang_title">进入朱家尖瞬时流量</div>
        <div class="liuliang_content">
          <div class="liuliang_item">
            <div class="liuliang_name">瞬时进岛：</div>
            <div class="liuliang_num">{{ goonFlow[0] }}</div>
          </div>
          <div class="liuliang_line"></div>
          <div class="liuliang_item">
            <div class="liuliang_name">瞬时出岛：</div>
            <div class="liuliang_num">{{ goonFlow[1] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="dialogShow1" class="dialog">
      <div class="dialog_title">一级预警措施</div>
      <div class="picture">
        <img :src="imgUrl" />
      </div>
      <div class="close_btn" @click="dialogShow1 = false">
        <div class="btn_left"></div>
        <div class="btn_center">关闭措施</div>
        <div class="btn_right"></div>
      </div>
    </div>
    <div v-show="dialogShow2" class="dialog2">
      <div class="dialog_title">{{ dialogType == 1 ? "景区停车态势" : dialogType == 2 ? "岱山流量" : "近30日客流走势" }}</div>
      <div class="dialog_content">
        <div v-if="dialogType == 1">
          <TitleSub name="景区停车态势" />
          <div class="stop_car">
            <div class="label_title">蜈蚣峙</div>
            <div class="stop_card">
              <div class="label_one">车辆饱和度</div>
              <div class="label_two">23%</div>
            </div>
            <div class="stop_card">
              <div class="label_one">在场车数</div>
              <div class="label_two">30,000</div>
            </div>
            <div class="label_title">观音法界</div>
            <div class="stop_card">
              <div class="label_one">车辆饱和度</div>
              <div class="label_two">23%</div>
            </div>
            <div class="stop_card">
              <div class="label_one">在场车数</div>
              <div class="label_two">30,000</div>
            </div>
            <div class="label_title">南沙大青山</div>
            <div class="stop_card">
              <div class="label_one">车辆饱和度</div>
              <div class="label_two">23%</div>
            </div>
            <div class="stop_card">
              <div class="label_one">在场车数</div>
              <div class="label_two">30,000</div>
            </div>
          </div>
        </div>
        <div v-if="dialogType == 2">
          <!-- <TitleSub name="朱家尖游客迁移指数" />
          <div class="table_move">
            <div class="table_one">
              <div class="btns">
                <div :class="['btn1', { isAcitve: tableTab == '0' }]" @click="tabChange('0')">迁入</div>
                <div :class="['btn2', { isAcitve: tableTab == '1' }]" @click="tabChange('1')">迁出</div>
              </div>
              <div class="migration">
                迁移指数:<span>{{ tableData.length > 0 ? tableData[0].migrate_index : "0" }}</span>
              </div>
            </div>
            <div class="table_two">
              <div class="table_th">
                <div class="th_one">序号</div>
                <div class="th_two">路线</div>
                <div class="th_three">迁入比例</div>
              </div>
              <div class="roll-box">
                <div id="box1">
                  <div class="table_td" v-for="(item, i) in tableData" :key="i">
                    <div class="td_one">
                      <div class="table_icon"></div>
                      {{ item.index }}
                    </div>
                    <div class="td_two">{{ item.path }}</div>
                    <div class="td_three">{{ item.ratio }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <TitleSub :type="1" name="岱山流量" />
          <div class="cards">
            <div class="card_small">
              <div class="row-one">今日进 (前1小时):</div>
              <div class="row-two">{{ formatter(hourList[12]) }}</div>
            </div>
            <div class="card_small">
              <div class="row-one">今日出 (前1小时):</div>
              <div class="row-two">{{ formatter(hourList[13]) }}</div>
            </div>
            <div class="card_big">
              <div class="row-one">今日进(总数):</div>
              <div class="row-two">{{ formatter(dayList[12]) }}</div>
              <div class="row-three">
                <div class="row-three-one">
                  <div class="icon1_img"></div>
                  <span>同比上周:</span>
                  <span :class="lastWeek[12] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[12] }}%</span>
                </div>
                <div class="row-three-two">
                  <div class="icon1_img"></div>
                  <span>环比昨日:</span>
                  <span :class="lastDay[12] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[12] }}%</span>
                </div>
              </div>
            </div>
            <div class="card_big">
              <div class="row-one">今日出(总数):</div>
              <div class="row-two">{{ formatter(dayList[13]) }}</div>
              <div class="row-three">
                <div class="row-three-one">
                  <div class="icon1_img"></div>
                  <span>同比上周:</span>
                  <span :class="lastWeek[13] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastWeek[13] }}%</span>
                </div>
                <div class="row-three-two">
                  <div class="icon1_img"></div>
                  <span>环比昨日:</span>
                  <span :class="lastDay[13] <= 0 ? 'blue-num' : 'red-num'">&nbsp;{{ lastDay[13] }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div key="3div" v-if="dialogType == 3">
          <TitleSub name="近30日客流走势" />
          <div class="bar-chart"></div>
        </div>
      </div>
      <div class="close_btn" @click="dialogShow2 = false">
        <div class="btn_left"></div>
        <div class="btn_center">关闭</div>
        <div class="btn_right"></div>
      </div>
    </div>
    <ShowDialog3 :dialogShow="dialogShow3" @close="dialogShow3 = false" />
    <checkInDialog :dialogShow="dialogShow5" @close="dialogShow5 = false" />
    <CardAnalyse :dialogShow="dialogShow4" :radarData="radarData2" :tableData1="tableData2_1" :tableData2="tableData2_2" @close="dialogShow4 = false" />
  </div>
</template>

<script>
import * as echarts from "echarts"
// import dayjs from "dayjs"
// import "dayjs/locale/zh-cn"
// import axios from "./axios.js"
import TitleSub from "./TitleSub.vue"
let apiUrl = "https://cube.yucekj.com/api/cubeMockApi/getContent?bizCode="
// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV == "production") {
  apiUrl = "/api/cubeMockApi/getContent?bizCode="
}
import axios from "./axios.js"
import { radarData_mock } from "./mock.js"
import ShowDialog3 from "./views/show-dialog3.vue"
import Pin from "./views/pin.vue"
import CardAnalyse from "./views/CardAnalyse.vue"
import checkInDialog from "./views/checkInDialog.vue"

export default {
  name: "App",
  components: { TitleSub, ShowDialog3, Pin, CardAnalyse, checkInDialog },
  data() {
    return {
      getMore: false,
      tableTab: "0",
      tableData: [],
      tableData2: [],
      dialogShow1: false,
      dialogShow2: false,
      dialogShow3: false,
      dialogShow4: false,
      dialogShow5: false,
      lastWeek: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      lastDay: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      radarData: [],
      radarData2: [],
      hourList: [],
      dayList: [],
      barData: [],
      warningList: [],
      lineData1: [],
      lineData2: [],
      lineData3: [],
      lineData4: [],
      imgUrl: "",
      analyseList: [],
      dialogType: 1,
      weatherData: [],
      goonFlow: [],
      indexList: [],
      tableData2_1: [],
      tableData2_2: [],
    }
  },
  computed: {
    analyseList_com() {
      return this.getMore ? this.analyseList : this.analyseList.slice(0, 4)
    },
  },
  methods: {
    axiosRquest(path) {
      return axios.get(apiUrl + path)
    },
    getData() {
      try {
        axios
          .all([
            this.axiosRquest("zs_kk_rate_stat_rt"),
            this.axiosRquest("zs_kk_jrzjj_cartype_flow_stat_rt"), // 2. radar
            this.axiosRquest("zs_kk_hour_flow_stat_rt"),
            this.axiosRquest("zs_kk_day_flow_stat_rt"),

            this.axiosRquest("zs_30d_visitor_flow_stat_ol"),
            this.axiosRquest("zs_zjj_migrate_index_stat_ol"), // 6.tableData
            this.axiosRquest("zs_kk_flow_warn_pic_link"),
            this.axiosRquest("zs_kk_minute_stat_rt_gs"), // 8.chart1

            this.axiosRquest("zs_kk_minute_stat_rt_zjj"), // chart2
            // this.axiosRquest("zs_kk_minute_stat_rt_ht"), // chart3
            this.axiosRquest("zs_path_min_pass_time_stat_rt"),
            this.axiosRquest("zs_48h_wheather_stat_ol"), // 11.tianqi
            this.axiosRquest("zs_kk_minute_stat_instant"), // 12.瞬时流量
            this.axiosRquest("zs_kk_jrzjj_city_flow_stat_rt"), // 13.radar2 / tableData2
            this.axiosRquest("zs_kk_day_flow_index_rt"), // 14.指数
            this.axiosRquest("zs_kk_minute_stat_ft_zsx"), // 15.预测line1
            this.axiosRquest("zs_kk_minute_stat_ft_zjj"), // 16.预测line2
          ])
          .then(
            axios.spread((res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, res11, res12, res13, res14, res15, res16) => {
              console.log("==========", res1, res3, res4)
              var now = new Date()
              var h = now.getHours()
              var m = now.getMinutes()
              var s = now.getSeconds()
              console.log(`刷新接口时间: ${h}: ${m}: ${s}`)
              this.indexList = [res14.find(e => e.kk_id == 1).flow_index, res14.find(e => e.kk_id == 2).flow_index, res14.find(e => e.kk_id == 3).flow_index]
              let { weather, temperature, wind } = res11[0]
              this.weatherData = [weather, temperature, wind]
              this.goonFlow = [res12.find(e => e.kk_type == 7).kk_flow, res12.find(e => e.kk_type == 8).kk_flow]
              this.lastWeek =
                /* res1
                .filter(e => e.dt_type == "last_week")
                .sort((obj1, obj2) => obj1.kk_type - obj2.kk_type)
                .map(e => e.rate + "") */
                [
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 1)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 2)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 3)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 4)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 5)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 6)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 7)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 8)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 9)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 10)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 11)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 12)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 13)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 14)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 15)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_week").find(e => e.kk_type == 16)?.rate || "0",
                ]
              this.lastDay =
                /* res1
                .filter(e => e.dt_type == "last_day")
                .sort((obj1, obj2) => obj1.kk_type - obj2.kk_type)
                .map(e => e.rate ) */
                [
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 1)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 2)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 3)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 4)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 5)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 6)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 7)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 8)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 9)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 10)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 11)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 12)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 13)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 14)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 15)?.rate || "0",
                  res1.filter(e => e.dt_type == "last_day").find(e => e.kk_type == 16)?.rate || "0",
                ]
              this.radarData = res2.filter(e => e.kk_type == 7)
              this.radarData2 = res2
              // this.radarData = radarData_mock

              this.hourList = [
                res3.find(e => e.kk_type == 1)?.kk_flow || 0,
                res3.find(e => e.kk_type == 2)?.kk_flow || 0,
                res3.find(e => e.kk_type == 3)?.kk_flow || 0,
                res3.find(e => e.kk_type == 4)?.kk_flow || 0,
                res3.find(e => e.kk_type == 5)?.kk_flow || 0,
                res3.find(e => e.kk_type == 6)?.kk_flow || 0,
                res3.find(e => e.kk_type == 7)?.kk_flow || 0,
                res3.find(e => e.kk_type == 8)?.kk_flow || 0,
                res3.find(e => e.kk_type == 9)?.kk_flow || 0,
                res3.find(e => e.kk_type == 10)?.kk_flow || 0,
                res3.find(e => e.kk_type == 11)?.kk_flow || 0,
                res3.find(e => e.kk_type == 12)?.kk_flow || 0,
                res3.find(e => e.kk_type == 13)?.kk_flow || 0,
                res3.find(e => e.kk_type == 14)?.kk_flow || 0,
                res3.find(e => e.kk_type == 15)?.kk_flow || 0,
                res3.find(e => e.kk_type == 16)?.kk_flow || 0,
              ]
              this.dayList = [
                res4.find(e => e.kk_type == 1)?.kk_flow || 0,
                res4.find(e => e.kk_type == 2)?.kk_flow || 0,
                res4.find(e => e.kk_type == 3)?.kk_flow || 0,
                res4.find(e => e.kk_type == 4)?.kk_flow || 0,
                res4.find(e => e.kk_type == 5)?.kk_flow || 0,
                res4.find(e => e.kk_type == 6)?.kk_flow || 0,
                res4.find(e => e.kk_type == 7)?.kk_flow || 0,
                res4.find(e => e.kk_type == 8)?.kk_flow || 0,
                res4.find(e => e.kk_type == 9)?.kk_flow || 0,
                res4.find(e => e.kk_type == 10)?.kk_flow || 0,
                res4.find(e => e.kk_type == 11)?.kk_flow || 0,
                res4.find(e => e.kk_type == 12)?.kk_flow || 0,
                res4.find(e => e.kk_type == 13)?.kk_flow || 0,
                res4.find(e => e.kk_type == 14)?.kk_flow || 0,
                res4.find(e => e.kk_type == 15)?.kk_flow || 0,
                res4.find(e => e.kk_type == 16)?.kk_flow || 0,
              ]
              this.barData = res5

              /* let tableD = res6
                .filter(e => e.migrate_type == "0")
                .map(e => {
                  return { index: e.rank_id, path: e.route_line, ratio: e.migrate_rate, migrate_index: e.migrate_index }
                })
              this.tableData = [...tableD, ...tableD, ...tableD] */

              let tableD2_1 = res13
                .filter(e => e.kk_type == 7)
                .map((e, i) => {
                  return { path: e.car_type, ratio: e.flow_rate, kk_type: e.kk_type, index: i + 1 }
                })
              this.tableData2_1 = [...tableD2_1, ...tableD2_1, ...tableD2_1]

              let tableD2_2 = res13
                .filter(e => e.kk_type == 1)
                .map((e, i) => {
                  return { path: e.car_type, ratio: e.flow_rate, kk_type: e.kk_type, index: i + 1 }
                })
              this.tableData2_2 = [...tableD2_2, ...tableD2_2, ...tableD2_2]

              this.warningList = res7.filter(e => e.warn_code > 0)
              // this.warningList = [{ warn_code: 1, warn_desc: "xxx", create_time: "asfsdafsfsfsfsf" }]

              // 预警滚动
              this.$nextTick(() => {
                this.rollInit()
              })
              const compareTime = (a, b) => {
                const timeA = new Date(`1970-01-01T${a.kk_minute}`)
                const timeB = new Date(`1970-01-01T${b.kk_minute}`)
                return timeA - timeB
              }
              this.lineData1 = res8.sort(compareTime).reduce((accumulator, current) => {
                const kk_minutes = accumulator.map(item => item.kk_minute)
                if (!kk_minutes.includes(current.kk_minute)) {
                  accumulator.push(current)
                }
                return accumulator
              }, [])
              this.lineData1_forecast = [
                ...this.lineData1.map(e => ({ ...e, in_flow: "", out_flow: "" })),
                ...res15.sort(compareTime).reduce((accumulator, current) => {
                  const kk_minutes = accumulator.map(item => item.kk_minute)
                  if (!kk_minutes.includes(current.kk_minute)) {
                    accumulator.push(current)
                  }
                  return accumulator
                }, []),
              ]
              // console.log('res8',res8);
              this.lineData4 = res9.sort(compareTime).reduce((accumulator, current) => {
                const kk_minutes = accumulator.map(item => item.kk_minute)
                if (!kk_minutes.includes(current.kk_minute)) {
                  accumulator.push(current)
                }
                return accumulator
              }, [])
              this.lineData4_forecast = [
                ...this.lineData4.map(e => ({ ...e, in_flow: "", out_flow: "" })),
                ...res16.sort(compareTime).reduce((accumulator, current) => {
                  const kk_minutes = accumulator.map(item => item.kk_minute)
                  if (!kk_minutes.includes(current.kk_minute)) {
                    accumulator.push(current)
                  }
                  return accumulator
                }, []),
              ]
              console.log("res8", res8)
              console.log("res10", res10)
              let analyse_map = {
                1: "进岛AD朱家尖",
                2: "出岛DA朱家尖",
                3: "进岛AC东西快速路",
                4: "出岛CA东西快速路",
                5: "海天大道文化沈芦",
                6: "海天大道沈芦文化",
                7: "滨海大道兴建临长",
                8: "滨海大道临长兴建",
              }
              this.analyseList = res10.map(e => {
                return {
                  label: analyse_map[e.id] + ": " + e.pass_time_now + `(${e.pass_time_formal},  `,
                  index: e.pass_index,
                }
              })
              this.$nextTick(() => {
                this.radarChart()
                // this.barChart()
                this.lineCharts1()
                // this.lineCharts2()
                // this.lineCharts3()
                this.lineCharts4()
              })
            }),
          )
      } catch (err) {
        console.log(err)
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
    openHandle(item) {
      this.dialogShow3 = true
      // this.imgUrl = item.link_pic_url
    },
    rollInit() {
      if (this.warningList.length == 0) return
      const carouselList = document.getElementById("carousel-list")
      const carouselItems = carouselList.getElementsByTagName("li")
      // const carouselHeight = carouselItems[0].offsetHeight
      // console.log("carouselHeight", carouselHeight, carouselItems)
      let currentIndex = 0
      clearInterval(this._carouselInterval)
      this._carouselInterval = setInterval(() => {
        carouselList.style.transition = "transform 1s"
        currentIndex++
        if (currentIndex === carouselItems.length) {
          currentIndex = 0
          setTimeout(() => {
            carouselList.style.transition = "none"
            carouselList.style.transform = `translateY(0)`
          }, 1000)
        } else {
          carouselList.style.transform = `translateY(-${currentIndex * 45}rem)`
        }
      }, 2000)
    },
    getTableList() {
      this.setAnimationList("#box1", "movetop1", this.tableData)
    },
    setAnimationList(domId, keyframesName, list) {
      let dom = document.querySelector(domId)
      dom.style.animation = ""
      this.initAnimation(list.length, dom, keyframesName)
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
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(30 * index) / 2}rem; }\n`
        } else {
          str += `${(100 / (srcollLength * 4 + 1)) * index}%{ top: -${(30 * (index - 1)) / 2}rem; }\n`
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
    async tabChange(type) {
      this.tableTab = type
      let res = await this.axiosRquest("zs_zjj_migrate_index_stat_ol")
      let tableD = res
        .filter(e => e.migrate_type == type)
        .map(e => {
          return { index: e.rank_id, path: e.route_line, ratio: e.migrate_rate, migrate_index: e.migrate_index }
        })
      this.tableData = [...tableD, ...tableD, ...tableD]
      // console.log(tableD)
      this.getTableList()
      /* this.$nextTick(() => {
        this.rollInit()
      }) */
    },
    computedREM() {
      let change = () => {
        document.documentElement.style.fontSize = document.documentElement.clientHeight / 1080 + "px"
        if (this._myChart1) {
          this._myChart1.resize()
          this._myChart4.resize()
          this._myChart_radar.resize()
        }
      }
      change()
      window.addEventListener("resize", change, false)
    },
    lineCharts1() {
      console.log(
        "chart1",
        this.lineData1
          .map((e, i) => {
            return e.kk_minute.substring(0, 5)
          })
          .slice(-2)[0],
        this.lineData1
          .map((e, i) => {
            return e.kk_minute.substring(0, 5)
          })
          .slice(-2)[1],
      )
      let option = {
        grid: {
          top: 25,
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
          data: ["入岛流量", "离岛流量"],
          icon: "rect",
          itemHeight: 5,
          itemWidth: 15,
          right: 0,
          top: 0,
          textStyle: {
            fontSize: 10,
            color: "#E6FAFF",
          },
        },
        xAxis: {
          type: "category",
          data: this.lineData1_forecast.map((e, i) => {
            if (i == 0) {
              return "00:00"
            }
            return e.kk_minute.substring(0, 5)
          }),
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
            name: "入岛流量",
            data: this.lineData1.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
            markArea: {
              itemStyle: {
                color: "#fff",
              },
              data: [
                [
                  {
                    xAxis: this.lineData1
                      .map((e, i) => {
                        return e.kk_minute.substring(0, 5)
                      })
                      .slice(-2)[0],
                  },
                  {
                    xAxis: this.lineData1
                      .map((e, i) => {
                        return e.kk_minute.substring(0, 5)
                      })
                      .slice(-2)[1],
                  },
                ],
              ],
            },
          },
          {
            name: "离岛流量",
            data: this.lineData1.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          {
            name: "入岛流量预测",
            data: this.lineData1_forecast.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
              type: "dashed",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          },
          {
            name: "离岛流量预测",
            data: this.lineData1_forecast.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
              type: "dashed",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          /* {
            name: "入舟存量",
            data: this.lineData1.map(e => e.sum_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          }, */
        ],
      }
      if (!this._myChart1) {
        this._myChart1 = echarts.init(document.querySelector(".line-charts1"))
      }
      this._myChart1.setOption(option)
    },
    lineCharts2() {
      let option = {
        grid: {
          top: 20,
          left: 40,
          bottom: 20,
          right: 0,
        },
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "单位",
          textStyle: {
            fontSize: 12,
            color: "#97BED4",
          },
        },
        legend: {
          data: ["入岛流量", "离岛流量"],
          icon: "rect",
          itemHeight: 5,
          itemWidth: 15,
          right: 0,
          top: 0,
          textStyle: {
            fontSize: 10,
            color: "#E6FAFF",
          },
        },
        xAxis: {
          type: "category",
          data: this.lineData2.map((e, i) => {
            if (i == 0) {
              return "00:00"
            }
            return e.kk_minute.substring(0, 5)
          }),
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
            name: "入岛流量",
            data: this.lineData2.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          },
          {
            name: "离岛流量",
            data: this.lineData2.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          /* {
            name: "入舟存量",
            data: this.lineData2.map(e => e.sum_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          }, */
        ],
      }
      if (!this._myChart2) {
        this._myChart2 = echarts.init(document.querySelector(".line-charts2"))
      }
      this._myChart2.setOption(option)
    },
    lineCharts3() {
      let option = {
        grid: {
          top: 20,
          left: 40,
          bottom: 20,
          right: 0,
        },
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "单位",
          textStyle: {
            fontSize: 12,
            color: "#97BED4",
          },
        },
        legend: {
          data: ["入岛流量", "离岛流量"],
          icon: "rect",
          itemHeight: 5,
          itemWidth: 15,
          right: 0,
          top: 0,
          textStyle: {
            fontSize: 10,
            color: "#E6FAFF",
          },
        },
        xAxis: {
          type: "category",
          data: this.lineData3.map((e, i) => {
            if (i == 0) {
              return "00:00"
            }
            return e.kk_minute.substring(0, 5)
          }),
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
            name: "入岛流量",
            data: this.lineData3.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          },
          {
            name: "离岛流量",
            data: this.lineData3.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          /* {
            name: "入舟存量",
            data: this.lineData3.map(e => e.sum_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          }, */
        ],
      }
      if (!this._myChart3) {
        this._myChart3 = echarts.init(document.querySelector(".line-charts3"))
      }
      this._myChart3.setOption(option)
    },
    lineCharts4() {
      let option = {
        grid: {
          top: 25,
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
            // padding: [20, 0, 20, 0],
          },
        },
        legend: {
          data: ["入岛流量", "离岛流量"],
          icon: "rect",
          itemHeight: 5,
          itemWidth: 15,
          right: 0,
          top: 0,
          textStyle: {
            fontSize: 10,
            color: "#E6FAFF",
          },
        },
        xAxis: {
          type: "category",
          data: this.lineData4_forecast.map((e, i) => {
            if (i == 0) {
              return "00:00"
            }
            return e.kk_minute.substring(0, 5)
          }),
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
            name: "入岛流量",
            data: this.lineData4.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
            markArea: {
              itemStyle: {
                color: "#fff",
              },
              data: [
                [
                  {
                    xAxis: this.lineData4
                      .map((e, i) => {
                        return e.kk_minute.substring(0, 5)
                      })
                      .slice(-2)[0],
                  },
                  {
                    xAxis: this.lineData4
                      .map((e, i) => {
                        return e.kk_minute.substring(0, 5)
                      })
                      .slice(-2)[1],
                  },
                ],
              ],
            },
          },
          {
            name: "离岛流量",
            data: this.lineData4.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          {
            name: "入岛流量预测",
            data: this.lineData4_forecast.map(e => e.in_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
              type: "dashed",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          },
          {
            name: "离岛流量预测",
            data: this.lineData4_forecast.map(e => e.out_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "#19D6FF",
            lineStyle: {
              color: "#19D6FF",
              type: "dashed",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#19D6FF",
                },
                {
                  offset: 1,
                  color: "rgba(25,214,255,0.2)",
                },
              ]),
            },
          },
          /* {
            name: "入舟存量",
            data: this.lineData3.map(e => e.sum_flow),
            type: "line",
            showSymbol: false,
            smooth: true,
            color: "rgba(255,156,115)",
            lineStyle: {
              color: "rgba(255,156,115)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,156,115)",
                },
                {
                  offset: 1,
                  color: "rgba(255,156,115,0.2)",
                },
              ]),
            },
          }, */
        ],
      }
      if (!this._myChart4) {
        this._myChart4 = echarts.init(document.querySelector(".line-charts4"))
      }
      this._myChart4.setOption(option)
    },
    barChart() {
      let echartData = this.barData
        .map(e => {
          return {
            name: e.flow_time.substring(5, 10),
            value: e.flow_num,
          }
        })
        .reverse()

      let xAxisData = echartData.map(v => v.name)
      let yAxisData = echartData.map(v => v.value)
      let option = {
        // backgroundColor:"#000",
        grid: {
          // show: true,
          left: "30",
          top: "30",
          right: "30",
          bottom: "30",
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
          {
            type: "slider",
            width: "85%",
            height: 10,
            bottom: 0,
            zoomLock: true,
            brushSelect: false,
            minValueSpan: 5,
            maxValueSpan: 5,
            start: 100,
          },
        ],
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLine: {
            // 轴线
            show: true,
            lineStyle: {
              color: "#268C8C",
            },
          },
          axisLabel: {
            color: "#97BED4",
            fontSize: "12",
            interval: 0,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "单位",
          nameTextStyle: {
            color: "#97BED4",
            fontSize: 12,
            padding: [0, 0, 0, -30], //name文字位置 对应 上右下左
          },
          type: "value",
          // max: 500,
          // y轴线
          axisLine: {
            show: false,
          },
          // 轴文字
          axisLabel: {
            color: "#97BED4",
            fontSize: 12,
          },
          // 网格线
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
            // name: "集团各板块资产负债率",
            type: "bar", //设置类型为象形柱状图
            barWidth: "20", //柱图宽度
            itemStyle: {
              normal: {
                color: function (params) {
                  return {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#19d6ff", //
                      },
                      {
                        offset: 1,
                        color: "rgba(25,214,255,0.5)", // 0% 处的颜色
                      },
                    ],
                  }
                },
              },
            },
            label: {
              show: true,
              position: "top",
              color: "#fff",
            },
            z: 10,
            zlevel: 0,
            data: yAxisData,
          },
          {
            type: "pictorialBar", //设置类型为象形柱状图
            symbol: "rect", //图形类型，带圆角的矩形
            symbolMargin: "4", //图形垂直间隔
            tooltip: {
              show: false,
            },
            // 分隔
            itemStyle: {
              normal: {
                color: "#0F375F",
              },
            },
            symbolRepeat: "fixed",
            symbolClip: true,
            symbolSize: [20, 2],
            symbolPosition: "start",
            symbolOffset: [0, -1],
            // symbolBoundingData: this.total,
            width: "100%",
            z: 0,
            zlevel: 1,
            data: yAxisData,
          },
        ],
      }
      // if (!this._myChart5) {
      this._myChart5 = echarts.init(document.querySelector(".bar-chart"))
      // }
      this._myChart5.setOption(option)
    },
    radarChart() {
      let maxObj = this.radarData.reduce((max, currentObj) => {
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
            indicator: this.radarData.map(e => {
              return { text: `${e.car_type}: ${e.flow_rate}`, max: maxObj.kk_flow }
            }),
            center: ["46%", "50%"],
            radius: 50,
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
                value: this.radarData.map(e => e.kk_flow),
                // name: "A Software",
                areaStyle: {
                  color: "rgba(13, 121, 211, 0.6)",
                },
              },
            ],
          },
        ],
      }
      if (!this._myChart_radar) {
        this._myChart_radar = echarts.init(document.querySelector(".radar-chart"))
      }
      this._myChart_radar.setOption(option)
    },
    openDialog2(type) {
      this.dialogType = type
      this.dialogShow2 = true
      this.dialogShow4 = false
      this.dialogShow5 = false
      if (type == 3) {
        this.$nextTick(() => {
          this.barChart()
        })
      } else if (type == 2) {
        /*  this.$nextTick(() => {
          this.getTableList()
        }) */
      } else if (type == 4) {
        this.dialogShow2 = false
        this.dialogShow4 = true
      } else if (type == 5) {
        this.dialogShow2 = false
        this.dialogShow5 = true
      }
    },
  },
  created() {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 1000 * 60 * 10)
  },
  mounted() {
    this.computedREM()
    /* window.addEventListener("resize", () => {
      this._myChart1.resize()
      this._myChart4.resize()
      this._myChart_radar.resize()
    }) */
  },
}
</script>

<style lang="less">
#app {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  color: #fff;
  background-color: #000;
  position: relative;
  background: url(~@/assets/daliuliang/bottom2.png) bottom/contain no-repeat, url(~@/assets/daliuliang/bg.png) center/cover no-repeat;
  .dialog {
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
    .picture {
      width: 867rem;
      height: 580rem;
      img {
        width: 100%;
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
  .dialog2 {
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
      width: 867rem;
      height: 580rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .stop_car {
        zoom: 1.5;
        font-size: 20rem;
        font-family: newFont;
        .label_title {
          margin-top: 10rem;
        }
        .stop_card {
          display: inline-block;
          font-size: 16rem;
          width: 165rem;
          height: 55rem;
          background: url(~@/assets/daliuliang/stop_card1.svg) center/contain no-repeat, url(~@/assets/daliuliang/stop_card2.svg) left/69rem 64rem no-repeat;
          .label_one {
            text-align: right;
            padding: 5rem 10rem 0 0;
          }
          .label_two {
            font-size: 18rem;
            text-align: right;
            padding: 0 10rem 0 0;
          }
        }
      }
      .table_move {
        zoom: 1.5;
        width: 350rem;
        padding-right: 26rem;
        .table_one {
          margin: 10rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .btns {
            display: flex;
            .btn1,
            .btn2 {
              margin-right: 10rem;
              width: 56rem;
              height: 25rem;
              line-height: 25rem;
              text-align: center;
              cursor: pointer;
              background: url(~@/assets/daliuliang/btn1.png) center/contain no-repeat;
            }
            .isAcitve {
              background: url(~@/assets/daliuliang/btn2.png) center/contain no-repeat;
            }
          }
          .migration {
            padding: 5rem 15rem;
            background-color: rgba(18, 137, 221, 0.3);
            span {
              font-family: newFont;
              padding-left: 5rem;
            }
          }
        }
        .table_two {
          overflow: hidden;
          height: 180rem;
          .table_th {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 30rem;
            & > div {
              text-align: center;
            }
            .th_one {
              width: 50rem;
            }
            .th_two {
              width: 50rem;
              text-align: left;
            }
          }
          .roll-box {
            position: relative;
            overflow: hidden;
            height: 150rem;
            .table_td {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 30rem;

              & > div {
                text-align: center;
              }
              .td_one {
                display: flex;
                align-items: center;
                .table_icon {
                  display: inline-block;
                  background: url(~@/assets/daliuliang/table-icon.png) center/30rem no-repeat;
                  width: 30rem;
                  height: 30rem;
                }
              }
              .td_two {
                width: 100rem;
                margin-left: 37rem;
                text-align: left;
              }
            }
            .table_td:nth-of-type(even) {
              background: rgba(25, 214, 255, 0.1);
            }
            #box1 {
              position: absolute;
              width: 100%;
            }
            .animation-stop {
              animation-play-state: paused !important;
            }
            .animation-start {
              animation-play-state: running !important;
            }
          }
        }
      }
      .bar-chart {
        width: (350 * 1.5rem);
        height: (180 * 1.5rem);
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
  .weather {
    position: absolute;
    top: 18rem;
    right: 373rem;
    width: 177rem;
    height: 100rem;
    background: url(~@/assets/tianqi.png) center/cover no-repeat;
    z-index: 20;
    padding: 12rem 20rem;
    .weather_item1 {
      font-size: 18rem;
      font-weight: 600;
    }
    .weather_item2 {
      font-size: 18rem;
      font-weight: 600;
    }
    .weather_item3 {
      font-size: 12rem;
    }
  }
  .map {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1201rem;
    height: 1008rem;
    background: url(~@/assets/daliuliang/img.png) bottom center/1201rem 1008rem no-repeat;
    opacity: 0.8;

    .liuliang_card {
      position: absolute;
      right: 286rem;
      bottom: 255rem;
      width: 230rem;
      height: 119rem;
      padding: 24rem 38rem;
      background: url(~@/assets/liuliang.png) center/cover no-repeat;
      .liuliang_title {
        font-size: 16rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ff9c73;
        margin-bottom: 10rem;
      }
      .liuliang_content {
        display: flex;
        align-items: center;
        .liuliang_item {
          .liuliang_name {
            font-size: 14rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
          .liuliang_num {
            font-size: 18rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }
        }
        .liuliang_line {
          width: 3rem;
          height: 30rem;
          background: #ffffff;
          border-radius: 2rem;
          opacity: 0.65;
          margin-right: 10rem;
        }
      }
    }
  }
  .top-bar {
    position: absolute;
    z-index: 3;
    font-family: "newFont";
    width: 100%;
    height: 112rem;
    text-align: center;
    line-height: 100rem;
    font-size: 40rem;
    background: url(~@/assets/daliuliang/top_bg.png) center top/1630rem no-repeat;
  }
  .bottom-bar {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: url(~@/assets/daliuliang/bottom.png) center bottom/1778rem no-repeat;
    height: 63rem;
    text-align: center;
    img {
      width: 92rem;
      margin-top: 31rem;
      cursor: pointer;
    }
    .bottom_btn {
      position: absolute;
      bottom: 1rem;
      z-index: 3;
      font-size: 15rem;
      width: 163rem;
      height: 44rem;
      padding: 10rem 0 0 7rem;
      cursor: pointer;
      background: url(~@/assets/daliuliang/card_small.png) center/163rem 44rem no-repeat;
    }
    .pass-analyse {
      .analyse_item {
        position: absolute;
        z-index: 2;
        top: -117rem;
        right: 355rem;
        width: 268rem;
        height: 150rem;
        padding: 12rem 0 0 34rem;
        background: url(~@/assets/daliuliang/alarm_tooltip.png) top right/268rem 140rem no-repeat, url(~@/assets/daliuliang/alarm_tooltip.png) top right/268rem 140rem no-repeat,
          url(~@/assets/daliuliang/alarm_tooltip.png) top right/268rem 140rem no-repeat;
        .icon-row {
          display: flex;
          align-items: center;
          span {
            font-size: 22rem;
            color: #ff9c73;
            font-weight: 600;
          }
        }
        .row-label {
          font-size: 12rem;
          text-align: left;
          margin-block: 1rem;
        }
      }
    }
  }
  .contain {
    width: 100%;
    display: flex;
    margin-top: 112rem;
    // align-items: center;
    justify-content: space-between;
  }
  .left-box {
    margin-left: 35rem;
    transform: translateY(-70rem);
  }
  .right-box {
    transform: translateY(-70rem);
    display: flex;
    flex-direction: column;
    .radar-chart {
      width: 350rem;
      height: 190rem;
    }
    .bar-chart {
      width: 350rem;
      height: 180rem;
    }
    .stop_car {
      font-size: 20rem;
      font-family: newFont;
      .label_title {
        margin-top: 10rem;
      }
      .stop_card {
        display: inline-block;
        font-size: 16rem;
        width: 165rem;
        height: 55rem;
        background: url(~@/assets/daliuliang/stop_card1.svg) center/contain no-repeat, url(~@/assets/daliuliang/stop_card2.svg) left/69rem 64rem no-repeat;
        .label_one {
          text-align: right;
          padding: 5rem 10rem 0 0;
        }
        .label_two {
          font-size: 18rem;
          text-align: right;
          padding: 0 10rem 0 0;
        }
      }
    }
    .cards {
      transform: translateY(-10rem);
    }
    .title_label {
      transform: translateY(-5rem);
    }
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    width: 350rem;
    // height: 100rem;
    .card_small {
      opacity: 0.8;
      transform: translateY(7rem);
      width: 163rem;
      height: 55rem;
      padding: 5rem 0 0 20rem;
      background: url(~@/assets/daliuliang/card_small.png) center/163rem 55rem no-repeat;
      .row-one {
        font-size: 12rem;
      }
      .row-two {
        font-family: newFont;
        font-size: 22rem;
      }
    }
    .card_big {
      opacity: 0.8;
      padding: 5rem 0 0 20rem;
      width: 163rem;
      height: 95rem;
      background: url(~@/assets/daliuliang/card_big.png) center/163rem 105rem no-repeat;
      .row-one {
        font-size: 12rem;
      }
      .row-two {
        font-family: newFont;
        font-size: 22rem;
      }
      .row-three {
        font-size: 12rem;
        .row-three-one,
        .row-three-two {
          display: flex;
          align-items: center;
        }
        .icon1_img {
          display: inline-block;
          width: 14rem;
          height: 14rem;
          background: url(~@/assets/daliuliang/icon1.png) center/25rem no-repeat;
        }
        .red-num {
          color: #ff9c73;
          font-weight: 600;
        }
        .blue-num {
          color: #00a3e5;
          font-weight: 600;
        }
      }
    }
  }
  .title_oneself {
    font-family: newFont;
    font-size: 22rem;
    padding-left: 8rem;
  }
  .line-charts1,
  .line-charts2,
  .line-charts3,
  .line-charts4 {
    width: 320rem;
    height: 210rem;
    margin-bottom: 10rem;
  }
  .table_move {
    width: 350rem;
    padding-right: 26rem;
    .table_one {
      margin: 10rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btns {
        display: flex;
        .btn1,
        .btn2 {
          margin-right: 10rem;
          width: 56rem;
          height: 25rem;
          line-height: 25rem;
          text-align: center;
          cursor: pointer;
          background: url(~@/assets/daliuliang/btn1.png) center/contain no-repeat;
        }
        .isAcitve {
          background: url(~@/assets/daliuliang/btn2.png) center/contain no-repeat;
        }
      }
      .migration {
        padding: 5rem 15rem;
        background-color: rgba(18, 137, 221, 0.3);
        span {
          font-family: newFont;
          padding-left: 5rem;
        }
      }
    }
    .table_two {
      overflow: hidden;
      height: 180rem;
      .table_th {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30rem;
        & > div {
          text-align: center;
        }
        .th_one {
          width: 50rem;
        }
        .th_two {
          width: 50rem;
          text-align: left;
        }
      }
      .roll-box {
        position: relative;
        overflow: hidden;
        height: 150rem;
        .table_td {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30rem;

          & > div {
            text-align: center;
          }
          .td_one {
            display: flex;
            align-items: center;
            .table_icon {
              display: inline-block;
              background: url(~@/assets/daliuliang/table-icon.png) center/30rem no-repeat;
              width: 30rem;
              height: 30rem;
            }
          }
          .td_two {
            width: 100rem;
            margin-left: 37rem;
            text-align: left;
          }
        }
        .table_td:nth-of-type(even) {
          background: rgba(25, 214, 255, 0.1);
        }
        #box1 {
          position: absolute;
          width: 100%;
        }
        .animation-stop {
          animation-play-state: paused !important;
        }
        .animation-start {
          animation-play-state: running !important;
        }
      }
    }
  }
  .alarm-warning {
    padding-left: 72rem;
    padding-bottom: 6rem;
    position: absolute;
    z-index: 2;
    top: 254rem;
    left: 50%;
    width: 850rem;
    height: 97rem;
    transform: translateX(-50%);
    font-size: 25rem;
    line-height: 25rem;
    background: url(~@/assets/daliuliang/alarm.png) center/850rem 97rem no-repeat;
    display: flex;
    align-items: center;
    .carousel-container {
      overflow: hidden;
      height: 45rem;
    }

    #carousel-list {
      list-style: none;
      margin: 0;
      padding: 0;
      position: relative;
    }

    #carousel-list li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45rem;
    }
    .alarm-content {
      display: flex;
      align-items: center;
      span {
        width: 573rem;
        display: inline-block;
      }
    }
    img {
      transform: translateY(2rem);
    }
    .alarm_btn {
      margin-left: 10rem;
      font-family: newFont;
      font-size: 18rem;
      width: 81rem;
      height: 34rem;
      line-height: 35rem;
      display: inline-block;
      text-align: center;
      background: url(~@/assets/daliuliang/alarm-btn.png) center/81rem 56rem no-repeat;
      cursor: pointer;
    }
  }
  .alarm-warning_more {
    top: 340rem;
  }
  .time-warning {
    padding-left: 70rem;
    padding-bottom: 9rem;
    position: absolute;
    z-index: 2;
    top: 135rem;
    left: 50%;
    width: 850rem;
    height: 134rem;
    transform: translateX(-50%);
    // font-size: 25rem;
    // line-height: 25rem;
    background: url(~@/assets/daliuliang/alarm.png) top center/850rem 134rem no-repeat;
    display: flex;
    align-items: center;
    .time_title {
      font-size: 24rem;
      color: #ff9c73;
      font-weight: 600;
    }
    .row-label {
      display: inline-block;
      width: 356rem;
      font-size: 18rem;
      text-align: left;
    }
    .get_more {
      text-align: center;
      padding-right: 69rem;
      padding-top: 3rem;
      font-size: 16rem;
      filter: drop-shadow(#0075ff 0px 0px 8px);
      color: #00a3e5;
      cursor: pointer;
      i {
        transform: rotate(90deg);
      }
    }
  }
  .time-warning_more {
    padding-bottom: 0;
    background: url(~@/assets/daliuliang/alarm.png) top center/850rem 220rem no-repeat !important;
    height: 202rem;
    .get_more {
      padding-right: 69rem !important;
    }
    i {
      transform: rotate(-90deg) !important;
    }
  }
  .tooltip_item {
    position: absolute;
    z-index: 2;
    left: 1269rem;
    top: 579rem;
    width: 260rem;
    height: 150rem;
    background: url(~@/assets/daliuliang/alarm_tooltip.png) top right/252rem 140rem no-repeat, url(~@/assets/daliuliang/alarm_tooltip.png) top right/252rem 140rem no-repeat,
      url(~@/assets/daliuliang/alarm_tooltip.png) top right/252rem 140rem no-repeat, url(~@/assets/daliuliang/map_icon1.png) bottom left/30rem no-repeat,
      url(~@/assets/daliuliang/map_icon2.png) bottom left/30rem no-repeat;
    padding: 15rem 0 0 40rem;
    .icon-row {
      display: flex;
      align-items: center;

      .icon_alarm {
        width: 30rem;
        height: 30rem;
        background: url(~@/assets/daliuliang/warning_icon2.svg) center/40rem no-repeat;
      }
      span {
        font-size: 18rem;
      }
    }
    .row-two {
      font-size: 22rem;
      font-weight: 600;
      color: #ff9c73;
    }
    .row-three,
    .row-four {
      font-size: 12rem;
    }
  }
}
@font-face {
  font-family: "newFont";
  src: url("./assets/daliuliang/newFont.ttf");
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
</style>
