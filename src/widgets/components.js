import Vue from 'vue'
import TooltipButton from '@/components/TooltipButton/index'
import PopConfirmButton from '@/components/PopConfirmButton/index'
import FormDialog from '@/components/FormDialog/FormDialog'

// eslint-disable-next-line import/newline-after-import
;[TooltipButton, PopConfirmButton, FormDialog].forEach((component) => {
  Vue.use(component)
})
