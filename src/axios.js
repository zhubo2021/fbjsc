import axios from "axios"

axios.interceptors.response.use(
  function (response) {
    if (response.data.data) {
      return JSON.parse(response.data.data)
    } else {
      console.log("--------", response)
      return Promise.reject(null)
    }
  },
  function (error) {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)
export default axios
