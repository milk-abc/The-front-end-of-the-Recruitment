https://threejs.org/examples/#webgl_clipping

##### 该案例展示了局部裁剪和全局裁剪：

局部裁剪是通过设置matrial的clippingPlanes实现，只对绑定了该matrial的mesh生效；

全局裁剪通过设置renderer.clippingPlanes实现，对所有mesh都生效。

clippingPlanes指定裁剪平面，threejs渲染时会做判断，点在plane哪一侧，如果是在被裁剪法向量法向量一侧，像素会被丢弃，效果就是模型会被切开。

clipShadows: true代表阴影也会被裁剪。alphaToCoverage: true作用是减少裁剪边缘锯齿。
