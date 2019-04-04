import data from './data'
import config from './config'
import template from './template'
import event from './event'
import { applyConfig, initIpt } from './config'

const recordTime = () => {
  localStorage.setItem('gbf-bookmark:time', Date.now())
}

const getTime = () => {
  let time = 0
  try {
    const _time = parseInt(localStorage.getItem('gbf-bookmark:time'), 10)
    if (_time) time = _time
  } catch (e) {

  }
  return time
}

const parentElmt = () => {
  let elmt = document.getElementById('mobage-game-container')
  if (!elmt) elmt = document.body
  return elmt
}

const main = () => {
  try {
    const html = template(data.list)
    parentElmt().insertAdjacentHTML('beforeend', html)
    const container = document.getElementById('gbf-bookmark-lacia')
    const time = getTime()
    let hideTimer
    const delayHide = () => {
      if (config.hideDelay <= 0) return
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => {
        container.style.opacity = 0
      }, config.hideDelay * 1000)
    }

    container.addEventListener('mouseenter', function () {
      if (config.hideDelay <= 0) return
      recordTime()
      clearTimeout(hideTimer)
      container.style.opacity = 1
    })
    container.addEventListener('mouseleave', function () {
      if (config.hideDelay <= 0) return
      recordTime()
      delayHide()
    })
    event()
    initIpt()
    applyConfig()
    if (Date.now() - time > config.hideDelay * 1000 && config.hideDelay > 0) {
      container.style.opacity = 0
    } else {
      delayHide()
    }
  } catch (e) {
    console.error(e)
  }
}

document.addEventListener('DOMContentLoaded', main)
