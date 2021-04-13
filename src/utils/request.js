import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
let num = "Bearer "
axios.defaults.headers.common["Authorization"] =  num+localStorage.getItem('token')
export default axios
