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
}
