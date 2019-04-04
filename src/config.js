const config = {
  position: 'left',
  hideDelay: 10,
  animation: true,
  margin: 2
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
  cont.classList.remove('autohide-bookmark')
  cont.classList.remove('keep-bookmark')
  if (config.hideDelay === 0) {
    cont.classList.add('autohide-bookmark')
  } else if (config.hideDelay < 0) {
    cont.classList.add('keep-bookmark')
  }
  cont.style.opacity = null
  if (!config.animation) {
    cont.classList.add('bookmark-remove-anime')
  } else {
    cont.classList.remove('bookmark-remove-anime')
  }
  let styleTag = document.getElementById('style-gbf-bookmark')
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'style-gbf-bookmark'
    document.body.appendChild(styleTag)
  }
  let left = 67 - config.margin
  if (left > 67) left = 67
  if (left < 37) left = 37
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
  iptPosition.value = config.position
  iptHidedelay.value = config.hideDelay
  iptMargin.value = config.margin
  iptAnimation.value = config.animation ? 'open' : 'close'
}

const saveConfig = () => {
  try {
    localStorage.setItem('gbf-bookmark:config', JSON.stringify(config))
  } catch (e) {

  }
}

export default config
export { applyConfig, initIpt, saveConfig }
