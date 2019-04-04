import data from './data'
import config from './config'
import template from './template'
import event from './event'

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

const delayTime = config.hideDelay * 1000

const main = () => {
  const html = template(data)
  parentElmt().insertAdjacentHTML('beforeend', html)
  const container = document.getElementById('gbf-bookmark-lacia')
  const time = getTime()
  let hideTimer
  const delayHide = () => {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      container.style.opacity = 0
    }, delayTime)
  }
  if (Date.now() - time > delayTime) {
    container.style.opacity = 0
  } else {
    delayHide()
  }
  container.addEventListener('mouseenter', function () {
    recordTime()
    clearTimeout(hideTimer)
    container.style.opacity = 1
  })
  container.addEventListener('mouseleave', function () {
    recordTime()
    delayHide()
  })
  event()
}

document.addEventListener('DOMContentLoaded', main)
