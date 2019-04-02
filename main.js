const data = [
  {
    url: '#quest/supporter/739901/1/0/10308',
    name: '当前活动',
    index: 12,
    background: '#ff972d'
  },
  {
    url: '#mypage',
    name: '首页',
    index: 3,
    background: '#297fc8'
  },
  {
    url: 'reload',
    name: '刷新',
    index: 18,
    background: '#5fc829'
  },
  {
    url: 'back',
    name: '后退',
    index: 16,
    background: '#FFEB3B'
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
]

const css = `
#gbf-bookmark-lacia {
  position: fixed;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  z-index: 9999999;
  left: -96px;
  pointer-events: none;
  transition: left 0.1s;
}
#gbf-bookmark-lacia:hover {
  left: 0;
}
#gbf-bookmark-lacia:hover .bookmark-item-lacia {
  box-shadow: none;
}
.bookmark-item-lacia {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  display: block;
  position: relative;
  pointer-events: auto;
}
a.bookmark-item-lacia {
  width: 100px;
  background-color: #fff;
  text-decoration: none;
  white-space: nowrap;
  color: #000;
  font-size: 14px;
  font-family: "Microsoft JHengHei", "Microsoft YaHei";
  font-weight: 100;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
}
.bookmark-item-lacia>div {
  text-overflow: ellipsis;
  overflow: hidden;
  height: 100%;
}
a.bookmark-item-lacia:hover {
  mix-blend-mode: multiply;
}
a.bookmark-item-lacia:before, a.bookmark-item-lacia:after {
	content: '';
	position: absolute;
	left: 0;
	box-shadow: 0 0 10px rgba(0,0,0,0.35);
	border-radius: 50%;
	width: 100%;
	height: 20px;
	display: none;
}
a.bookmark-item-lacia:before {
	display: block;
	top: 0px;
	clip: rect(-40px auto 0 auto);
}
a.bookmark-item-lacia:after {
	display: block;
	bottom: 0px;
	clip: rect(20px auto 40px auto);
}
`

const fontColor = (rgb) => {
  let str = rgb.slice(1)
  let r, g, b
  if (str.length === 6) {
    r = parseInt(str.slice(0, 2), 16)
    g = parseInt(str.slice(2, 4), 16)
    b = parseInt(str.slice(4, 6), 16)
  } else {
    r = str.slice(0, 1)
    r = parseInt(`${r}${r}`, 16)
    g = str.slice(1, 2)
    g = parseInt(`${g}${g}`, 16)
    b = str.slice(2, 3)
    b = parseInt(`${b}${b}`, 16)
  }
  const luminance  = ( 0.299 * r + 0.587 * g + 0.114 * b) / 255
  if (luminance > 0.65) {
    return '#000'
  } else {
    return '#fff'
  }
}

const indexList = data.map(item => item.index)
const maxIndex = Math.max(...indexList)
const list = new Array(maxIndex).fill({})
indexList.forEach((tag, idx) => {
  list[tag - 1] = data[idx]
})

let template = ''
list.forEach(item => {
  if (item.url) {
    const bg = item.background || '#297fc8'
    if (item.url === 'reload') {
      template += `<a style="background-color:${bg};color:${fontColor(bg)}" class="bookmark-item-lacia" onclick="location.reload()"><div>${item.name || 'NoName'}</div></a>`
    } else if (item.url === 'back') {
      template += `<a style="background-color:${bg};color:${fontColor(bg)}" class="bookmark-item-lacia" onclick="history.back()"><div>${item.name || 'NoName'}</div></a>`
    } else if (item.url === 'forward') {
      template += `<a style="background-color:${bg};color:${fontColor(bg)}" class="bookmark-item-lacia" onclick="history.forward()"><div>${item.name || 'NoName'}</div></a>`
    } else {
      template += `<a style="background-color:${bg};color:${fontColor(bg)}" class="bookmark-item-lacia" href="${item.url}"><div>${item.name || 'NoName'}</div></a>`
    }
  } else {
    template += `<div class="bookmark-item-lacia"></div>`
  }
})
const html = `
<style>${css}</style>
<div id="gbf-bookmark-lacia">${template}</div>
`
const recordTime = () => {
  localStorage.setItem('gbf-bookmark:time', Date.now())
}

const delayTime = 10000

const main = () => {
  document.body.insertAdjacentHTML('beforeend', html)
  const container = document.getElementById('gbf-bookmark-lacia')
  const time = parseInt(localStorage.getItem('gbf-bookmark:time'), 10)
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
}
document.addEventListener('DOMContentLoaded', main)
