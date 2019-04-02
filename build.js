const babel = require('rollup-plugin-babel')
const cmjs = require('rollup-plugin-commonjs')

const banner = `// ==UserScript==
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
// ==/UserScript==`
module.exports = {
  input: 'main.js',
  plugins: [
    cmjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: '> 3%'
      }]]
    })
  ],
  output: {
    file: './dist/gbf-bookmark.user.js',
    format: 'iife',
    name: 'gbf_bookmark_biuuu',
    banner: banner
  }
};
