### Three之TransformControl

#### TransformControlsGizmo

定义了各种轴的公共Material和可复用的Geometry，其中箭头轴身是用圆柱体CylinderGeometry
表达的，箭头本身也是用CylinderGeometry表达圆锥体的，之所以用这些三维几何体表达是为了从任何一个面都能看到这些轴，这样不管在任何视角看都是长方形和三角形的组合。旋转轴是用圆环几何体TorusGeometry构成的，里面白色的那个是八面体OctahedronGeometry。设置默认显示的轴gizmoTranslate，拾取用的轴pickerTranslate【隐藏用于拾取的判断，一般比默认的轴范围大】，一些操作过程中的辅助轴helperTranslate。
思考Tips？
什么时候使用

```
object.updateMatrix() camera.updateMatrixWorld() camera.updateProjectionMatrix() 
```

修改了object的位置、旋转、缩放时使用object.updateMatrix()更新物体
修改了摄像机的位置、旋转时使用camera.updateMatrixWorld()更新相机
修改了相机投影属性时，fov，aspect，near，far这些时使用camera.updateProjectionMatrix()更新投影矩阵
修改物体材质时，需要使用material.needsUpdate = true更新材质
// 直接通过矩阵修改几何体的顶点坐标位置
这一步将对象的变换（位置、旋转、缩放）应用到几何体上，使得几何体在世界坐标系中保持当前的外观。
这样做的结果是，几何体的顶点位置被永久性地改变，以反映对象在场景中的位置和方向。

```
const tempGeometry = object.geometry.clone();
tempGeometry.applyMatrix4( object.matrix );

object.geometry = tempGeometry;
object.renderOrder = Infinity;
```

重置对象的变换属性：
这些操作将对象的变换属性重置为默认值。
由于几何体已经被转换到世界坐标系中，
重置对象的变换属性不会改变几何体在场景中的外观。

```
object.position.set( 0, 0, 0 );
object.rotation.set( 0, 0, 0 );
object.scale.set( 1, 1, 1 );
```


为什么要这样做？
简化后续操作：通过将几何体转换到世界坐标系并重置对象的变换属性，
可以简化后续的几何体操作或动画，因为不再需要考虑对象的局部变换。

通过调整控件的缩放大小，使其在屏幕上看起来大小没变
camera.zoom的修改实际上影响的是相机的投影属性，而不是相机本身的物理属性
在相机中，zoom不是改变你和物体的距离，而是改变你所看到的视野范围。当你增大zoom时，视锥体变瘦、变矮 ---> 更小的世界区域映射到屏幕，但屏幕到浏览器的还是一个屏幕--->看到的世界单位变少，每个单位占据更多像素，导致物体在屏幕上显得更大更近--->为了恒定控件的大小--->需要将控件的尺寸除以zoom ----> 
在正交相机中，相机和物体之间的距离不会影响物体在屏幕上的大小，只有相机的设置投影属性会影响物体在屏幕上的大小，top, bottom, zoom
( this.camera.top - this.camera.bottom ) / this.camera.zoom  是当前视图中世界单位的高度范围， 这个计算结果可以用于调整对象的大小，使其在不同的相机设置下保持一致的视觉效果
每像素对应世界单位 factor/canvasHeaight，
每世界单位对应像素 canvasHeight/factor 

在透视相机中，this.worldPosition.distanceTo( this.cameraPosition ) 表示物体到相机的直线距离，在透视相机下，物体越远，屏幕上看起来越小，所以为了保持控件大小不变，要乘以这个距离：越远---> factor越大--->控件越大[抵消变小的透视缩放]
Math.tan( Math.PI * this.camera.fov / 360 ) 把fov[角度]转换为弧度，并取tan(fov/2)
在透视投影中：fov决定了你能看到的区域的角度，tan(fov/2)给出了半视角对应的高度/距离比
屏幕上可视高度 = 2[代码里是1.9 差不多] * 相机到far平面的距离 * tan(fov/2)

除以 zoom：因为透视相机的zoom越大，控件越大，/zoom 抵消控件的放大，为了控制最大factor，防止控件无限放大，UI崩坏设置7是最大值

```
let factor;
if ( this.camera.isOrthographicCamera ) {
    factor = ( this.camera.top - this.camera.bottom ) / this.camera.zoom;
} else {
	 factor = this.worldPosition.distanceTo( this.cameraPosition )   * Math.min( 1.9 * Math.tan( Math.PI * this.camera.fov / 360 ) /       this.camera.zoom, 7 );
}
    handle.scale.set( 1, 1, 1 ).multiplyScalar( factor * this.size / 4 );
```

```
lookAt(eye, target, up)
参数名	代表含义	在你的代码中
eye	相机/物体“站在哪里”
target	“我想看向哪”
up	“我头顶朝哪边” → 用来确定水平/倾斜方向
```

#### TransformControlsPlane

1.plane 平面构建，拿选中的轴和相机视线的叉积 和 选中的轴 构成一个平面，拿相机和鼠标初始点击屏幕位置的标准设备坐标的near平面和far平面做一条射线，和场景中的几何体求交，得到实际的3D世界坐标，再计算鼠标松开时屏幕位置的3D世界坐标，计算之间的offset
第一步：将鼠标屏幕坐标转换为 NDC（标准设备坐标）
这是将 2D 鼠标坐标（像素单位）映射到 -1 到 1 的范围：

```
const mouse = new THREE.Vector2(); 
mouse.x = (event.clientX / window.innerWidth) * 2 - 1; 
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
```

第二步：使用 Raycaster 从相机投射出一条射线

```
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);
```

此时 raycaster.ray.origin 是相机位置，raycaster.ray.direction 是从相机出发指向鼠标位置的一条单位向量。
第三步：与场景中的物体求交
你需要把需要检测的物体（如地面或网格）传给 Raycaster
const intersects = raycaster.intersectObjects(scene.children, true);
intersects 是一个命中的对象列表，按距离从近到远排序。每个元素包含：

```
{
  distance: 3.56,
  point: Vector3(实际的交点坐标),
  object: Mesh,
  ...
}
```

你通常只用第一个交点：

```
if (intersects.length > 0) {
  const point3D = intersects[0].point; // 这就是鼠标对应的 3D 坐标
}
```

如果是投影到某个平面（而不是物体）呢？
 比如投影到 y=0 的地面平面：

```
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // y=0 的平面
const intersection = new THREE.Vector3();
raycaster.ray.intersectPlane(plane, intersection);

raycaster.setFromCamera(mouse, camera)  
```

##### 这一行代码具体做了什么？

根据鼠标在 NDC 中的位置，计算从相机出发、穿过鼠标指向方向的射线（origin + direction），供后续的交点检测使用

计算射线的起点（ray.origin）
●透视相机（PerspectiveCamera）：
 设置为相机的位置：ray.origin = camera.position
●正交相机（OrthographicCamera）：
 设置为鼠标 NDC 对应的世界坐标：ray.origin = unproject(mouse.x, mouse.y, 0)
计算射线的方向（ray.direction）
把鼠标NDC坐标(x,y,z=-1) 和 (x,y,z=1) 反投影成世界坐标
用两个点构造方向向量：

```
// Near and far points in world space
const pNear = new THREE.Vector3(mouse.x, mouse.y, -1).unproject(camera);
const pFar = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera);

// direction = pFar - pNear
ray.direction = pFar.sub(pNear).normalize();
```

对于透视相机，pNear ≠ camera.position，但非常接近摄像机近平面上某点。
最终设置：

```
raycaster.ray.origin = camera.position; // 透视相机
raycaster.ray.direction = normalized vector from camera → mouse direction
```



```
threejs源码
setFromCamera(coords, camera) {
  if (camera.isPerspectiveCamera) {
    ray.origin.copy(camera.position);
    // 构建 NDC 空间的点，unproject 转成世界坐标
    ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(ray.origin).normalize();
  }

  if (camera.isOrthographicCamera) {
    ray.origin.set(coords.x, coords.y, -1).unproject(camera);
    ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
  }
}
```

##### vector.unproject(camera)具体做了什么？

会把这个点从NDC坐标空间 转换到 世界空间 ---- 也就是把你在屏幕上点击的位置，反推回3D世界中的具体坐标点

##### 什么是NDC空间？

假设你点击了屏幕正中间，Threejs 会把你点击的鼠标屏幕位置转换为 -1 到 1 之间的NDC，坐标范围永远是

```
x ∈ [-1, 1]（左 -1，右 +1）
y ∈ [-1, 1]（下 -1，上 +1）
z ∈ [-1, 1]（-1 是近平面，+1 是远平面）
```



##### unproject 做了哪些数学变换？

原本投影流程是：
世界坐标-视图矩阵[相机的世界坐标的逆矩阵]->相机坐标-[投影矩阵]->裁剪空间坐标-[透视除法]->NDC坐标
unproject就是反过来：
NDC坐标->裁剪空间坐标-[投影矩阵的逆]->相机坐标-[相机的世界坐标的矩阵]->世界坐标

```
vector.applyMatrix4(camera.projectionMatrixInverse);   // NDC → 相机空间
vector.applyMatrix4(camera.matrixWorld);               // 相机空间 → 世界空间
```

想要从坐标系A变换到坐标系B怎么做？
需要先把坐标从 A 坐标系转换到世界坐标系，再从世界坐标系转换到 B 坐标系
详细解释：
1.坐标系 A 的点是用 A 的局部坐标系定义的，比如 P_A
2.你想得到这个点在坐标系 B 的表示 P_B
转换流程：

```
P_A (在A局部坐标) 
    → 乘 A 的变换矩阵 matrixWorld_A → 得到 P_world (世界坐标)
    → 再乘 B 的逆矩阵 matrixWorldInverse_B → 得到 P_B (在B局部坐标)

数学表达式就是：
P_B = matrixWorldInverse_B × matrixWorld_A × P_A
```

简单说：
从 A 到 B 的变换矩阵 = B 的逆矩阵 × A 的变换矩阵



##### 怎么实现旋转不同角度显示不同轴，俯视时不显示上面的轴的？

```
this.eye.applyQuaternion(quaternion.invert());
```

🚘 初始状态：
●车头朝 正北（Z+）
●你站在车的正前方
●所以此时你对车的位置向量是：

```
this.eye = new Vector3(0, 0, 5); // 世界空间下：摄像机在物体 Z+ 方向
```

🚗 现在车旋转了（变了朝向）
车向右转了 90°，也就是车头朝东（X+），侧面变成正对你。
也就是说：
●quaternion 表示这个车已经旋转了 90°（Y轴旋转）
●你还是站在原地（Z+），没动
但现在你想问：
🚘 “车自己认为你现在站在哪边？”

🤔 关键问题：
💥 你还站在 Z+，但车头已经不是 Z+，它是 X+
你现在需要从车自己的视角来看你的位置。

❓怎么办？
你要把你的方向（this.eye）转换到车的“本地视角”。
也就是：“如果车现在没有旋转，它看你在哪？”

✅ 这就要用反旋转：

```
this.eye.applyQuaternion( quaternion.invert() ); 
```

✅ .invert() 的作用是：
把这个方向“反着旋转回来”，变成“车未旋转之前的坐标系”里的方向。

🧮 具体例子：
我们来看一个真实计算的例子！
📍初始情况：
●车头朝 Z+，你在 (0, 0, 5)
●车转了 90°，车头朝 X+
这个时候的 quaternion 是绕 Y 轴转 90°：

```
quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2); 
```

现在你计算：

```
this.eye = new Vector3(0, 0, 5); 
this.eye.applyQuaternion(quaternion.invert()); 
```

🔢 会得到：

```
this.eye = (-5, 0, 0); 
```

也就是说：
你原来在 Z+，现在被“逆转”到了 X-。
也就是说：在车自己原始的坐标系里，你现在在它左边（-X）！

📌 所以它不是“反方向”，而是“换参考系”！
你仍在 Z+，没动。
● 但我们把你转换到了车本地的“眼睛里”：车现在面朝 X+（右边）
●在它眼里，你在左边 → (-5, 0, 0)（也就是本地坐标的 -X）

🔄 总结一下：

```
this.eye.applyQuaternion(quaternion.invert()); 
```

🔁 目的是：
 把“摄像机的方向”，从世界空间转换到物体自己的本地空间
📌 得到的向量代表：
“在物体本地坐标系中，摄像机在我哪一边？”
🌍 不是真的“方向反了”，而是：
“你没动，是我的视角（坐标轴）旋转了，所以你看起来变了。”

🌄 形象一句话：
"你站在原地，车子转了 90°，车再看你 —— 你的位置变了"。
 你没有变，是它的视角变了。

| 意图           | 调用方式                                    | 谁去看谁    | 解释                     |
| -------------- | ------------------------------------------- | ----------- | ------------------------ |
| 相机“看向”目标 | `lookAt(camera, target, up)`                | 相机 → 目标 | 用于设置相机的朝向       |
| 控件“朝向”相机 | `lookAt(camera, myPosition, up)` → 设置给我 | 相机 → 我   | 生成一个能朝向相机的姿态 |

