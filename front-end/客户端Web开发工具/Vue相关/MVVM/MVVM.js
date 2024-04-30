//观察者模式  观察者 被观察者
class Dep {
  //通知所有观察者更新数据
  constructor() {
    this.subs = []; //放所有watcher
  }
  //订阅
  addSub(watcher) {
    //添加watcher
    this.subs.push(watcher);
  }
  //发布
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

//new Watcher 会获取值
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //默认先存放一个老数据
    this.oldValue = this.get();
  }
  get() {
    //vm.$data.school vm.$data.school.name
    //获取值会调用get方法
    Dep.target = this; //就是watcher
    //取值 把这个观察者和数据关联起来
    let value = CompilerUtil.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  update() {
    //更新操作 数据变化后 会调用观察者的update方法
    //真实vue中会将watcher自己放入一个watcher异步队列
    let newValue = CompilerUtil.getVal(this.vm, this.expr);
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}
// vm.$watch(vm, "school.name", (newValue) => {});

class Observer {
  //实现数据劫持功能
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data == "object") {
      //如果是对象才观察
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
      
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value);
    let dep = new Dep(); //给每一个属性都加上一个具有发布订阅的功能
    Object.defineProperty(obj, key, {
      get() {
        //创建watcher时 会取到对应的内容，并且把watcher放到了全局上
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newValue) => {
        //{school:{name:'珠峰'}} school={}
        if (newValue !== value) {
          this.observer(newValue);
          value = newValue;
          dep.notify();
        }
      },
    });
  }
}

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
        //v-model v-html v-bind v-on:click
        let [, directive] = name.split("-");
        let [directiveName, eventName] = directive.split(":");
        //需要调用不同的指令来处理
        CompilerUtil[directiveName](node, expr, this.vm, eventName);
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
    let arr = expr.split(".");
    if (arr.length === 1) {
      return vm.$data[expr];
    }
    return expr.split(".").reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    //vm.$data school.name='rr'
    expr.split(".").reduce((data, current, index, arr) => {
      if (index == arr.length - 1) {
        return (data[current] = value);
      }
      return data[current];
    }, vm.$data);
  },
  model(node, expr, vm) {
    //node是节点 expr是表达式 vm是当前实例
    //给输入框赋予value属性
    let fn = this.updater["modelUpdater"];
    new Watcher(vm, expr, (newVal) => {
      //给输入框加一个观察者 数据更新了会触发此方法
      fn(node, newVal);
    });
    node.addEventListener("input", (e) => {
      let value = e.target.value;
      this.setValue(vm, expr, value);
    });
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  getContentValue(vm, expr) {
    //遍历表达式 将内容重新替换成一个完整的内容 返还回去
    //{{a}}  {{b}} => [a',b']
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    });
  },
  text(node, expr, vm) {
    //expr=>{{a}} {{b}} {{c}}
    let fn = this.updater["textUpdater"];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      //给表达式每个{{}}都加上观察者
      new Watcher(vm, args[1], () => {
        fn(node, this.getContentValue(vm, expr));
      });
      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },
  on(node, expr, vm, eventName) {
    node.addEventListener(eventName, (e) => {
      vm[expr].call(vm, e);
    });
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
    let computed = options.computed;
    let methods = options.methods;
    if (this.$el) {
      //把数据全部转化成用Object.defineProperty来定义
      new Observer(this.$data);
      //将数据获取操作 vm上的取值操作 都代理到 vm.$data

      for (let key in computed) {
        //有依赖关系 vm.$data.getNewName
        Object.defineProperty(this.$data, key, {
          get: () => {
            return computed[key].call(this);
          },
        });
      }
      for (let key in methods) {
        console.log("key", methods[key]);
        Object.defineProperty(this, key, {
          get() {
            return methods[key];
          },
        });
      }
      this.proxyVm(this.$data);
      new Compiler(this.$el, this);
    }
  }
  proxyVm(data) {
    for (let key in data) {
      //{school:{name,age}}
      //this是vm，data是vm.$data
      Object.defineProperty(this, key, {
        get() {
          return data[key]; //实现可以通过vm获取到对应的内容
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    }
  }
}
