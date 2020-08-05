class ElementWrapper{
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value){
        // \s\S 表示所有字符的意思 、\s表示空白， \S表示非空白，合在一起就是所有字符的意思
        if (name.match(/^on([\s\S]+)$/)) {
            // console.log(RegExp.$1);
            let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase());
            this.root.addEventListener(eventName, value);
        }
        if (name === 'className')
            name = 'class';
        this.root.setAttribute(name, value);
    }
    appendChild(vchild) { // 虚拟的child
        let range = document.createRange();
        if (this.root.children.length) {
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);
        }
        vchild.mountTo(range);
    }
    mountTo(range) { 
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper{
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    mountTo(range) { 
        range.deleteContents();
        range.insertNode(this.root);
    }
}

export class Component{
    constructor() {
        this.children = [];
        this.props = Object.create(null); // 获得一个纯净的Object对象，不带有Object自带的一些默认方法，比如toString()等等
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1);
        }
        this.props[name] = value;
        this[name] = value;
    }
    mountTo(range) {
        this.range = range; // 将range 存起来
        this.update();
    }
    update() {
        // 处理错位
        let placeholder = document.createComment('placeholder');
        let range = document.createRange();
        range.setStart(this.range.endContainer, this.range.endOffset);
        range.setEnd(this.range.endContainer, this.range.endOffset);
        range.insertNode(placeholder);

        this.range.deleteContents(); // 先清空
        let vdom = this.render(); // 然后重新渲染
        vdom.mountTo(this.range); // 进行mountTo

        // placeholder.parentNode.removeChild(placeholder); // 用placeholder的方式，标记位置，防止滑上去
    }
    appendChild(vchild){
        this.children.push(vchild);
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for(let p in newState) { // in 对对象循环着属性
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] !== 'object') {
                        oldState[p] = {};
                    }
                    merge(oldState[p], newState[p]);
                } else { // 其他情况直接赋值，覆盖之前的值
                    oldState[p] = newState[p];
                }
            }
        }
        if(!state && state) this.state = {};
        merge(this.state, state);
        // console.log(this.state);
        this.update(); // 能拿到赋的值，说明可以进行更新了
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children){
        console.log(arguments);
        let element;
        if (typeof type === 'string')
            element = new ElementWrapper(type);
        else
            element = new type;
        for(let name in attributes) {
            // element[name] = attributes[name];  // 不能这样写
            element.setAttribute(name, attributes[name]);
        }
        let insertChildren = (children) => {
            for(let child of children){ // of 直接得到值，不能对着对象使用
                
                if (typeof child === 'object' && child instanceof Array){
                    insertChildren(child);
                } else {
                    if (!(child instanceof Component)
                         && !(child instanceof ElementWrapper)
                         && !(child instanceof TextWrapper))
                        child = String(child);
                    if (typeof child === 'string')
                        child =new TextWrapper(child);
                    element.appendChild(child);
                }
            }
        }
        insertChildren(children);       
        return element;
    },
    render(vdom, element){
        let range = document.createRange();
        if (element.children.length) {
            range.setStartAfter(element.lastChild);
            range.setEndAfter(element.lastChild);
        } else {
            range.setStart(element, 0);
            range.setEnd(element, 0);
        }
        vdom.mountTo(range)
    }
}