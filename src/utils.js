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
    ${item.parent ? `<span class="idx-tag-parent">${item.parent}</span>` : ''}
    <span class="edit-tag" data-index="${index}">改</span><span class="delete-tag" data-index="${index}">删</span>
    ${item.name || 'NoName'}</div>`
  })
  return html
}

const renderList = () => {
  let html = ''
  let parentIds = []
  const bookmarks = data.list
  if (bookmarks.length) {
    const childBookmarks = bookmarks.filter(item => !!item.parent)
    const parentList = bookmarks.filter(item => !item.parent)
    const childList = new Map()
    childBookmarks.forEach(item => {
      if (!childList.has(item.parent)) {
        childList.set(item.parent, [])
      }
      childList.get(item.parent).push(item)
    })
    childList.forEach((list, pid) => {
      const item = parentList.find(obj => obj.index === pid)
      if (item) list.unshift(item)
    })
    parentIds = [...childList.keys()]

    const makeList = (bkmks) => {
      const indexList = bkmks.map(item => item.index)
      let maxIndex = Math.max(...indexList)
      if (maxIndex > 100) maxIndex = 100
      if (maxIndex < 30) maxIndex = 30
      const list = new Array(maxIndex).fill({})
      indexList.forEach((tag, idx) => {
        list[tag - 1] = bkmks[idx]
      })
      return list
    }

    const renderHtml = (list, parent) => {
      let str = ''
      list.forEach(item => {
        if (item.url) {
          const bg = item.background || '#297fc8'
          const color = item.color || fontColor(bg)
          let className = `bookmark-item-lacia paper-shadow`
          if (parent && (!item.parent || item.index === parent)) {
            className += ' bookmark-item-parent'
          }
          if (item.url === 'reload') {
            str += `<a style="background-color:${bg};color:${color}" class="${className}" onclick="location.reload()"><div>${item.name || 'NoName'}</div></a>`
          } else if (item.url === 'back') {
            str += `<a style="background-color:${bg};color:${color}" class="${className}" onclick="history.back()"><div>${item.name || 'NoName'}</div></a>`
          } else if (item.url === 'none') {
            str += `<a style="background-color:${bg};color:${color}" class="${className}"><div>${item.name || 'NoName'}</div></a>`
          } else if (item.url === 'forward') {
            str += `<a style="background-color:${bg};color:${color}" class="${className}" onclick="history.forward()"><div>${item.name || 'NoName'}</div></a>`
          } else {
            str += `<a style="background-color:${bg};color:${color}" class="${className}" href="${item.url}"><div>${item.name || 'NoName'}</div></a>`
          }
        } else {
          str += `<div class="bookmark-item-lacia"></div>`
        }
      })
      return `<div class="bookmark-container${parent ? ` bookmark-container-sub` : ''}">${str}</div>`
    }

    childList.forEach((list, parent) => {
      html += renderHtml(makeList(list), parent)
    })

    html += renderHtml(makeList(parentList), 0)
  }

  let css = ''
  parentIds.forEach(id => {
    css += `.bookmark-container-${id} {display:none}
    .bookmark-container-${id}:hover {display:none}
    `
  })
  html = `<style>${css}</style>${html}`

  return html
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

const tryDownload = (content, filename) => {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  const blob = new Blob([content], { type: 'text/csv' })
  eleLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

export { renderTag, fontColor, renderList, randomColor, setIndex, renderAll, saveData, tryDownload }
