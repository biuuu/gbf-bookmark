import { renderTag, renderList } from './utils'
import css from './style'

export default function tempalte () {
  const html = `
  <style>${css}</style>
  <div id="show-setting-bookmark"></div>
  <div id="gbf-bookmark-lacia">${renderList()}</div>
  <div id="gbf-bookmark-setting" class="paper-shadow dark-shadow">
  <div class="tab-bookmark-setting active-bookmark paper-shadow">书签</div>
  <div class="tab-bookmark-setting option-bookmark paper-shadow">选项</div>
  <div class="setting-box-bookmark box-active">
    <div class="toolbar-bookmark">
    <div id="btn-add-bookmark" class="btn-bookmark btn-add paper-shadow2">添加</div>
    <div class="toolbar-right">
    <input type="file" style="display:none" id="ipt-import-bookmark" accept=".json">
    <label for="ipt-import-bookmark" id="btn-import-bookmark" class="btn-bookmark btn-add paper-shadow2">导入</label>
    <div id="btn-export-bookmark" class="btn-bookmark btn-add paper-shadow2">导出</div>
    </div>
    </div>
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
        <input id="ipt-margin-bookmark" class="ipt-setting-bookmark" value="2" type="number" min="0" max="100">
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">文字</span>
      <div class="paper-shadow2 ipt-setting-cont">
      <select id="ipt-align-bookmark" class="ipt-setting-bookmark">
        <option value="left">左对齐</option>
        <option value="center">居中</option>
        <option value="right">右对齐</option>
      </select>
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
      <span class="label-setting paper-shadow2">尺寸</span>
      <div class="paper-shadow2 ipt-setting-cont">
      <select id="ipt-size-bookmark" class="ipt-setting-bookmark">
        <option value="1">大</option>
        <option value="2">中</option>
        <option value="3">小</option>
      </select>
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">对齐书签</span>
      <div class="paper-shadow2 ipt-setting-cont">
      <select id="ipt-mixed-bookmark" class="ipt-setting-bookmark">
        <option value="no">是</option>
        <option value="yes">否</option>
      </select>
      </div>
    </div>
    <div>
      <span class="label-setting paper-shadow2">自动隐藏</span>
      <div class="paper-shadow2 ipt-setting-cont">
        <input id="ipt-hidedelay-bookmark" class="ipt-setting-bookmark" value="10" type="number" min="-2" max="60">
      </div>
      <span class="hint-bookmark">等待指定秒数后自动隐藏，设为0直接隐藏，设为-1则始终显示。如需始终弹出书签栏，把自动隐藏设为-2，并把边距调到100。</span>
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
    <span class="label-tagmodal paper-shadow2">父书签</span>
    <div class="paper-shadow2 ipt-tagmodal-cont"><input id="ipt-parent-bookmark" class="ipt-tagmodal" min="0" max="100" type="number"></div>
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
