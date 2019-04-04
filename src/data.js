let data = {
  list : [
    {
      url: '#mypage',
      name: '首页',
      index: 3,
      background: '#297fc8'
    },
    {
      url: '#quest/assist',
      name: '副本列表',
      index: 7,
      background: '#c96883'
    },
    {
      url: '#quest/assist/event',
      name: '活动副本',
      index: 8,
      background: '#8dc3dd'
    },
    {
      url: '#quest/fate',
      name: 'Fate',
      index: 9,
      background: '#fff'
    },
    {
      url: '#sidestory',
      name: 'SIDE STORY',
      index: 10,
      background: '#eee3c8'
    },
    {
      url: '#arcarum2',
      name: '塔罗首页',
      index: 12,
      background: '#ff972d'
    },
    {
      url: 'back',
      name: '后退',
      index: 16,
      background: '#FFEB3B'
    },
    {
      url: 'reload',
      name: '刷新',
      index: 18,
      background: '#5fc829'
    }
  ]
}


const getLocalData = () => {
  try {
    let str = localStorage.getItem('gbf-bookmark:data')
    if (str) {
      let obj = JSON.parse(str)
      if (obj && obj.length) {
        data.list = obj.sort((prev, next) => prev.index - next.index)
      }
    }
  } catch (e) {

  }
}

getLocalData()

export default data
