export default {
  inserted: function (el) {
    const { cursor: originCursor, position } = window.getComputedStyle(el)
    el.onmouseenter = function () {
      el.style.cursor = 'move'
    }
    el.onmouseleave = function () {
      el.style.cursor = originCursor
    }
    const isAbsolute = ['absolute', 'fixed'].includes(position)
    if (!isAbsolute) {
      el.style.position = 'absolute'
    }
    const maxOffsetLeft = el.offsetParent.clientWidth - el.offsetWidth
    const maxOffsetTop = el.offsetParent.clientHeight - el.offsetHeight
    el.onmousedown = function (e) {
      const { offsetLeft: startOffsetLeft, offsetTop: startOffsetTop } = el
      const { clientX: startX, clientY: startY } = e
      document.onmousemove = function (e) {
        const { clientX: endX, clientY: endY } = e

        const endOffsetLeft = Math.min(Math.max(endX - startX + startOffsetLeft, 0), maxOffsetLeft)
        const endOffsetTop = Math.min(Math.max(endY - startY + startOffsetTop, 0), maxOffsetTop)

        el.style.left = `${endOffsetLeft}px`
        el.style.top = `${endOffsetTop}px`
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
