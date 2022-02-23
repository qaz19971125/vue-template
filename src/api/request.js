import axios from 'axios'
import { Notification } from 'element-ui'
import { isDevelopment } from '@/utils/index'
import qs from 'qs'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000
})

const CancelToken = axios.CancelToken
const pendingRequest = new Map()

function parseQuery(config) {
  const { params } = config
  // get参数编码
  if (params) {
    let { url } = config
    url = url.indexOf('?') === -1 ? url + '?' : url
    for (const key in params) {
      url += `${key}=${encodeURIComponent(params[key])}&`
    }
    url = url.substring(0, url.length - 1) // 去除尾部&
    config.params = {}
    config.url = url
  }
}

function generateReqKey(config) {
  const { method, url, data } = config
  return [method, url, qs.stringify(data)].join('&')
}

function addPendingRequest(config) {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

function removePendingRequest(config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(`重复请求：${requestKey}`)
    pendingRequest.delete(requestKey)
  }
}

// request interceptor
axiosInstance.interceptors.request.use(
  // modify config before send request
  (config) => {
    parseQuery(config)
    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  (error) => {
    if (isDevelopment()) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const { data: res, config } = response
    removePendingRequest(config)
    if (Number(res.code) === 0) {
      Notification({
        title: '错误',
        message: res.msg || res.message || 'Error',
        type: 'error',
        duration: 3 * 1000,
        showClose: true
      })
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    }

    return res
  },
  (error) => {
    const { config } = error
    removePendingRequest(config)
    if (isDevelopment()) {
      Notification({
        title: '错误',
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
