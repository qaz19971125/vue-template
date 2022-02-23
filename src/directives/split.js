function processSplitStyle(isVertical) {
  return isVertical
    ? `
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5px;
    cursor: ns-resize;
    `
    : `
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    cursor: ew-resize;
    `
}

export default {
  name: 'split',
  handler: {
    inserted(el, binding) {
      let splitHandler
      const { modifiers, value = {} } = binding
      const isVertical = modifiers.vertical // 分割方向
      let { min, max } = value

      min = min || isVertical ? el.offsetHeight : el.offsetWidth
      max = max || isVertical ? el.parentNode.offsetHeight * 0.7 : el.parentNode.offsetWidth * 0.7

      const splitDom = document.createElement('div')
      splitDom.style.cssText = isVertical ? processSplitStyle(true) : processSplitStyle(false)

      splitDom.addEventListener('mousedown', (e) => {
        const initialLength = isVertical ? el.offsetHeight : el.offsetWidth
        const initialPosition = isVertical ? e.clientY : e.clientX

        splitHandler = (e) => {
          const mouseMoveLength = isVertical
            ? e.clientY - initialLength
            : e.clientX - initialPosition

          let finalLength = initialLength + mouseMoveLength
          finalLength = finalLength < min ? min : finalLength
          finalLength = finalLength > max ? max : finalLength

          if (isVertical) {
            el.style.height = `${finalLength}px`
          } else {
            el.style.width = `${finalLength}px`
          }
        }

        window.addEventListener('mousemove', splitHandler)
        const mouseup = window.addEventListener('mouseup', () => {
          window.removeEventListener('mousemove', splitHandler)
          window.removeEventListener('mouseup', mouseup)
        })
      })

      el.appendChild(splitDom)
    }
  }
}
