import { renderTag, renderList } from './utils'
import css from './style'

export default function tempalte () {
  const html = `
  <style>${css}</style>
  <div id="gbf-bookmark-lacia">${renderList()}</div>
  <div id="gbf-bookmark-setting" class="paper-shadow dark-shadow">
  <div class="tab-bookmark-setting active-bookmark paper-shadow">书签</div>
  <div class="tab-bookmark-setting option-bookmark paper-shadow">选项</div>
  <div class="setting-box-bookmark box-active">
    <div id="btn-add-bookmark" class="btn-bookmark btn-add paper-shadow2">添加</div>
    <div id="bookmark-cont">${renderTag()}</div>
  </div>
  <div class="setting-box-bookmark setting-option-bookmark">
    <div>
      <span class="label-setting paper-shadow2">位置</span>
      <div class="paper-shadow2 ipt-setting-cont">
        <select id="ipt-position-bookmark" class="ipt-setting-bookmark">
        <option value="left">左边</option>
        <option value="right">右边</option>
        </select>
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">边距</span>
      <div class="paper-shadow2 ipt-setting-cont">
        <input id="ipt-margin-bookmark" class="ipt-setting-bookmark" value="2" type="number" min="0" max="30">
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">动画</span>
      <div class="paper-shadow2 ipt-setting-cont">
      <select id="ipt-animation-bookmark" class="ipt-setting-bookmark">
        <option value="open">启用</option>
        <option value="close">禁止</option>
      </select>
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">自动隐藏</span>
      <div class="paper-shadow2 ipt-setting-cont">
        <input id="ipt-hidedelay-bookmark" class="ipt-setting-bookmark" value="10" type="number" min="-1" max="30">
      </div>
      <span class="hint-bookmark">等待指定秒数后自动隐藏，设为0直接隐藏，设为-1则始终显示</span>
    </div>
    <div><div class="btn-bookmark paper-shadow2" id="btn-save-setting">保存</div></div>
  </div>
  <div class="footer-bookmark-setting">
    <div class="btn-bookmark paper-shadow2" id="btn-close-bookmark">关闭</div>
  </div>
  <div id="gbf-bookmark-tagmodal" class="paper-shadow">
    <div>
    <span class="label-tagmodal paper-shadow2">书签名</span>
    <div class="paper-shadow2 ipt-tagmodal-cont"><input id="ipt-name-bookmark" class="ipt-tagmodal" placeholder="请输入书签的名字" type="text"></div>
    </div>
    <div>
    <span class="label-tagmodal paper-shadow2">网址</span>
    <div class="paper-shadow2 ipt-tagmodal-cont"><input id="ipt-url-bookmark" class="ipt-tagmodal" placeholder="请输入书签地址" type="text"></div>
    </div>
    <div>
    <span class="label-tagmodal paper-shadow2">颜色</span>
    <div class="paper-shadow2 ipt-tagmodal-cont"><input id="ipt-bgcolor-bookmark" class="ipt-tagmodal" value="#00BCD4" type="color"></div>
    </div>
    <div>
    <span class="label-tagmodal paper-shadow2">序号</span>
    <div class="paper-shadow2 ipt-tagmodal-cont"><input id="ipt-index-bookmark" class="ipt-tagmodal" min="1" max="100" type="number"></div>
    </div>
    <div>
    <div class="btn-bookmark paper-shadow2" id="btn-save-tagmodal">保存</div>
    <div class="btn-bookmark paper-shadow2" id="btn-close-tagmodal">取消</div>
    </div>
  </div>
  <div class="s-paper"></div>
  </div>
  `
  return html
}
