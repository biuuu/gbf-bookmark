import { randomColor, setIndex, renderAll, saveData, tryDownload } from './utils'
import data from './data'
import config, { applyConfig, initIpt, saveConfig } from './config';

export default function () {
  const tabs = document.querySelectorAll('#gbf-bookmark-setting .tab-bookmark-setting')
  const boxes = document.querySelectorAll('#gbf-bookmark-setting .setting-box-bookmark')

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      if (!tab.classList.contains('active-bookmark')) {
        tab.classList.add('active-bookmark')
        if (index === 0) {
          tabs[1].classList.remove('active-bookmark')
          boxes[1].classList.remove('box-active')
        } else {
          tabs[0].classList.remove('active-bookmark')
          boxes[0].classList.remove('box-active')
        }
        boxes[index].classList.add('box-active')
      }
    })
  })

  const setting = document.querySelector('#gbf-bookmark-setting')
  const closeBtn = document.querySelector('#btn-close-bookmark')
  const bookmark = document.querySelector('#gbf-bookmark-lacia')
  const btnShowSetting = document.querySelector('#show-setting-bookmark')
  bookmark.oncontextmenu = function (e) {
    e.preventDefault()
  }
  bookmark.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
      showSetting()
    }
  })
  btnShowSetting.addEventListener('click', function () {
    showSetting()
  })
  const hideSetting = () => {
    setting.classList.remove('show-setting')
  }
  const showSetting = () => setting.classList.toggle('show-setting')
  closeBtn.addEventListener('click', hideSetting)

  const btnModalClose = document.querySelector('#btn-close-tagmodal')
  const tagModal = document.querySelector('#gbf-bookmark-tagmodal')
  const btnAddBookmark = document.querySelector('#btn-add-bookmark')
  const btnSaveTag = document.querySelector('#btn-save-tagmodal')

  const iptName = document.querySelector('#ipt-name-bookmark')
  const iptUrl = document.querySelector('#ipt-url-bookmark')
  const iptBgcolor = document.querySelector('#ipt-bgcolor-bookmark')
  const iptIndex = document.querySelector('#ipt-index-bookmark')
  const iptParent = document.querySelector('#ipt-parent-bookmark')

  btnModalClose.addEventListener('click', function () {
    tagModal.classList.remove('bookmark-active')
  })

  const tagModalStatus = { type: 'add', index: 1 }
  btnAddBookmark.addEventListener('click', function () {
    tagModal.classList.add('bookmark-active')
    iptName.value = ''
    iptUrl.value = location.hash || ''
    iptBgcolor.value = randomColor()
    iptIndex.value = setIndex()
    iptParent.value = 0
    tagModalStatus.type = 'add'
  })

  btnSaveTag.addEventListener('click', function () {
    const url = iptUrl.value
    const name = iptName.value || url.replace(/^#/, '')
    if (!url.trim()) return alert('缺少书签地址')
    const background = iptBgcolor.value
    const index = iptIndex.value | 0
    const parent = iptParent.value | 0
    if (tagModalStatus.type === 'add') {
      data.list.push({ name, url, background, index, parent })
    } else {
      data.list[tagModalStatus.index] = { name, url, background, index, parent }
    }
    tagModal.classList.remove('bookmark-active')
    renderAll()
    saveData()
  })

  const bookmarkCont = document.querySelector('#bookmark-cont')
  bookmarkCont.addEventListener('click', function (e) {
    const elemt = e.target
    if (elemt.classList.contains('edit-tag')) {
      tagModalStatus.type = 'edit'
      const index = tagModalStatus.index = elemt.dataset.index | 0
      const item = data.list[index]
      tagModal.classList.add('bookmark-active')
      iptName.value = item.name || ''
      iptUrl.value = item.url || ''
      iptBgcolor.value = item.background || randomColor()
      iptIndex.value = item.index || setIndex()
      iptParent.value = item.parent | 0
    } else if (elemt.classList.contains('delete-tag')) {
      if (!confirm('确定要删除这个书签吗？')) return
      const index = elemt.dataset.index | 0
      data.list.splice(index, 1)
      renderAll()
      saveData()
    }
  })

  const btnSaveSetting = document.querySelector('#btn-save-setting')
  const iptPosition = document.getElementById('ipt-position-bookmark')
  const iptHidedelay = document.getElementById('ipt-hidedelay-bookmark')
  const iptMargin = document.getElementById('ipt-margin-bookmark')
  const iptAnimation = document.getElementById('ipt-animation-bookmark')
  const iptSize = document.getElementById('ipt-size-bookmark')
  const iptAlign = document.getElementById('ipt-align-bookmark')
  const iptMixed = document.getElementById('ipt-mixed-bookmark')
  btnSaveSetting.addEventListener('click', function () {
    config.position = iptPosition.value
    config.hideDelay = iptHidedelay.value | 0
    config.margin = iptMargin.value | 0
    config.animation = iptAnimation.value === 'open'
    config.size = iptSize.value | 0
    config.align = iptAlign.value
    config.mixed = iptMixed.value
    applyConfig()
    saveConfig()
    alert('保存成功')
  })

  const btnImport = document.getElementById('btn-import-bookmark')
  const btnExport = document.getElementById('btn-export-bookmark')
  const iptImport = document.getElementById('ipt-import-bookmark')

  iptImport.addEventListener('change', function () {
    const files = this.files
    if (files.length) {
      var reader = new FileReader()
      reader.onload = (e => {
        try {
          const obj = JSON.parse(e.target.result)
          data.list = obj.data
          Object.assign(config, obj.config)
          applyConfig()
          initIpt()
          saveConfig()
          renderAll()
          saveData()
          alert('导入成功')
        } catch (err) {
          console.error(err)
          alert(`导入失败 ${err.message}`)
        }
      })
      reader.readAsText(files[0])
    }
  })

  btnExport.addEventListener('click', function () {
    try {
      const obj = { data: data.list, config: config }
      tryDownload(JSON.stringify(obj, null, 2), 'GBF-Bookmark-Config.json')
    } catch (e) {
      console.error(e)
    }
  })
}
