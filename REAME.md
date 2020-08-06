# react = 组件化 + jsx + vdom

通过react 理解组件的基本概念
学习vdom的实现思路
编写突破自我的困难代码

配置webpack环境

```
npm init 初始化默认项目

先全局安装webpack和webpack-cli
npm install webpack -g
npm install webpack-cli -g
再局部安装webpack和webpack-cli
npm install webpack --save-dev
npm install webpack-cli --save-dev

查看:   
webpack -v
webpack-cli -v

再安装
cnpm install babel-loader -D    // 最基本的babel
cnpm install @babel/core -D     // babel的核心
cnpm i @babel/preset-env -D     // 让babel 将一些高版本的语法翻译成低版本的语法

cnpm i @babel/plugin-transform-react-jsx -D  // 处理jsx的语法
cnpm i @babel/preset-react -D
```

react中没有remover的情况，react是remover不了的
react如果remover的话，render的合法性就被破坏掉了,会破坏react的结构
react的做法是将dom树销毁，重新导出一个dom

```
let range = document.createRange(); //range 理解为html里面的一个范围
range里面存的都是实dom, 做虚实dom比对的时候，用到

react中update 和 mount 是核心
```
void 0 是一个安全值，void 0 就是 undefined
但是undefined 是一个变量的形式，有可能被别人篡改

for ... in 遍历对象
for ... of 遍历数组

react 的组件 里面的类型 和元素 完全相同的时候，才被认为是相同的
react 同层比对
react 有全局的事件代理

虚拟树 三个主要函数 isSameNode   isSameTree   replace

