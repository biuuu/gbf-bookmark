
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

const css = `
#gbf-bookmark-lacia {
  position: fixed;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  z-index: 9999999;
  left: -65px;
  pointer-events: none;
  transition: left 0.1s, right 0.1s;
}
#gbf-bookmark-lacia:hover {
  left: 0;
}
#gbf-bookmark-lacia:hover .bookmark-item-lacia {
  box-shadow: none;
}
.bookmark-item-lacia {
  width: 20px;
  height: 24px;
  line-height: 24px;
  padding-left: 8px;
  box-sizing: border-box;
  display: block;
  position: relative;
  pointer-events: auto;
}
a.bookmark-item-lacia:nth-child(2n) {
  width: 70px;
}
a.bookmark-item-lacia:focus {
  outline: 0;
}
a.bookmark-item-lacia {
  width: 68px;
  background-color: #fff;
  text-decoration: none;
  white-space: nowrap;
  color: #000;
  font-size: 9px;
  font-family: -apple-system, -apple-system-font, "Microsoft JHengHei", HelveticaNeue, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 100;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}
.bookmark-item-lacia>div {
  text-overflow: ellipsis;
  overflow: hidden;
  height: 100%;
}
a.bookmark-item-lacia:hover {
  filter: brightness(0.9);
}
a.bookmark-item-lacia:active {
  filter: brightness(0.8);
  mix-blend-mode: multiply;
}
a.bookmark-item-lacia:active:before, a.bookmark-item-lacia:active:after {
  display: none;
}
.paper-shadow:before, .paper-shadow:after {
	content: '';
  position: absolute;
  z-index: 1;
	left: 0;
	box-shadow: 0 0 10px rgba(0,0,0,0.35);
	border-radius: 50%;
	width: 100%;
	height: 20px;
	display: none;
}
.paper-shadow:before {
	display: block;
	top: 0px;
	clip: rect(-40px auto 0 auto);
}
.paper-shadow:after {
	display: block;
	bottom: 0px;
	clip: rect(20px auto 40px auto);
}
#gbf-bookmark-lacia.bookmark-right {
  left: auto;
  right: -96px;
}
#gbf-bookmark-lacia.bookmark-right:hover {
  left: auto;
  right: 0;
}
#gbf-bookmark-lacia.bookmark-right .bookmark-item-lacia {
  float: right;
}
.paper-shadow.dark-shadow:before,.paper-shadow.dark-shadow:after {
  box-shadow: 0 0 10px rgb(0, 0, 0);
}
#gbf-bookmark-setting {
  position: fixed;
  z-index: 9999998;
  width: 280px;
  min-height: 320px;
  max-height: calc(100% - 100px);
  top: 60px;
  left: 20px;
  background: #fffbe1;
  font-family: -apple-system, -apple-system-font, "Microsoft JHengHei", HelveticaNeue, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 100;
  display: none;
}
#gbf-bookmark-setting.show-setting {
  display: block;
}
#gbf-bookmark-setting .s-paper {
  position: absolute;
  bottom: -2px;
  width: calc(100% - 2px);
  left: 1px;
  height: 2px;
  background: #e8e4cb;
}
.tab-bookmark-setting {
  position: absolute;
  height: 24px;
  line-height: 24px;
  background: #e8e4cb;
  top: -24px;
  left: 1px;
  padding: 0 20px;
  font-size: 10px;
  z-index: 0;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.tab-bookmark-setting:after {
  display: none;
}
.option-bookmark {
  left: 76px;
}
.option-bookmark.active-bookmark {
  left: 75px;
}
.active-bookmark {
  z-index: 2;
  background: #fffbe1;
  height: 25px;
  line-height: 25px;
  padding: 0 21px;
  left: 0px;
}
.footer-bookmark-setting {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 10px 0;
  text-align: center;
}
.footer-bookmark-setting .btn-bookmark {
  margin: 0 10px;
}
.btn-bookmark {
  padding: 4px 12px;
  font-size: 8px;
  cursor: pointer;
  display: inline-block;
  box-shadow: 0 0 1px rgba(0,0,0,0.4);
}
.btn-bookmark:hover {
  background-color: rgba(0,0,0,0.05);
}
.btn-bookmark:active {
  background-color: rgba(0,0,0,0.1);
}
.setting-box-bookmark {
  padding: 10px;
  display: none;
}
.setting-box-bookmark.box-active {
  display: block;
}
`

export default function tempalte (data) {
  const indexList = data.map(item => item.index)
  const maxIndex = Math.max(...indexList)
  const list = new Array(maxIndex).fill({})
  indexList.forEach((tag, idx) => {
    list[tag - 1] = data[idx]
  })

  let str = ''
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
  const html = `
  <style>${css}</style>
  <div id="gbf-bookmark-lacia">${str}</div>
  <div id="gbf-bookmark-setting" class="paper-shadow dark-shadow">
  <div class="tab-bookmark-setting active-bookmark paper-shadow">书签</div>
  <div class="tab-bookmark-setting option-bookmark paper-shadow">选项</div>
  <div class="setting-box-bookmark box-active">
    <div class="btn-bookmark">添加</div>
    <div id="bookmark-cont"></div>
  </div>
  <div class="setting-box-bookmark">test</div>
  <div class="footer-bookmark-setting">
    <div class="btn-bookmark">保存</div>
    <div class="btn-bookmark" id="btn-close-bookmark">关闭</div>
  </div>
    <div class="s-paper"></div>
  </div>
  `
  return html
}
