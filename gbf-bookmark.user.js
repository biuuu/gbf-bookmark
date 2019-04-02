// ==UserScript==
// @name         碧蓝幻想书签
// @namespace    https://github.com/biuuu/gbf-bookmark
// @version      0.0.1
// @description  none
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @author       biuuu
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @run-at       document-body
// @updateURL    https://biuuu.github.io/gbf-markbook/gbf-markbook.user.js
// @supportURL   https://github.com/biuuu/gbf-bookmark/issues
// ==/UserScript==
(function () {
  'use strict';

  const data = [{
    url: '#quest/supporter/739901/1/0/10308',
    name: '当前活动',
    index: 12,
    background: '#ff972d'
  }, {
    url: '#mypage',
    name: '首页',
    index: 3,
    background: '#297fc8'
  }, {
    url: 'reload',
    name: '刷新',
    index: 18,
    background: '#5fc829'
  }, {
    url: 'back',
    name: '后退',
    index: 16,
    background: '#FFEB3B'
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
  }];
  const css = "\n#gbf-bookmark-lacia {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 2px;\n  height: 100%;\n  z-index: 9999999;\n  left: -96px;\n  pointer-events: none;\n  transition: left 0.1s;\n}\n#gbf-bookmark-lacia:hover {\n  left: 0;\n}\n#gbf-bookmark-lacia:hover .bookmark-item-lacia {\n  box-shadow: none;\n}\n.bookmark-item-lacia {\n  width: 100%;\n  height: 40px;\n  line-height: 40px;\n  padding-left: 10px;\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  pointer-events: auto;\n}\na.bookmark-item-lacia {\n  width: 100px;\n  background-color: #fff;\n  text-decoration: none;\n  white-space: nowrap;\n  color: #000;\n  font-size: 14px;\n  font-family: \"Microsoft JHengHei\", \"Microsoft YaHei\";\n  font-weight: 100;\n  cursor: pointer;\n  pointer-events: auto;\n  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);\n}\n.bookmark-item-lacia>div {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  height: 100%;\n}\na.bookmark-item-lacia:hover {\n  mix-blend-mode: multiply;\n}\na.bookmark-item-lacia:before, a.bookmark-item-lacia:after {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 0;\n\tbox-shadow: 0 0 10px rgba(0,0,0,0.35);\n\tborder-radius: 50%;\n\twidth: 100%;\n\theight: 20px;\n\tdisplay: none;\n}\na.bookmark-item-lacia:before {\n\tdisplay: block;\n\ttop: 0px;\n\tclip: rect(-40px auto 0 auto);\n}\na.bookmark-item-lacia:after {\n\tdisplay: block;\n\tbottom: 0px;\n\tclip: rect(20px auto 40px auto);\n}\n";

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

    if (luminance > 0.65) {
      return '#000';
    } else {
      return '#fff';
    }
  };

  const indexList = data.map(item => item.index);
  const maxIndex = Math.max(...indexList);
  const list = new Array(maxIndex).fill({});
  indexList.forEach((tag, idx) => {
    list[tag - 1] = data[idx];
  });
  let template = '';
  list.forEach(item => {
    if (item.url) {
      const bg = item.background || '#297fc8';

      if (item.url === 'reload') {
        template += "<a style=\"background-color:".concat(bg, ";color:").concat(fontColor(bg), "\" class=\"bookmark-item-lacia\" onclick=\"location.reload()\"><div>").concat(item.name || 'NoName', "</div></a>");
      } else if (item.url === 'back') {
        template += "<a style=\"background-color:".concat(bg, ";color:").concat(fontColor(bg), "\" class=\"bookmark-item-lacia\" onclick=\"history.back()\"><div>").concat(item.name || 'NoName', "</div></a>");
      } else if (item.url === 'forward') {
        template += "<a style=\"background-color:".concat(bg, ";color:").concat(fontColor(bg), "\" class=\"bookmark-item-lacia\" onclick=\"history.forward()\"><div>").concat(item.name || 'NoName', "</div></a>");
      } else {
        template += "<a style=\"background-color:".concat(bg, ";color:").concat(fontColor(bg), "\" class=\"bookmark-item-lacia\" href=\"").concat(item.url, "\"><div>").concat(item.name || 'NoName', "</div></a>");
      }
    } else {
      template += "<div class=\"bookmark-item-lacia\"></div>";
    }
  });
  const html = "\n<style>".concat(css, "</style>\n<div id=\"gbf-bookmark-lacia\">").concat(template, "</div>\n");

  const recordTime = () => {
    localStorage.setItem('gbf-bookmark:time', Date.now());
  };

  const delayTime = 10000;

  const main = () => {
    document.body.insertAdjacentHTML('beforeend', html);
    const container = document.getElementById('gbf-bookmark-lacia');
    const time = parseInt(localStorage.getItem('gbf-bookmark:time'), 10);
    let hideTimer;

    const delayHide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        container.style.opacity = 0;
      }, delayTime);
    };

    if (Date.now() - time > delayTime) {
      container.style.opacity = 0;
    } else {
      delayHide();
    }

    container.addEventListener('mouseenter', function () {
      recordTime();
      clearTimeout(hideTimer);
      container.style.opacity = 1;
    });
    container.addEventListener('mouseleave', function () {
      recordTime();
      delayHide();
    });
  };

  document.addEventListener('DOMContentLoaded', main);

}());
