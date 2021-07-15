class Compiler {
  constructor(el, vm) {
    //判断el属性是不是一个元素，如果不是元素，那就获取他
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    //把当前节点中的元素获取到放到内存中

    this.vm = vm;
    let fragment = this.node2fragment(this.el);

    //把节点中的内容进行替换

    //编译模板 用数据编译
    this.compile(fragment);
    //把内容再塞到页面中
    this.el.appendChild(fragment);
  }
  //判断是否以"v-"开头
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  //编译元素的
  compileElemnt(node) {
    let attributes = node.attributes; //类数组
    [...attributes].forEach((attr) => {
      //type="text" v-mode="school.name"
      let { name, value: expr } = attr;
      //判断是不是指令
      if (this.isDirective(name)) {
        //v-model v-html v-bind v-on
        let [, directive] = name.split("-");
        //需要调用不同的指令来处理
        CompilerUtil[directive](node, expr, this.vm);
      }
    });
  }
  //编译文本的
  compileText(node) {
    //判断当前文本节点中内容是否包含{{xxx}} {{aaa}}
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      //文本节点
      CompilerUtil["text"](node, content, this.vm);
    }
  }
  //核心的编译方法
  compile(node) {
    //用来编译内存中的dom节点
    let childNodes = node.childNodes;
    [...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        this.compileElemnt(child);
        //如果是元素的话 需要把自己传进去 再去遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    });
  }
  node2fragment(node) {
    //创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = node.firstChild)) {
      //appendChild具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
CompilerUtil = {
  getVal(vm, expr) {
    //根据表达式取到对应的数据
    return expr.split(".").reduce((data, current, index, arr) => {
      return data[current];
    }, vm.$data);
  },
  model(node, expr, vm) {
    //node是节点 expr是表达式 vm是当前实例
    //给输入框赋予value属性
    let fn = this.updater["modelUpdater"];
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  text(node, expr, vm) {
    //expr=>{{a}} {{b}} {{c}}
    let fn = this.updater["textUpdater"];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },
  updater: {
    //把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value;
    },
    //处理文本节点
    textUpdater(node, value) {
      node.textContent = value;
    },
  },
};
class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    if (this.$el) {
      new Compiler(this.$el, this);
    }
  }
}
