import data from './data'

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
  if (luminance > 0.7) {
    return '#000'
  } else {
    return '#fff'
  }
}

const colors = [ '#ff972d', '#297fc8', '#5fc829', '#FFEB3B', '#c96883', '#8dc3dd', '#ffffff', '#eee3c8',
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#607D8B'
]

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

const renderTag = () => {
  let html = ''
  data.list.forEach((item, index) => {
    const bg = item.background || '#297fc8'
    const color = item.color || fontColor(bg)
    html += `<div style="background-color:${bg};color:${color}"
    class="paper-shadow2 bookmark-tag"><div class="idx-tag"><span>${item.index}</span></div>
    <span class="edit-tag" data-index="${index}">改</span><span class="delete-tag" data-index="${index}">删</span>
    ${item.name || 'NoName'}</div>`
  })
  return html
}

const renderList = () => {
  let str = ''
  const bookmarks = data.list
  if (bookmarks.length) {
    const indexList = bookmarks.map(item => item.index)
    const maxIndex = Math.max(...indexList)
    const list = new Array(maxIndex > 100 ? 100 : maxIndex).fill({})
    indexList.forEach((tag, idx) => {
      list[tag - 1] = bookmarks[idx]
    })


    list.forEach(item => {
      if (item.url) {
        const bg = item.background || '#297fc8'
        const color = item.color || fontColor(bg)
        if (item.url === 'reload') {
          str += `<a style="background-color:${bg};color:${color}" class="bookmark-item-lacia paper-shadow" onclick="location.reload()"><div>${item.name || 'NoName'}</div></a>`
        } else if (item.url === 'back') {
          str += `<a style="background-color:${bg};color:${color}" class="bookmark-item-lacia paper-shadow" onclick="history.back()"><div>${item.name || 'NoName'}</div></a>`
        } else if (item.url === 'forward') {
          str += `<a style="background-color:${bg};color:${color}" class="bookmark-item-lacia paper-shadow" onclick="history.forward()"><div>${item.name || 'NoName'}</div></a>`
        } else {
          str += `<a style="background-color:${bg};color:${color}" class="bookmark-item-lacia paper-shadow" href="${item.url}"><div>${item.name || 'NoName'}</div></a>`
        }
      } else {
        str += `<div class="bookmark-item-lacia"></div>`
      }
    })
  }

  if (!str) {
    str += `<a style="background-color:${randomColor()};color:#fff" class="bookmark-item-lacia paper-shadow"><div>设置</div></a>`
  }
  return str
}


const setIndex = () => {
  let index = 1
  data.list.forEach(item => {
    if (item.index === index) {
      index = item.index + 1
    }
  })
  return index
}

const renderAll = () => {
  document.getElementById('bookmark-cont').innerHTML = renderTag()
  document.getElementById('gbf-bookmark-lacia').innerHTML = renderList()
}

const saveData = () => {
  try {
    localStorage.setItem('gbf-bookmark:data', JSON.stringify(data.list))
  } catch (e) {

  }
}

export { renderTag, fontColor, renderList, randomColor, setIndex, renderAll, saveData }
