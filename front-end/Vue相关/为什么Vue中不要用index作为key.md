针对场景
<ul>
  <li>1</li>
  <li>2</li>
</ul>
vnode为
{
  tag: 'ul',
  children: [
    { tag: 'li', children: [ { vnode: { text: '1' }}]  },
    { tag: 'li', children: [ { vnode: { text: '2' }}]  },
  ]
}
更新后为
{
  tag: 'ul',
  children: [
+   { tag: 'li', children: [ { vnode: { text: '2' }}]  },
+   { tag: 'li', children: [ { vnode: { text: '1' }}]  },
  ]
}

首先响应式数据更新后，触发了渲染watcher的回调函数vm._update(vm._render())去驱动视图更新，
vm._render()其实生成的就是vnode,而vm._update就会带着新的vnode去走触发__patch__过程。
ul的patch过程
1.不是相同节点
isSameNode为false的话，直接销毁旧的vnode，渲染新的vnode
2.相同节点，要尽可能的做节点的复用(都是ul，进入)
会调用patchVNode方法
2.1.如果新vnode是文字vnode
就直接调用浏览器的dom api把节点的直接替换掉文字内容就好
2.2.如果新vnode不是文字vnode，需要对children进行对比
2.3.如果有新children没有旧children
说明是新增children，直接addVnodes添加新子节点
2.4.如果有旧没有新children
删除旧子节点
2.5.如果新旧children都存在(都存在li子节点列表，进入)
利用指针在一个while循环中不停的对新旧节点的两端的进行对比，然后把两端的指针向内部不断收缩，直到没有节点可以对比
递归调用对比children的函数
sameVnode函数
function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      )
    )
  )
}
它是用来判断节点是否可用的关键函数，可以看到，判断是否是sameVnode，传递给节点的key是关键
3.1.旧首节点和新首节点用sameNode对比
3.2.旧尾节点和新尾节点用sameNode对比
3.3.旧首节点和新尾节点用sameNode对比
3.4.旧尾节点和新首节点用sameNode对比
如果以上逻辑都匹配不到，再把所有旧子节点的 key 做一个映射到旧节点下标的 key -> index 表，然后用新 vnode 的 key 去找出在旧节点中可以复用的位置。
当内部的值发生改变的时候，会触发这一项的重渲染，但其他的依然会复用