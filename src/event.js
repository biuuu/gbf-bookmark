import { randomColor, setIndex, renderAll, saveData } from './utils'
import data from './data'

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
  bookmark.oncontextmenu = function (e) {
    e.preventDefault()
  }
  bookmark.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
      showSetting()
    }
  })
  const hideSetting = () => {
    setting.classList.remove('show-setting')
  }
  const showSetting = () => setting.classList.add('show-setting')
  closeBtn.addEventListener('click', hideSetting)

  const btnModalClose = document.querySelector('#btn-close-tagmodal')
  const tagModal = document.querySelector('#gbf-bookmark-tagmodal')
  const btnAddBookmark = document.querySelector('#btn-add-bookmark')
  const btnSaveTag = document.querySelector('#btn-save-tagmodal')

  const iptName = document.querySelector('#ipt-name-bookmark')
  const iptUrl = document.querySelector('#ipt-url-bookmark')
  const iptBgcolor = document.querySelector('#ipt-bgcolor-bookmark')
  const iptIndex = document.querySelector('#ipt-index-bookmark')

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
    tagModalStatus.type = 'add'
  })

  btnSaveTag.addEventListener('click', function () {
    const name = iptName.value
    const url = iptUrl.value
    if (!url.trim()) return alert('缺少书签地址')
    const background = iptBgcolor.value
    console.log(background)
    const index = iptIndex.value | 0
    if (tagModalStatus.type === 'add') {
      data.list.push({ name, url, background, index })
    } else {
      data.list[tagModalStatus.index] = { name, url, background, index }
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
    } else if (elemt.classList.contains('delete-tag')) {
      if (!confirm('确定要删除这个书签吗？')) return
      const index = elemt.dataset.index | 0
      data.list.splice(index, 1)
      renderAll()
      saveData()
    }
  })

}
