const config = {
  position: 'left',
  hideDelay: 10,
  animation: true,
  margin: 4,
  size: 2,
  align: 'left',
  mixed: 'yes'
}

const getLocalConfig = () => {
  try {
    let _config = JSON.parse(localStorage.getItem('gbf-bookmark:config'))
    if (_config) {
      if (_config.hideDelay) {
        _config.hideDelay = _config.hideDelay | 0
      }
      if (_config.margin) {
        _config.margin = _config.margin | 0
      }
      Object.assign(config, _config)
    }
  } catch (e) {

  }
}

getLocalConfig()

const applyConfig = () => {
  const cont = document.getElementById('gbf-bookmark-lacia')
  if (config.position === 'left') {
    cont.classList.remove('bookmark-right')
  } else {
    cont.classList.add('bookmark-right')
  }
  if (config.mixed === 'yes') {
    cont.classList.remove('not-mixed-bookmark')
  } else {
    cont.classList.add('not-mixed-bookmark')
  }
  cont.classList.remove('align-left-bookmark', 'align-center-bookmark', 'align-right-bookmark')
  cont.classList.add(`align-${config.align}-bookmark`)
  cont.classList.remove('autohide-bookmark', 'keep-bookmark', 'full-bookmark')
  cont.classList.remove('keep-bookmark')
  if (config.hideDelay === 0) {
    cont.classList.add('autohide-bookmark')
  } else if (config.hideDelay === -1) {
    cont.classList.add('keep-bookmark')
  } else if (config.hideDelay === -2) {
    cont.classList.add('full-bookmark')
  }
  cont.style.opacity = null
  if (!config.animation) {
    cont.classList.add('bookmark-remove-anime')
  } else {
    cont.classList.remove('bookmark-remove-anime')
  }
  cont.classList.remove('size-1', 'size-2', 'size-3')
  cont.classList.add(`size-${config.size}`)
  let styleTag = document.getElementById('style-gbf-bookmark')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'style-gbf-bookmark'
    document.body.appendChild(styleTag)
  }
  let width = 67
  if (config.size === 1) width = 84
  if (config.size === 3) width = 59
  let left = width - config.margin
  if (left > width) left = width
  if (left < 0) left = 0
  styleTag.innerHTML = `
  body #gbf-bookmark-lacia${config.position === 'right' ? '.bookmark-right' : ''} {
    ${config.position}: -${left}px;
  }
  `
}

const initIpt = () => {
  const iptPosition = document.getElementById('ipt-position-bookmark')
  const iptHidedelay = document.getElementById('ipt-hidedelay-bookmark')
  const iptMargin = document.getElementById('ipt-margin-bookmark')
  const iptAnimation = document.getElementById('ipt-animation-bookmark')
  const iptSize = document.getElementById('ipt-size-bookmark')
  const iptAlign = document.getElementById('ipt-align-bookmark')
  const iptMixed = document.getElementById('ipt-mixed-bookmark')
  iptPosition.value = config.position
  iptHidedelay.value = config.hideDelay
  iptMargin.value = config.margin
  iptAnimation.value = config.animation ? 'open' : 'close'
  iptSize.value = config.size
  iptAlign.value = config.align
  iptMixed.value = config.mixed
}

const saveConfig = () => {
  try {
    localStorage.setItem('gbf-bookmark:config', JSON.stringify(config))
  } catch (e) {

  }
}

export default config
export { applyConfig, initIpt, saveConfig }
