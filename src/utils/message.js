import { Notification, Message } from 'element-ui'

const defaultOptions = {
  showClose: true
}

const titleMap = {
  success: '成功',
  error: '错误',
  info: '提示',
  warning: '警告'
}

export function $message(options) {
  const mergedOptions = { ...defaultOptions, ...options }
  return Message(mergedOptions)
}

export function $notify(options) {
  const mergedOptions = { ...defaultOptions, ...options }
  mergedOptions.title = titleMap[mergedOptions.type]
  return Notification(mergedOptions)
}
