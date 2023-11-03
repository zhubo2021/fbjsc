let percentage = 0

const api = {
  vuexInitQuery() {
    return new Promise(resolve => {
      let data = {
        msg: "初始化数据",
        column: [
          {
            value: "date",
            label: "日期",
          },
          {
            value: "name",
            label: "名字",
          },
          {
            value: "address",
            label: "地址",
          },
        ],
      }
      resolve(data)
    })
  },
  progressing() {
    return new Promise(resolve => {
      percentage += 4
      let data = {
        msg: "初始化数据",
        percentage,
      }
      resolve(data)
    })
  },
}

export default api
