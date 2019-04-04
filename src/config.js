const config = {
  position: 'left',
  hideDelay: 10,
  animation: true,
  margin: 0
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

export default config
