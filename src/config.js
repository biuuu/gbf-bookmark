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
  if (!config.animation) {
    cont.classList.add('bookmark-remove-anime')
  } else {
    cont.classList.remove('bookmark-remove-anime')
  }
  let styleTag = document.getElementById('style-gbf-bookmark')
  if (!styleTag) {
    styleTag = document.createElement('style')
    document.body.appendChild(style)
  }
  let left = 67 - config.margin
  if (left > 67) left = 67
  if (left < 37) left = 37
  styleTag.innerText = `
  body #gbf-bookmark-lacia {
    left: -${left}px;
  }
  `
}

const initIpt = () => {
  const iptPosition = document.getElementById('ipt-position-bookmari')
  const iptHidedelay = document.getElementById('ipt-hidedelay-bookmari')
  const iptMargin = document.getElementById('ipt-margin-bookmari')
  const iptAnimation = document.getElementById('ipt-animation-bookmari')
  iptPosition.value = config.position
  iptHidedelay.value = config.hideDelay
  iptMargin.value = config.margin
  iptAnimation.value = config.animation ? 'open' : 'close'
}

export default config
export { applyConfig, initIpt }
