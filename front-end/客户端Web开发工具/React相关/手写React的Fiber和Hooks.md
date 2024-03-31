##### JSX和createElement

以前我们写React要支持JSX还需要一个库叫JSXTransformer.js，后来JSX的转换工作都集成到babel里面了:

```react
const App =
(
  <div>
    <h1 id="title">Title</h1>
    <a href="xxx">Jump</a>
    <section>
      <p>
        Article
      </p>
    </section>
  </div>
);
```

经过babel转换后就变成了这样：

![image-20200608175937104](https://dennisgo.cn/images/React/FiberAndHooks/image-20200608175937104.png)

上面的截图可以看出我们写的html被转换成了React.createElement，我们将上面代码格式化：

```react
var App = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    {
      id: 'title',
    },
    'Title',
  ),
  React.createElement(
    'a',
    {
      href: 'xxx',
    },
    'Jump',
  ),
  React.createElement(
    'section',
    null,
    React.createElement('p', null, 'Article'),
  ),
);
```

从转换后的代码我们可以看出React.createElement支持多个参数：

1.type，也就是节点类型

2.config，这是节点上的属性，比如id和href

3.children，从第三个参数开始就全部是children也就是子元素了，子元素可以有多个，类型可以是简单的文本，也可以还是React.createElement，如果是React.createElement，其实就是子节点了，子节点下面还可以有子节点。这样就用React.createElement得到嵌套关系实现了HTML节点的树形结构。

让我们来完整看下这个简单的React页面代码：

![image-20200608180112829](https://dennisgo.cn/images/React/FiberAndHooks/image-20200608180112829.png)

渲染在页面上是这样：

![image-20240331152348956](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240331152348956.png)

这里面用到了React的地方其实就两个，一个是JSX，也就是React.createElement，另一个就是ReactDOM.render，所以我们手写的第一个目标就有了，就是createElement和render这两个方法。

##### 手写createElement

对于<h1 id="title">Title</h1>这样一个简单的节点，原生DOM也会附加一大堆属性和方法在上面，所以我们在createElement的时候最好能将它转换为一种比较简单的数据结构，只包含我们需要的元素，比如这样：

```react
{
    type:'h1',
    props:{
        id:"title",
        children:'Title'
    }
}
```

有了这个数据结构后，我们对于DOM的操作其实可以转化为对这个数据结构的操作，新老DOM的对比其实也可以转化为这个数据结构的对比，这样我们就不需要每次操作都去渲染页面，而是等到需要渲染的时候才将这个数据结构渲染到页面上。这其实就是虚拟DOM。而我们createElement就是负责来构建这个虚拟DOM的方法，下面我们来实现下：

```react
function createElement(type,props,...children){
    //核心逻辑不复杂，将参数都塞到一个对象上返回就行
    //children也要放到props里面去，这样我们在组件里面就能通过this.props.children拿到子元素
    return {
        type,
        props:{
            ...props,
            children
        }
    }
}
```

##### 手写render

上述代码我们用createElement将JSX代码转换成了虚拟DOM，那真正将它渲染到页面的函数时render，所以我们还需要实现下这个方法，通过我们一般的用法ReactDOM.render(<App/>,document.getElementById('root'));可以知道他接收两个参数：

1.根组件，其实是一个JSX组件，也就是一个createElement返回的虚拟DOM

2.父节点，也就是我们要将这个虚拟DOM渲染的位置

有了这两个参数，我们来实现下render方法：

```react
function render(vDom,container){
    let dom;
    //检查当前节点是文本还是对象
    if(typeof vDom !=="object"){
        dom=document.createTextNode(vDom);
    }else{
        dom=document.createElement(vDom.type);
    }
    //将vDom上除了children外的属性都挂在到真正的DOM上去
    if(vDom.props){
        Object.keys(vDom.props).filter(key=>key!=='children').forEach(item=>{
            dom[item]=vDom.props[item];
        })
    }
    //如果还有子元素，递归调用
    if(vDom.props&&vDom.props.children&&vDom.props.children.length){
        vDom.props.children.forEach(child=>render(child,dom));
    }
    container.appendChild(dom);
}
```

##### 为什么需要fiber

上面我们简单的实现了虚拟DOM渲染到页面上的代码，这部分工作被React官方称为renderer，renderer是第三方可以自己实现的一个模块，还有个核心模块叫做reconciler，reconciler的一大功能就是大家熟知的diff，他会计算出应该更新哪些页面节点，然后将需要更新的节点虚拟DOM传递给renderer，renderer负责将这些节点渲染到页面上，但是这个流程有个问题，虽然React的diff算法是经过优化的，但是他却是同步的，renderer负责操作DOM的appendchild等API也是同步的，也就是说如果有大量节点需要更新，JS线程的运行时间可能比较长，在这段时间浏览器是不会响应其他事件的，因为JS线程和GUI线程是互斥的，JS运行时页面就不会响应，这个时间太长了，用户就可能看到卡顿，特别是动画的卡顿会很明显。而Fiber就是用来解决这个问题的，fiber可以将长时间的同步任务拆分成多个小任务，从而让浏览器能够抽身去响应其他事件，等他空了再回来继续计算，这样整个计算流程就显得平滑很多。下面是使用fiber后的效果。

##### 关键词：长时间的任务拆分成多个可中断执行的小任务

##### 怎么拆分

上面我们自己实现的render方法直接递归遍历了整个vDom树，如果我们在中途某一步停下来，下次再调用时其实并不知道上次在哪里停下来的，不知道从哪里开始，所以vDom的树形结构并不满足中途暂停，下次继续的需求，需要改造数据结构。另一个需要解决的问题是，拆分下来的小人物什么时候执行？我们的目的是让用户有更流畅的体验，所以我们最好不要阻塞高优先级的任务，比如用户输入，动画之类，等他们执行完了我们在计算。那我们怎么知道有没有高优先级任务，浏览器是不是空闲呢？总结下来，fiber要想达到目的，需要解决两个问题：

1.新的任务调度，有高优先级任务的时候将浏览器让出来，等浏览器空了再继续执行

2.新的数据结构，可以随时中断，下次进来可以接着执行

##### requestIdleCallback

requestIdleCallback是一个实验中的新API，这个API调用方式如下：

```
//开启调用
var handle = window.requestIdleCallback(callback[,options]);
//结束调用
Window.cancelIdleCallback(handle);
```

requestIdCallback接收一个回调，这个回调会在浏览器空闲时调用，每次调用会传入一个IdleDeadline，可以拿到当前还空余多久，options可以传入参数最多等多久，等到了时间浏览器还不空就强制执行了。使用这个API可以解决任务调度的问题，让浏览器在空闲时才计算diff并渲染。但是这个API还在实验中，兼容性不好，所以React官方自己实现了一套。本文会继续使用requestIdCallback来进行任务调度，我们进行任务调度的思想是将任务拆分成了多个小任务，requestIdleCallback里面不断的把小任务拿出来执行，当所有任务都执行完或者超时了就结束本次执行，同时要注册下次执行，代码架子就是这样：

```react
function workLoop(deadline){
    //这个while循环会在任务执行完或者时间到了的时候结束
    while(nextUnitOfWork && deadline.timeRemaining()>1){
        //performUnitOfWork用来执行任务，参数是我们的当前fiber任务，返回值是下一个任务
        nextUnitOfWork=performUnitOfWork(nextUnitOfWork)
    };
    //如果任务还没完，但是时间到了，我们需要继续注册requestIdleCallback
    requestIdleCallback(workLoop);
}
//performUnitOfWork用来执行任务，参数是我们的当前fiber任务，返回值是下一个任务
function performUnitOfWork(fiber){
    
}
requestIdleCallback(workLoop)
```

##### Fiber可中断数据结构

上面我们的performUnitOfWork并没有实现，但是从上面的结构可以看出来，他接收的参数是一个小任务，同时通过这个小任务还可以找到他的下一个小任务，fiber构建的就是这样一个数据结构。fiber之前的数据结构是一颗树，父节点的children指向了子节点，但是只有这一个指针是不能实现中断继续的。比如我现在有一个父节点A，A有三个子节点B,C,D，当我遍历到C的时候中断了，重新开始的时候，其实我是不知道C下面该执行哪个的，因为只知道C，并没有指针指向他的父节点，也没有指针指向他的兄弟。Fiber就是改造了这样一个结构，加上了指向父节点和兄弟节点的指针：

![image-20200609173312276](https://dennisgo.cn/images/React/FiberAndHooks/image-20200609173312276.png)

上面的图片还是来自于官方的演讲，可以看到和之前父节点指向所有子节点不同，这里有三个指针：

1、child：父节点指向第一个子元素的指针

2、sibling：从第一个子元素往后，指向下一个兄弟元素

3、return：所有子元素都有的指向父元素的指针

有了这几个指针后，我们可以在任意一个元素中断遍历并恢复，比如在上图List处中断了，恢复的时候可以通过child找到他的子元素，也可以通过return找到他的父元素，如果他还有兄弟节点也可以用sibling找到。Fiber这个结构外形看着还是棵树，但是没有了指向所有子元素的指针，父节点只指向第一个子节点，然后子节点有指向其他子节点的指针，这其实是个链表。

##### 实现Fiber

现在我们可以自己来实现一下Fiber了，我们需要将之前的vDom结构转换为Fiber的数据结构，同时需要能够通过其中任意一个节点返回下一个节点，其实就是遍历这个链表。遍历的时候从根节点出发，先找子元素，如果子元素存在，直接返回，如果没有子元素了就找兄弟元素，找完所有的兄弟元素后再返回父元素，然后再找这个父元素的兄弟元素。整个遍历过程其实是个深度优先遍历，从上到下，然后最后一行开始从左到右遍历。比如下图从div1开始遍历的话，遍历的的顺序就应该是div1 -> div2 -> h1 -> a -> div2 -> p -> div1。可以看到这个序列中，当我们return父节点时，这些父节点会被第二次遍历，所以我们写代码时，return的父节点不会作为下一任务返回，只有sibling和child才会作为下一个任务返回。

![image-20200610162336915](https://dennisgo.cn/images/React/FiberAndHooks/image-20200610162336915.png)

```react
//performUnitOfWork用来执行任务，参数是我们的当前fiber任务，返回值是下一个任务
function performUnitOfWork(fiber){
  //根节点的dom就是container，如果没有这个属性，说明当前fiber不是根节点
  if(!fiber.dom){
    fiber.dom=createDom(fiber);//创建一个DOM挂载上去
  }
  //如果有父节点，将当前节点挂载到父节点上
  if(fiber.return){
    fiber.return.dom.appendChild(fiber.dom);
  }
  //将我们前面的vDom结构转换为fiber结构
  const elements=fiber.children;
  let prevSibling=null;
  if(elements&&elements.length){
    for(let i=0;i<elements.length;i++){
      const element=elements[i];
      const newFiber={
        type:element.type,
        props:element.props,
        return:fiber,
        dom:null
      }
      //父级的child指向第一个子元素
      if(i===0){
        fiber.child=newFiber;
      }else{
        //每个兄弟节点拥有指向下一个兄弟节点的指针
        prevSibling.sibling=newFiber;
      }
      prevSibling=newFiber;
    }
  }
  //这个函数的返回值是下一个任务，这其实是一个深度优先遍历
  //先找子元素，没有子元素了就找兄弟元素
  //兄弟元素也没有了就返回父元素
  //然后再找这个父元素的兄弟元素
  //最后到根节点结束
  //这个遍历的顺序其实就是从上到下，从左到右
  if(fiber.child){
    return fiber.child;
  }
  let nextFiber=fiber;
  while(nextFiber){
    if(nextFiber.sibling){
      return nextFiber.sibling
    }
    nextFiber=nextFiber.return;
  }
}
```

##### 统一commit DOM操作

上面我们的performUnitOfWork一边构建Fiber结构一边操作DOM appendChild，这样如果某次更新好几个节点，操作了第一个节点之后就中断了，那我们可能只看到第一个节点渲染到了页面，后续几个节点等浏览器空了才陆续渲染。为了避免这种情况，我们应该将DOM操作都搜集起来，最后统一执行，这就是commit。为了能够记录位置，我们还需要一个全局变量`workInProgressRoot`来记录根节点，然后在`workLoop`检测如果任务执行完了，就`commit`:

```react
function workLoop(deadline){
  while(nextUnitOfWork&&deadline.timeRemaining()>1){
    //这个while循环会在任务执行完或者时间到了的时候结束
    nextUnitOfWork=performUnitOfWork(nextUnitOfWork);
  }
  //任务做完后统一渲染
  if(!nextUnitOfWork&&workInProgressRoot){
    commitRoot();
  }
  //如果任务还没完，但是时间到了，我们需要继续注册requestIdleCallback
  requestIdleCallback(workLoop);
}
```

因为我们是在Fiber树完全构建后再执行的commit，而且有一个变量workInPro



























































