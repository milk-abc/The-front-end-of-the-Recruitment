import React from "react";
import ReactDOM from "react-dom/client";
const PLACEMENT = "PLACEMENT"; //插入
//虚拟DOM
// let element = (
//   <div id="A1">
//     <div id="B1">
//       <div id="C1"></div>
//       <div id="C2"></div>
//     </div>
//     <div id="B2"></div>
//   </div>
// );
let element = {
  type: "div",
  props: {
    id: "A1",
    children: [
      {
        type: "div",
        props: {
          id: "B1",
          children: [
            {
              type: "div",
              props: {
                id: "C1",
              },
            },
            {
              type: "div",
              props: {
                id: "C2",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          id: "B2",
        },
      },
    ],
  },
};
let container = document.getElementById("root");
//初始化的时候performUnitOfWork将虚拟dom转换为一个个fiber节点，并构建effectlist，完成后返回对应的真实dom元素
//更新时根据effectlist比对alternate上的新旧fiber节点修改fiber数据结构，得到更新后的虚拟DOM节点，并用它构建出新的真实DOM节点
//再用commit将返回的dom元素数组追加到对应节点下真实的渲染出来
//下一个工作单元
//fiber其实也是一个普通的JS对象
let workInProgressRoot = {
  stateNode: container, //此fiber对应的DOM节点
  props: { children: [element] }, //fiber的属性
  /**
   * child,
   * return,
   * sibling
   */
};
let nextUnitOfWork = workInProgressRoot;
function workLoop(deadline) {
  //如果有当前的工作单元，执行它，再返回下一个工作单元
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; //没有时间的话就要让出控制权
  }
  if (!nextUnitOfWork) {
    //如果没有下一个工作单元，则进行挂载
    console.log("render阶段结束");
    //利用effectList链进行挂载
    commitRoot();
  }
  //不管有没有任务，都请求再次调度，每一帧都要执行一次workLoop
  requestIdleCallback(workLoop, { timeout: 500 });
}
function commitRoot() {
  //找到第一个副作用 C1
  let currentFiber = workInProgressRoot?.firstEffect;
  while (currentFiber) {
    console.log("commitRoot", currentFiber.props.id);
    if (currentFiber.effectTag === "PLACEMENT") {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    }
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
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
    completeUnitOfWork(workingInProgressFiber);
    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling; //如果有弟弟，返回弟弟
    }
    workingInProgressFiber = workingInProgressFiber.return; //如果没有儿子也没有弟弟先指向父亲
  }
}
function beginWork(workingInProgressFiber) {
  console.log("beginWork", workingInProgressFiber.props.id);
  if (!workingInProgressFiber.stateNode) {
    //1.创建真实DOM，并没有挂载
    workingInProgressFiber.stateNode = document.createElement(
      workingInProgressFiber.type
    );
    for (let key in workingInProgressFiber.props) {
      if (key !== "children") {
        workingInProgressFiber.stateNode[key] =
          workingInProgressFiber.props[key];
      }
    }
  }
  //2.通过虚拟DOM创建fiber子树
  let previousFiber;
  //children是一个虚拟DOM的数组[element]
  if (Array.isArray(workingInProgressFiber.props.children)) {
    workingInProgressFiber.props.children.forEach((child, index) => {
      //对每个子节点新建一个fiber
      let childFiber = {
        type: child.type, //DOM节点类型div p
        props: child.props,
        return: workingInProgressFiber,
        effectTag: "PLACEMENT", //这个fiber对应的DOM节点需要被插入到父dom中去
        nextEffect: null, //下一个有副作用的节点
      };
      //建立父子兄弟节点之间的fiber的关系
      if (index === 0) {
        workingInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber;
      }
      previousFiber = childFiber;
    });
  }
}
function completeUnitOfWork(workingInProgressFiber) {
  //从C1最底层最左边开始向右向上收集，C1的firstEffect和lastEffect都为null
  console.log("completeUnitOfWork", workingInProgressFiber.props.id);
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
//告诉浏览器在空闲的时间执行workloop
requestIdleCallback(workLoop, { timeout: 500 });
