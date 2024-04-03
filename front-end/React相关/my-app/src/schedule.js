import {
  DELETION,
  ELEMENT_TEXT,
  PLACEMENT,
  TAG_HOST,
  TAG_ROOT,
  TAG_TEXT,
  UPDATE,
} from "./constants";
import { setProps } from "./utils";
/**
 * 从根节点开始渲染和调度
 * 两个阶段
 * diff阶段或者叫做render阶段，对比新旧的虚拟DOM，进行增量更新或创建
 * 这个阶段比较花时间，我们可以对任务进行拆分，拆分的维度是虚拟DOM节点，此阶段可以暂停
 * render阶段成果是effect list知道哪些节点更新了删除了增加了
 * render阶段有两个任务 1.根据虚拟DOM生成fiber树 2.收集effectlist
 * commit阶段，进行DOM更新创建阶段，此阶段不能暂停，要一气呵成
 */
let workInProgressRoot = null;
let nextUnitOfWork = null;
let currentRoot = null; //渲染成功之后当前根RootFiber
let deletions = []; //删除的节点我们并不放在effect list里，所以需要单独记录并执行
export function scheduleRoot(rootFiber) {
  //{tag:TAG_ROOT,stateNode:container,props:{children:[element]}}
  if (currentRoot && currentRoot.alternate) {
    //第二次之后的更新
    workInProgressRoot = currentRoot.alternate; //第一次渲染出来的fiber树
    workInProgressRoot.props = rootFiber.props; //让它的props更新成新的props
    workInProgressRoot.alternate = currentRoot; //让这个树的替身指向当前的currentRoot
  } else if (currentRoot) {
    //说明至少已经渲染过一次了 第一次更新
    rootFiber.alternate = currentRoot;
    workInProgressRoot = rootFiber;
  } else {
    //如果说是第一次更新
    workInProgressRoot = rootFiber;
  }
  workInProgressRoot.firstEffect =
    workInProgressRoot.lastEffect =
    workInProgressRoot.nextEffect =
      null;
  nextUnitOfWork = workInProgressRoot;
}
/**
 * beginWork  1.创建此fiber的真实DOM  通过虚拟DOM创建fiber树结构
 * return  返回下一个工作单元
 * @param {*} workingInProgressFiber
 */
function performUnitOfWork(workingInProgressFiber) {
  //1.创建真实DOM，并没有挂载  2.通过虚拟DOM创建fiber子树
  //打印  beginWork A1 B1 C1 completeUnitOfWork C1 beginWork C2 completeUnitOfWork C2 B1
  //beginWork B2  completeUnitOfWork B2 A1
  beginWork(workingInProgressFiber);
  // 遍历顺序为child->sibling->叔叔+
  if (workingInProgressFiber.child) {
    return workingInProgressFiber.child; //如果有儿子，返回儿子
  }
  while (workingInProgressFiber) {
    //如果没有儿子当前节点已经完成了，一个节点所有的儿子都完成了它就完成了
    //在完成的时候要收集有副作用的fiber，然后组成effect list
    completeUnitOfWork(workingInProgressFiber);
    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling; //如果有弟弟，返回弟弟
    }
    workingInProgressFiber = workingInProgressFiber.return; //如果没有儿子也没有弟弟先指向父亲
  }
}
function workLoop(deadline) {
  //如果有当前的工作单元，执行它，再返回下一个工作单元
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; //没有时间的话就要让出控制权
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    //如果没有下一个工作单元，则进行挂载
    console.log("render阶段结束");
    //利用effectList链进行挂载
    commitRoot();
  }
  //不管有没有任务，都请求再次调度，每一帧都要执行一次workLoop
  requestIdleCallback(workLoop, { timeout: 500 });
}
function commitRoot() {
  deletions.forEach(commitWork); //执行effect list之前先把该删除的元素删除
  //找到第一个副作用 C1
  let currentFiber = workInProgressRoot?.firstEffect;
  while (currentFiber) {
    console.log(
      "commitRoot",
      currentFiber.type,
      currentFiber.props?.id,
      currentFiber.props?.text
    );
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  deletions.length = 0; //提交之后要清空deletions数组
  currentRoot = workInProgressRoot; //把当前渲染成功的根fiber赋给currentRoot
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  if (!currentFiber) return;
  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode) {
    //新增节点
    returnDOM.appendChild(currentFiber.stateNode);
  } else if (currentFiber.effectTag === DELETION) {
    //删除节点
    returnDOM.removeChild(currentFiber.stateNode);
  } else if (currentFiber.effectTag === UPDATE) {
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text)
        currentFiber.stateNode.textContent = currentFiber.props.text;
    } else {
      updateDOM(
        currentFiber.stateNode,
        currentFiber.alternate.props,
        currentFiber.props
      );
    }
  }
  currentFiber.effectTag = null;
}
/**
 * beginWork开始收线下的钱
 * completeUnitOfWork把线下的钱收完了
 * 1.创建真实DOM元素，把props加上
 * 2.创建子fiber
 * @param {*} workingInProgressFiber
 */
function beginWork(workingInProgressFiber) {
  console.log("beginWork", workingInProgressFiber.props?.id);
  if (workingInProgressFiber.tag === TAG_ROOT) {
    //根节点
    updateHostRoot(workingInProgressFiber);
  } else if (workingInProgressFiber.tag === TAG_TEXT) {
    //单个文本节点
    updateHostText(workingInProgressFiber);
  } else if (workingInProgressFiber.tag === TAG_HOST) {
    //div span p元素
    updateHost(workingInProgressFiber);
  }
}
function updateHostRoot(workingInProgressFiber) {
  let newChildren = workingInProgressFiber.props.children; //[element]
  reconcileChildren(workingInProgressFiber, newChildren);
}
function updateHostText(workingInProgressFiber) {
  if (!workingInProgressFiber.stateNode) {
    //如果此fiber没有创建DOM节点
    workingInProgressFiber.stateNode = createDOM(workingInProgressFiber);
  }
}
function updateHost(workingInProgressFiber) {
  if (!workingInProgressFiber.stateNode) {
    //如果此fiber没有创建DOM节点
    workingInProgressFiber.stateNode = createDOM(workingInProgressFiber);
  }
  let newChildren = workingInProgressFiber.props.children; //[element]
  reconcileChildren(workingInProgressFiber, newChildren);
}
function createDOM(workingInProgressFiber) {
  if (workingInProgressFiber.tag === TAG_TEXT) {
    return document.createTextNode(workingInProgressFiber.props.text);
  } else if (workingInProgressFiber.tag === TAG_HOST) {
    //span div
    let stateNode = document.createElement(workingInProgressFiber.type);
    //设置对应的props
    updateDOM(stateNode, {}, workingInProgressFiber.props);
    return stateNode;
  }
}
function updateDOM(stateNode, oldProps, newProps) {
  if (stateNode && stateNode.setAttribute) {
    setProps(stateNode, oldProps, newProps);
  }
}
function reconcileChildren(workingInProgressFiber, newChildren) {
  //2.通过虚拟DOM创建fiber子树
  //通过老的fiber和新的虚拟DOM元素比较进行增删改
  //如果说workingInProgressFiber有alternate属性并且alternate有child属性
  let oldFiber =
    workingInProgressFiber.alternate && workingInProgressFiber.alternate.child;
  if (oldFiber)
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
  let previousFiber;
  let index = 0;
  while (index < newChildren.length || oldFiber) {
    let child = newChildren[index];
    let childFiber;
    let tag;
    if (child && child.type === ELEMENT_TEXT) {
      tag = TAG_TEXT; //这是一个文本节点
    } else if (child && typeof child.type === "string") {
      tag = TAG_HOST; //如果type是字符串，那么这是一个原生DOM节点
    }
    const sameType = oldFiber && child && oldFiber.type === child.type;
    if (sameType) {
      //说明老fiber和新虚拟DOM类型一样，可以复用老的DOM节点，更新即可
      if (oldFiber.alternate) {
        childFiber = oldFiber.alternate; //如果类型一致，并且存在上上次Fiber结构，就可以复用
        childFiber.props = child.props;
        childFiber.alternate = oldFiber;
        childFiber.effectTag = UPDATE;
        childFiber.nextEffect = null;
      } else {
        childFiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          props: child.props,
          stateNode: oldFiber.stateNode,
          return: workingInProgressFiber, //父fiber
          alternate: oldFiber, //让新的fiber的alternate指向老的fiber节点
          effectTag: UPDATE, //这个fiber对应的DOM节点需要被更新到父dom中去
          nextEffect: null, //下一个有副作用的节点，effectlist的顺序和完成顺序一样
        };
      }
    } else {
      //对每个子节点新建一个fiber
      if (child) {
        childFiber = {
          tag, //TAG_HOST
          type: child.type, //DOM节点类型div p  div
          props: child.props,
          stateNode: null, //div还没创建DOM元素
          return: workingInProgressFiber, //父fiber
          effectTag: PLACEMENT, //这个fiber对应的DOM节点需要被插入到父dom中去
          nextEffect: null, //下一个有副作用的节点，effectlist的顺序和完成顺序一样
        };
      }
      if (oldFiber) {
        oldFiber.effectTag = DELETION;
        deletions.push(oldFiber);
      }
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling; //oldFiber指针往后移动一次
    }
    if (childFiber) {
      //建立父子兄弟节点之间的fiber的关系
      if (index === 0) {
        workingInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber;
      }
      previousFiber = childFiber;
    }
    index += 1;
  }
}

function completeUnitOfWork(workingInProgressFiber) {
  //从C1最底层最左边开始向右向上收集，C1的firstEffect和lastEffect都为null
  console.log("completeUnitOfWork", workingInProgressFiber.props?.id);
  //构建副作用链effectList 只有那些有副作用的节点
  //firstEffect指向第一个有副作用的子节点，lastEffect指向最后一个有副作用的子节点,nextEffect指向firstEffect下一个有副作用的子节点
  let returnFiber = workingInProgressFiber.return; //A1
  if (returnFiber) {
    //把当前fiber有副作用子链表挂到父亲身上
    if (!returnFiber?.firstEffect) {
      returnFiber.firstEffect = workingInProgressFiber?.firstEffect;
    }
    if (workingInProgressFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        //跨子树时
        //当B2时有用，将B2的全部的子链表添加到B1后面，表现为将firstEffect和lastEffect插入到B1中
        returnFiber.lastEffect.nextEffect = workingInProgressFiber?.firstEffect;
      }
      //将B2的全部的子链表添加到B1后面，表现为将firstEffect和lastEffect插入到B1中
      returnFiber.lastEffect = workingInProgressFiber.lastEffect;
    }
    //如果自己有副作用的话把自己挂到父亲身上
    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        //在C2时，B1的lastEffect为C1，这里完成了C1的nextEffect指向C2
        returnFiber.lastEffect.nextEffect = workingInProgressFiber;
      } else {
        //当父节点没有lastEffect的时候默认它也没有firstEffect
        //默认初始firstEffect和lastEffect都为null
        //C1时firstEffect和lastEffect都指向C1
        //插入第一个节点时
        returnFiber.firstEffect = workingInProgressFiber;
      }
      //将自己永远挂在最后面
      //C1时firstEffect和lastEffect都指向C1
      //C2时B1的lastEffect指向C2，完成了B1->firstEffect->C1->nextEffect->C2<-B1.lastEffect
      returnFiber.lastEffect = workingInProgressFiber;
    }
  }
}
requestIdleCallback(workLoop, { timeout: 500 });
