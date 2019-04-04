// ==UserScript==
// @name         碧蓝幻想书签
// @namespace    https://github.com/biuuu/gbf-bookmark
// @version      0.0.3
// @description  none
// @author       biuuu
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-body
// @updateURL    https://biuuu.github.io/gbf-bookmark/gbf-bookmark.user.js
// @supportURL   https://github.com/biuuu/gbf-bookmark/issues
// ==/UserScript==
(function () {
  'use strict';

  let data = {
    list: [{
      url: '#mypage',
      name: '首页',
      index: 3,
      background: '#297fc8'
    }, {
      url: '#quest/assist',
      name: '副本列表',
      index: 7,
      background: '#c96883'
    }, {
      url: '#quest/assist/event',
      name: '活动副本',
      index: 8,
      background: '#8dc3dd'
    }, {
      url: '#quest/fate',
      name: 'Fate',
      index: 9,
      background: '#fff'
    }, {
      url: '#sidestory',
      name: 'SIDE STORY',
      index: 10,
      background: '#eee3c8'
    }, {
      url: '#arcarum2',
      name: '塔罗首页',
      index: 12,
      background: '#ff972d'
    }, {
      url: 'back',
      name: '后退',
      index: 16,
      background: '#FFEB3B'
    }, {
      url: 'reload',
      name: '刷新',
      index: 18,
      background: '#5fc829'
    }]
  };

  const getLocalData = () => {
    try {
      let str = localStorage.getItem('gbf-bookmark:data');

      if (str) {
        let obj = JSON.parse(str);

        if (obj && obj.length) {
          data.list = obj.sort((prev, next) => prev.index - next.index);
        }
      }
    } catch (e) {}
  };

  getLocalData();

  const config = {
    position: 'left',
    hideDelay: 10,
    animation: true,
    margin: 2
  };

  const getLocalConfig = () => {
    try {
      let _config = JSON.parse(localStorage.getItem('gbf-bookmark:config'));

      if (_config) {
        if (_config.hideDelay) {
          _config.hideDelay = _config.hideDelay | 0;
        }

        if (_config.margin) {
          _config.margin = _config.margin | 0;
        }

        Object.assign(config, _config);
      }
    } catch (e) {}
  };

  getLocalConfig();

  const applyConfig = () => {
    const cont = document.getElementById('gbf-bookmark-lacia');

    if (config.position === 'left') {
      cont.classList.remove('bookmark-right');
    } else {
      cont.classList.add('bookmark-right');
    }

    cont.classList.remove('autohide-bookmark');
    cont.classList.remove('keep-bookmark');

    if (config.hideDelay === 0) {
      cont.classList.add('autohide-bookmark');
    } else if (config.hideDelay < 0) {
      cont.classList.add('keep-bookmark');
    }

    cont.style.opacity = null;

    if (!config.animation) {
      cont.classList.add('bookmark-remove-anime');
    } else {
      cont.classList.remove('bookmark-remove-anime');
    }

    let styleTag = document.getElementById('style-gbf-bookmark');

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'style-gbf-bookmark';
      document.body.appendChild(styleTag);
    }

    let left = 67 - config.margin;
    if (left > 67) left = 67;
    if (left < 37) left = 37;
    styleTag.innerHTML = "\n  body #gbf-bookmark-lacia".concat(config.position === 'right' ? '.bookmark-right' : '', " {\n    ").concat(config.position, ": -").concat(left, "px;\n  }\n  ");
  };

  const initIpt = () => {
    const iptPosition = document.getElementById('ipt-position-bookmark');
    const iptHidedelay = document.getElementById('ipt-hidedelay-bookmark');
    const iptMargin = document.getElementById('ipt-margin-bookmark');
    const iptAnimation = document.getElementById('ipt-animation-bookmark');
    iptPosition.value = config.position;
    iptHidedelay.value = config.hideDelay;
    iptMargin.value = config.margin;
    iptAnimation.value = config.animation ? 'open' : 'close';
  };

  const saveConfig = () => {
    try {
      localStorage.setItem('gbf-bookmark:config', JSON.stringify(config));
    } catch (e) {}
  };

  const fontColor = rgb => {
    let str = rgb.slice(1);
    let r, g, b;

    if (str.length === 6) {
      r = parseInt(str.slice(0, 2), 16);
      g = parseInt(str.slice(2, 4), 16);
      b = parseInt(str.slice(4, 6), 16);
    } else {
      r = str.slice(0, 1);
      r = parseInt("".concat(r).concat(r), 16);
      g = str.slice(1, 2);
      g = parseInt("".concat(g).concat(g), 16);
      b = str.slice(2, 3);
      b = parseInt("".concat(b).concat(b), 16);
    }

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminance > 0.7) {
      return '#000';
    } else {
      return '#fff';
    }
  };

  const colors = ['#ff972d', '#297fc8', '#5fc829', '#FFEB3B', '#c96883', '#8dc3dd', '#ffffff', '#eee3c8', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#607D8B'];

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderTag = () => {
    let html = '';
    data.list.forEach((item, index) => {
      const bg = item.background || '#297fc8';
      const color = item.color || fontColor(bg);
      html += "<div style=\"background-color:".concat(bg, ";color:").concat(color, "\"\n    class=\"paper-shadow2 bookmark-tag\"><div class=\"idx-tag\"><span>").concat(item.index, "</span></div>\n    <span class=\"edit-tag\" data-index=\"").concat(index, "\">\u6539</span><span class=\"delete-tag\" data-index=\"").concat(index, "\">\u5220</span>\n    ").concat(item.name || 'NoName', "</div>");
    });
    return html;
  };

  const renderList = () => {
    let str = '';
    const bookmarks = data.list;

    if (bookmarks.length) {
      const indexList = bookmarks.map(item => item.index);
      const maxIndex = Math.max(...indexList);
      const list = new Array(maxIndex > 100 ? 100 : maxIndex).fill({});
      indexList.forEach((tag, idx) => {
        list[tag - 1] = bookmarks[idx];
      });
      list.forEach(item => {
        if (item.url) {
          const bg = item.background || '#297fc8';
          const color = item.color || fontColor(bg);

          if (item.url === 'reload') {
            str += "<a style=\"background-color:".concat(bg, ";color:").concat(color, "\" class=\"bookmark-item-lacia paper-shadow\" onclick=\"location.reload()\"><div>").concat(item.name || 'NoName', "</div></a>");
          } else if (item.url === 'back') {
            str += "<a style=\"background-color:".concat(bg, ";color:").concat(color, "\" class=\"bookmark-item-lacia paper-shadow\" onclick=\"history.back()\"><div>").concat(item.name || 'NoName', "</div></a>");
          } else if (item.url === 'forward') {
            str += "<a style=\"background-color:".concat(bg, ";color:").concat(color, "\" class=\"bookmark-item-lacia paper-shadow\" onclick=\"history.forward()\"><div>").concat(item.name || 'NoName', "</div></a>");
          } else {
            str += "<a style=\"background-color:".concat(bg, ";color:").concat(color, "\" class=\"bookmark-item-lacia paper-shadow\" href=\"").concat(item.url, "\"><div>").concat(item.name || 'NoName', "</div></a>");
          }
        } else {
          str += "<div class=\"bookmark-item-lacia\"></div>";
        }
      });
    }

    if (!str) {
      str += "<a style=\"background-color:".concat(randomColor(), ";color:#fff\" class=\"bookmark-item-lacia paper-shadow\"><div>\u8BBE\u7F6E</div></a>");
    }

    return str;
  };

  const setIndex = () => {
    let index = 1;
    data.list.forEach(item => {
      if (item.index === index) {
        index = item.index + 1;
      }
    });
    return index;
  };

  const renderAll = () => {
    document.getElementById('bookmark-cont').innerHTML = renderTag();
    document.getElementById('gbf-bookmark-lacia').innerHTML = renderList();
  };

  const saveData = () => {
    try {
      localStorage.setItem('gbf-bookmark:data', JSON.stringify(data.list));
    } catch (e) {}
  };

  const css = "\n#gbf-bookmark-lacia {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 2px;\n  height: 100%;\n  z-index: 9999999;\n  left: -65px;\n  pointer-events: none;\n  transition: left 0.1s, right 0.1s;\n}\n#gbf-bookmark-lacia.bookmark-remove-anime,\n#gbf-bookmark-lacia.bookmark-remove-anime a.bookmark-item-lacia {\n  transition: none;\n}\n#gbf-bookmark-lacia.autohide-bookmark {\n  opacity: 0;\n}\n#gbf-bookmark-lacia:hover {\n  left: 0;\n}\n#gbf-bookmark-lacia.autohide-bookmark:hover {\n  opacity: 1;\n}\n#gbf-bookmark-lacia:hover .bookmark-item-lacia {\n  box-shadow: none;\n}\n.bookmark-item-lacia {\n  width: 20px;\n  height: 24px;\n  line-height: 24px;\n  padding-left: 8px;\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  pointer-events: auto;\n}\n#gbf-bookmark-lacia:hover a.bookmark-item-lacia:nth-child(2n) {\n  width: 70px;\n}\na.bookmark-item-lacia:focus {\n  outline: 0;\n}\na.bookmark-item-lacia {\n  width: 68px;\n  background-color: #fff;\n  text-decoration: none;\n  white-space: nowrap;\n  color: #000;\n  font-size: 9px;\n  font-family: -apple-system, -apple-system-font, \"Microsoft JHengHei\", HelveticaNeue, \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: 100;\n  cursor: pointer;\n  pointer-events: auto;\n  z-index: 1;\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);\n  transition: all 0.3s;\n}\n.bookmark-item-lacia>div {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  height: 100%;\n}\na.bookmark-item-lacia:hover {\n  filter: brightness(0.9);\n}\na.bookmark-item-lacia:active {\n  filter: brightness(0.8);\n  mix-blend-mode: multiply;\n}\na.bookmark-item-lacia:active:before, a.bookmark-item-lacia:active:after {\n  display: none;\n}\n.paper-shadow:before, .paper-shadow:after {\n\tcontent: '';\n  position: absolute;\n  z-index: 1;\n\tleft: 0;\n\tbox-shadow: 0 0 10px rgba(0,0,0,0.35);\n\tborder-radius: 50%;\n\twidth: 100%;\n\theight: 20px;\n\tdisplay: none;\n}\n.paper-shadow:before {\n\tdisplay: block;\n\ttop: 0px;\n\tclip: rect(-40px auto 0 auto);\n}\n.paper-shadow:after {\n\tdisplay: block;\n\tbottom: 0px;\n\tclip: rect(20px auto 40px auto);\n}\n#gbf-bookmark-lacia.bookmark-right {\n  left: auto;\n  right: -65px;\n}\n#gbf-bookmark-lacia.bookmark-right:hover {\n  left: auto;\n  right: 0;\n}\n#gbf-bookmark-lacia.bookmark-right .bookmark-item-lacia {\n  float: right;\n}\n.paper-shadow.dark-shadow:before,.paper-shadow.dark-shadow:after {\n  box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);\n}\n#gbf-bookmark-setting {\n  position: fixed;\n  z-index: 9999998;\n  width: 280px;\n  padding-bottom: 30px;\n  min-height: 290px;\n  max-height: calc(100% - 200px);\n  top: 60px;\n  left: 20px;\n  background: #fffbe1;\n  font-family: -apple-system, -apple-system-font, \"Microsoft JHengHei\", HelveticaNeue, \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: 100;\n  display: none;\n}\n#gbf-bookmark-setting.show-setting {\n  display: block;\n}\n#gbf-bookmark-setting .s-paper {\n  position: absolute;\n  bottom: -2px;\n  width: calc(100% - 2px);\n  left: 1px;\n  height: 2px;\n  background: #e8e4cb;\n}\n.tab-bookmark-setting {\n  position: absolute;\n  height: 24px;\n  line-height: 24px;\n  background: #e8e4cb;\n  top: -24px;\n  left: 1px;\n  padding: 0 20px;\n  font-size: 10px;\n  z-index: 0;\n  letter-spacing: 0.2em;\n  cursor: pointer;\n}\n.tab-bookmark-setting:after {\n  display: none;\n}\n.option-bookmark {\n  left: 76px;\n}\n.option-bookmark.active-bookmark {\n  left: 75px;\n}\n.active-bookmark {\n  z-index: 2;\n  background: #fffbe1;\n  height: 25px;\n  line-height: 25px;\n  padding: 0 21px;\n  left: 0px;\n}\n.footer-bookmark-setting {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  left: 0;\n  padding: 10px 0;\n  text-align: center;\n}\n.footer-bookmark-setting .btn-bookmark {\n  margin: 0 10px;\n}\n.btn-bookmark {\n  padding: 4px 12px;\n  font-size: 8px;\n  cursor: pointer;\n  display: inline-block;\n  box-shadow: 0 0 1px rgba(0,0,0,0.05);\n  background-color: #FFEB3B;\n}\n.btn-bookmark:hover {\n  background-color: #fff280;\n}\n.btn-bookmark:active {\n  background-color: #fff492;\n}\n.btn-bookmark.btn-add {\n  padding: 2px 8px;\n  color: #fff;\n  background-color: #8BC34A;\n}\n.setting-box-bookmark {\n  padding: 10px;\n  display: none;\n}\n.setting-box-bookmark.box-active {\n  display: block;\n}\n#bookmark-cont {\n  margin: 4px -4px;\n  overflow-y: auto;\n  max-height: 320px;\n}\n.setting-box-bookmark .bookmark-tag {\n  padding: 4px 12px;\n  margin: 4px;\n  float: left;\n  font-size: 10px;\n}\n.setting-box-bookmark .idx-tag {\n  position: absolute;\n  left: 2px;\n  top: 2px;\n  font-size: 6px;\n  padding: 0 2px;\n}\n.setting-box-bookmark .edit-tag, .setting-box-bookmark .delete-tag {\n  position: absolute;\n  height: 100%;\n  font-size: 8px;\n  top: 0;\n  right: 0;\n  background: #FF9800;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  width: 20px;\n  color: #fff;\n  cursor: pointer;\n}\n.setting-box-bookmark .edit-tag:hover, .setting-box-bookmark .delete-tag:hover {\n  filter: brightness(0.9);\n}\n.setting-box-bookmark .edit-tag {\n  right: 20px;\n  background: #2196F3;\n}\n.bookmark-tag:hover .edit-tag, .bookmark-tag:hover .delete-tag {\n  display: inline-flex;\n}\n.paper-shadow2 {\n  position: relative;\n}\n.paper-shadow2:before, .paper-shadow2:after {\n  z-index: -1;\n  position: absolute;\n  content: '';\n  bottom: 5px;\n  width: calc(50% - 1px);\n  height: 8px;\n  background: rgb(0, 0, 0, 0);\n  box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.38);\n}\n.paper-shadow2:before {\n  transform: rotate(-3deg);\n  left: 1px;\n}\n.paper-shadow2:after {\n  transform: rotate(3deg);\n  right: 1px;\n}\n#gbf-bookmark-tagmodal {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 200px;\n  background-color: #03A9F4;\n  font-size: 9px;\n  padding: 0 10px;\n  box-shadow: 0 0 1px 0.1px rgba(0,0,0,0.2);\n  display: none;\n}\n#gbf-bookmark-tagmodal.bookmark-active {\n  display: block;\n}\n#gbf-bookmark-tagmodal > div {\n  margin: 10px 0;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n}\n#gbf-bookmark-tagmodal .btn-bookmark {\n  margin: 0 10px;\n  background: #fff;\n}\n.setting-option-bookmark {\n  font-size: 9px;\n}\n.setting-option-bookmark>div {\n  margin: 10px 0;\n  padding: 0 10px;\n}\n.setting-option-bookmark .btn-bookmark {\n  background: #03A9F4;\n  color: #fff;\n}\n#gbf-bookmark-setting .label-setting, #gbf-bookmark-setting .label-tagmodal {\n  background: #fff;\n  height: 20px;\n  line-height: 20px;\n  padding: 0 8px;\n  width: 40px;\n  display: inline-block;\n  margin-right: 10px;\n}\n.ipt-setting-cont, .ipt-tagmodal-cont {\n  display: inline-block;\n}\n.setting-option-bookmark .hint-bookmark {\n  display: block;\n  margin-top: 10px;\n  color: #777;\n  width: 188px;\n  font-weight: normal;\n}\n#gbf-bookmark-setting .ipt-setting-bookmark, #gbf-bookmark-setting .ipt-tagmodal {\n  background: #fff;\n  height: 20px;\n  line-height: 20px;\n  padding: 0 0 0 8px;\n  margin: 0;\n  border: 0;\n  width: 112px;\n  color: #666;\n}\n#gbf-bookmark-setting .ipt-setting-bookmark::placeholder, .ipt-tagmodal::placeholder {\n  color: #aaa;\n}\n#gbf-bookmark-setting .ipt-setting-bookmark:focus, .ipt-tagmodal:focus {\n  outline: 0;\n}\n";

  function tempalte() {
    const html = "\n  <style>".concat(css, "</style>\n  <div id=\"gbf-bookmark-lacia\">").concat(renderList(), "</div>\n  <div id=\"gbf-bookmark-setting\" class=\"paper-shadow dark-shadow\">\n  <div class=\"tab-bookmark-setting active-bookmark paper-shadow\">\u4E66\u7B7E</div>\n  <div class=\"tab-bookmark-setting option-bookmark paper-shadow\">\u9009\u9879</div>\n  <div class=\"setting-box-bookmark box-active\">\n    <div id=\"btn-add-bookmark\" class=\"btn-bookmark btn-add paper-shadow2\">\u6DFB\u52A0</div>\n    <div id=\"bookmark-cont\">").concat(renderTag(), "</div>\n  </div>\n  <div class=\"setting-box-bookmark setting-option-bookmark\">\n    <div>\n      <span class=\"label-setting paper-shadow2\">\u4F4D\u7F6E</span>\n      <div class=\"paper-shadow2 ipt-setting-cont\">\n        <select id=\"ipt-position-bookmark\" class=\"ipt-setting-bookmark\">\n        <option value=\"left\">\u5DE6\u8FB9</option>\n        <option value=\"right\">\u53F3\u8FB9</option>\n        </select>\n      </div>\n    </div>\n    <div>\n      <span class=\"label-setting paper-shadow2\">\u8FB9\u8DDD</span>\n      <div class=\"paper-shadow2 ipt-setting-cont\">\n        <input id=\"ipt-margin-bookmark\" class=\"ipt-setting-bookmark\" value=\"2\" type=\"number\" min=\"0\" max=\"30\">\n      </div>\n    </div>\n    <div>\n      <span class=\"label-setting paper-shadow2\">\u52A8\u753B</span>\n      <div class=\"paper-shadow2 ipt-setting-cont\">\n      <select id=\"ipt-animation-bookmark\" class=\"ipt-setting-bookmark\">\n        <option value=\"open\">\u542F\u7528</option>\n        <option value=\"close\">\u7981\u6B62</option>\n      </select>\n      </div>\n    </div>\n    <div>\n      <span class=\"label-setting paper-shadow2\">\u81EA\u52A8\u9690\u85CF</span>\n      <div class=\"paper-shadow2 ipt-setting-cont\">\n        <input id=\"ipt-hidedelay-bookmark\" class=\"ipt-setting-bookmark\" value=\"10\" type=\"number\" min=\"-1\" max=\"30\">\n      </div>\n      <span class=\"hint-bookmark\">\u7B49\u5F85\u6307\u5B9A\u79D2\u6570\u540E\u81EA\u52A8\u9690\u85CF\uFF0C\u8BBE\u4E3A0\u76F4\u63A5\u9690\u85CF\uFF0C\u8BBE\u4E3A-1\u5219\u59CB\u7EC8\u663E\u793A</span>\n    </div>\n    <div><div class=\"btn-bookmark paper-shadow2\" id=\"btn-save-setting\">\u4FDD\u5B58</div></div>\n  </div>\n  <div class=\"footer-bookmark-setting\">\n    <div class=\"btn-bookmark paper-shadow2\" id=\"btn-close-bookmark\">\u5173\u95ED</div>\n  </div>\n  <div id=\"gbf-bookmark-tagmodal\" class=\"paper-shadow\">\n    <div>\n    <span class=\"label-tagmodal paper-shadow2\">\u4E66\u7B7E\u540D</span>\n    <div class=\"paper-shadow2 ipt-tagmodal-cont\"><input id=\"ipt-name-bookmark\" class=\"ipt-tagmodal\" placeholder=\"\u8BF7\u8F93\u5165\u4E66\u7B7E\u7684\u540D\u5B57\" type=\"text\"></div>\n    </div>\n    <div>\n    <span class=\"label-tagmodal paper-shadow2\">\u7F51\u5740</span>\n    <div class=\"paper-shadow2 ipt-tagmodal-cont\"><input id=\"ipt-url-bookmark\" class=\"ipt-tagmodal\" placeholder=\"\u8BF7\u8F93\u5165\u4E66\u7B7E\u5730\u5740\" type=\"text\"></div>\n    </div>\n    <div>\n    <span class=\"label-tagmodal paper-shadow2\">\u989C\u8272</span>\n    <div class=\"paper-shadow2 ipt-tagmodal-cont\"><input id=\"ipt-bgcolor-bookmark\" class=\"ipt-tagmodal\" value=\"#00BCD4\" type=\"color\"></div>\n    </div>\n    <div>\n    <span class=\"label-tagmodal paper-shadow2\">\u5E8F\u53F7</span>\n    <div class=\"paper-shadow2 ipt-tagmodal-cont\"><input id=\"ipt-index-bookmark\" class=\"ipt-tagmodal\" min=\"1\" max=\"100\" type=\"number\"></div>\n    </div>\n    <div>\n    <div class=\"btn-bookmark paper-shadow2\" id=\"btn-save-tagmodal\">\u4FDD\u5B58</div>\n    <div class=\"btn-bookmark paper-shadow2\" id=\"btn-close-tagmodal\">\u53D6\u6D88</div>\n    </div>\n  </div>\n  <div class=\"s-paper\"></div>\n  </div>\n  ");
    return html;
  }

  function event () {
    const tabs = document.querySelectorAll('#gbf-bookmark-setting .tab-bookmark-setting');
    const boxes = document.querySelectorAll('#gbf-bookmark-setting .setting-box-bookmark');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function () {
        if (!tab.classList.contains('active-bookmark')) {
          tab.classList.add('active-bookmark');

          if (index === 0) {
            tabs[1].classList.remove('active-bookmark');
            boxes[1].classList.remove('box-active');
          } else {
            tabs[0].classList.remove('active-bookmark');
            boxes[0].classList.remove('box-active');
          }

          boxes[index].classList.add('box-active');
        }
      });
    });
    const setting = document.querySelector('#gbf-bookmark-setting');
    const closeBtn = document.querySelector('#btn-close-bookmark');
    const bookmark = document.querySelector('#gbf-bookmark-lacia');

    bookmark.oncontextmenu = function (e) {
      e.preventDefault();
    };

    bookmark.addEventListener('mouseup', function (e) {
      if (e.button === 2) {
        showSetting();
      }
    });

    const hideSetting = () => {
      setting.classList.remove('show-setting');
    };

    const showSetting = () => setting.classList.add('show-setting');

    closeBtn.addEventListener('click', hideSetting);
    const btnModalClose = document.querySelector('#btn-close-tagmodal');
    const tagModal = document.querySelector('#gbf-bookmark-tagmodal');
    const btnAddBookmark = document.querySelector('#btn-add-bookmark');
    const btnSaveTag = document.querySelector('#btn-save-tagmodal');
    const iptName = document.querySelector('#ipt-name-bookmark');
    const iptUrl = document.querySelector('#ipt-url-bookmark');
    const iptBgcolor = document.querySelector('#ipt-bgcolor-bookmark');
    const iptIndex = document.querySelector('#ipt-index-bookmark');
    btnModalClose.addEventListener('click', function () {
      tagModal.classList.remove('bookmark-active');
    });
    const tagModalStatus = {
      type: 'add',
      index: 1
    };
    btnAddBookmark.addEventListener('click', function () {
      tagModal.classList.add('bookmark-active');
      iptName.value = '';
      iptUrl.value = location.hash || '';
      iptBgcolor.value = randomColor();
      iptIndex.value = setIndex();
      tagModalStatus.type = 'add';
    });
    btnSaveTag.addEventListener('click', function () {
      const url = iptUrl.value;
      const name = iptName.value || url.replace(/^#/, '');
      if (!url.trim()) return alert('缺少书签地址');
      const background = iptBgcolor.value;
      const index = iptIndex.value | 0;

      if (tagModalStatus.type === 'add') {
        data.list.push({
          name,
          url,
          background,
          index
        });
      } else {
        data.list[tagModalStatus.index] = {
          name,
          url,
          background,
          index
        };
      }

      tagModal.classList.remove('bookmark-active');
      renderAll();
      saveData();
    });
    const bookmarkCont = document.querySelector('#bookmark-cont');
    bookmarkCont.addEventListener('click', function (e) {
      const elemt = e.target;

      if (elemt.classList.contains('edit-tag')) {
        tagModalStatus.type = 'edit';
        const index = tagModalStatus.index = elemt.dataset.index | 0;
        const item = data.list[index];
        tagModal.classList.add('bookmark-active');
        iptName.value = item.name || '';
        iptUrl.value = item.url || '';
        iptBgcolor.value = item.background || randomColor();
        iptIndex.value = item.index || setIndex();
      } else if (elemt.classList.contains('delete-tag')) {
        if (!confirm('确定要删除这个书签吗？')) return;
        const index = elemt.dataset.index | 0;
        data.list.splice(index, 1);
        renderAll();
        saveData();
      }
    });
    const btnSaveSetting = document.querySelector('#btn-save-setting');
    const iptPosition = document.getElementById('ipt-position-bookmark');
    const iptHidedelay = document.getElementById('ipt-hidedelay-bookmark');
    const iptMargin = document.getElementById('ipt-margin-bookmark');
    const iptAnimation = document.getElementById('ipt-animation-bookmark');
    btnSaveSetting.addEventListener('click', function () {
      config.position = iptPosition.value;
      config.hideDelay = iptHidedelay.value | 0;
      config.margin = iptMargin.value | 0;
      config.animation = iptAnimation.value === 'open';
      applyConfig();
      saveConfig();
      alert('保存成功');
    });
  }

  const recordTime = () => {
    localStorage.setItem('gbf-bookmark:time', Date.now());
  };

  const getTime = () => {
    let time = 0;

    try {
      const _time = parseInt(localStorage.getItem('gbf-bookmark:time'), 10);

      if (_time) time = _time;
    } catch (e) {}

    return time;
  };

  const parentElmt = () => {
    let elmt = document.getElementById('mobage-game-container');
    if (!elmt) elmt = document.body;
    return elmt;
  };

  const main = () => {
    try {
      const html = tempalte(data.list);
      parentElmt().insertAdjacentHTML('beforeend', html);
      const container = document.getElementById('gbf-bookmark-lacia');
      const time = getTime();
      let hideTimer;

      const delayHide = () => {
        if (config.hideDelay <= 0) return;
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          container.style.opacity = 0;
        }, config.hideDelay * 1000);
      };

      if (Date.now() - time > config.hideDelay * 1000 && config.delayHide > 0) {
        container.style.opacity = 0;
      } else {
        delayHide();
      }

      container.addEventListener('mouseenter', function () {
        if (config.hideDelay <= 0) return;
        recordTime();
        clearTimeout(hideTimer);
        container.style.opacity = 1;
      });
      container.addEventListener('mouseleave', function () {
        if (config.hideDelay <= 0) return;
        recordTime();
        delayHide();
      });
      event();
      initIpt();
      applyConfig();
    } catch (e) {
      console.error(e);
    }
  };

  document.addEventListener('DOMContentLoaded', main);

}());
