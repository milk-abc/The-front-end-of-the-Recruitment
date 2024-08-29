三个点->保存并分享->创建二维码

pad打开对应的扫码进行扫描二维码

webgl基础概念

webgl是一个光栅化引擎，它可以根据你的代码绘制出点，线和三角形。想要利用wengl完成更复杂任务，取决于你能否提供合适的代码，组合使用点，线和三角形代替完成。

webgl在电脑的GPU中运行。因此你需要使用能够在GPU上运行的代码。这样的代码需要提供成对的方法。每对方法中一个叫顶点着色器，另一个叫片段着色器，并且使用一种和C或C++类似的强类型的语言GLSL。每一对组合起来称作一个program(着色程序)。

顶点着色器的作用是计算顶点的位置。根据计算出的一系列顶点位置，Webgl可以对点，线和三角形在内的一些图元进行光栅化处理。当对这些图元进行光栅化处理时需要使用片段着色器方法。片段着色器的作用是计算出当前绘制图元中每个像素的颜色值。

几乎整个Webgl api都是关于如何设置这些成对方法的状态值以及运行它们。对于想要绘制的每一个对象，都需要先设置一系列状态值，然后通过调用gl.drawArrays或gl.drawElements运行一个着色方法对，使得你的着色器对能够在GPU上运行。

这些方法对所需的任何数据都需要发送到GPU，这里有着色器获取数据的四种方法

1.属性和缓冲

缓冲是发送到GPU的一些二进制数据序列，通常情况下缓冲数据包括位置、法向量、纹理坐标、顶点颜色值等。你可以存储任何数据。

属性用来指明怎么从缓冲中获取所需数据并将它提供给顶点着色器。例如你可能在缓冲中用三个32位的浮点型数据存储一个位置值。对于一个确切的属性你需要告诉它从哪个缓冲中获取数据，获取什么类型的数据（三个32位的浮点数据），起始偏移值是多少，到下一个位置的字节数是多少。

缓冲不是随意读取的。事实上顶点着色器运行的次数是一个指定的确切数字，每一次运行属性会从指定的缓冲中按照指定规则依次获取下一个值。

2.全局变量（Uniforms）

全局变量在着色程序运行前赋值，在运行过程中全局有效。

3.纹理textures

纹理是一个数据序列，可以在着色程序运行中随意读取其中的数据。大多数情况存放的是图像数据，但是纹理仅仅是数据序列，你也可以随意存放除了颜色数据以外的其它数据。

4.可变量varyings

可变量是一种顶点着色器给片段着色器传值的方式，依照渲染的图元是点，线还是三角形，顶点着色器中设置的可变量会在片元着色器运行中获取不同的插值。

WEBGL HELLO WORLD

webgl只关心两件事：裁剪空间中的坐标值和颜色值。使用webgl只需要给它提供这两个东西。你需要提供两个着色器来做这两件事，一个顶点着色器提供裁剪空间坐标值，一个片段着色器提供颜色值。

无论你的画布有多大，裁剪空间的坐标范围永远是-1到1。这里有一个简单的Webgl例子展示webgl的简单用法。

让我们从顶点着色器开始

```glsl
// 一个属性值，将会从缓冲中获取数据
attribute vec4 a_position;
 
// 所有着色器都有一个main方法
void main() {
 
  // gl_Position 是一个顶点着色器主要设置的变量
  gl_Position = a_position;
}
```

如果用javascript代替GLSL，当它运行的时候，你可以想象它做了类似以下的事情

```
// *** 伪代码!! ***
 
var positionBuffer = [
  0, 0, 0, 0,
  0, 0.5, 0, 0,
  0.7, 0, 0, 0,
];
var attributes = {};
var gl_Position;
 
drawArrays(..., offset, count) {
  var stride = 4;
  var size = 4;
  for (var i = 0; i < count; ++i) {
     // 从positionBuffer复制接下来4个值给a_position属性
     const start = offset + i * stride;
     attributes.a_position = positionBuffer.slice(start, start + size);
     runVertexShader();// 运行顶点着色器
     ...
     doSomethingWith_gl_Position();
}
```

实际情况没有那么简单，因为 `positionBuffer` 将会被转换成二进制数据（见下文）， 所以真实情况下从缓冲中读取数据有些麻烦，但是希望这个例子能够让你想象出顶点着色器是怎么执行的。

接下来我们需要一个片段着色器

```
// 片段着色器没有默认精度，所以我们需要设置一个精度
// mediump是一个不错的默认值，代表“medium precision”（中等精度）
precision mediump float;
 
void main() {
  // gl_FragColor是一个片段着色器主要设置的变量
  gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“红紫色”
}
```

上方我们设置 `gl_FragColor` 为 `1, 0, 0.5, 1`，其中1代表红色值，0代表绿色值， 0.5代表蓝色值，最后一个1表示阿尔法通道值。WebGL中的颜色值范围从 0 到 1 。

现在我们有了两个着色器方法，让我们开始使用WebGL吧

首先我们需要一个HTML中的canvas（画布）对象

```
 <canvas id="c"></canvas>
```

然后可以用JavaScript获取它

```
 var canvas = document.querySelector("#c");
```

现在我们创建一个WebGL渲染上下文（WebGLRenderingContext）

```
 var gl = canvas.getContext("webgl"); if (!gl) {    // 你不能使用WebGL！    ...
```

现在我们需要编译着色器对然后提交到GPU，先让我们通过字符串获取它们。 你可以利用JavaScript中创建字符串的方式创建GLSL字符串：用串联的方式（concatenating）， 用AJAX下载，用多行模板数据。或者在这个例子里，将它们放在非JavaScript类型的标签中。

```
<script id="vertex-shader-2d" type="notjs">
// 一个属性变量，将会从缓冲中获取数据
  attribute vec4 a_position;
 
  // 所有着色器都有一个main方法
  void main() {
 
    // gl_Position 是一个顶点着色器主要设置的变量
    gl_Position = a_position;
  }
 
</script>
 
<script id="fragment-shader-2d" type="notjs">
 
  // 片段着色器没有默认精度，所以我们需要设置一个精度
  // mediump是一个不错的默认值，代表“medium precision”（中等精度）
  precision mediump float;
 
  void main() {
    // gl_FragColor是一个片段着色器主要设置的变量
    gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“瑞迪施紫色”
  }
 
</script>
```

事实上，大多数三维引擎在运行时利用模板，串联等方式创建GLSL。 对于这个网站上的例子来说，没有复杂到要在运行时创建GLSL的程度。

接下来我们使用的方法将会创建一个着色器，只需要上传GLSL数据，然后编译成着色器。 你可能注意到这段代码没有任何注释，因为可以从方法名很清楚的了解方法的作用 （这里作为翻译版本我还是稍微注释一下）。

```
// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
function createShader(gl, type, source) {
  var shader = gl.createShader(type); // 创建着色器对象
  gl.shaderSource(shader, source); // 提供数据源
  gl.compileShader(shader); // 编译 -> 生成着色器
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
```

现在我们可以使用以上方法创建两个着色器

```
var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
```

然后我们将这两个着色器 *link*（链接）到一个 *program*（着色程序）

```
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
```

然后调用它

```
var program = createProgram(gl, vertexShader, fragmentShader);
```

现在我们已经在GPU上创建了一个GLSL着色程序，我们还需要给它提供数据。 WebGL的主要任务就是设置好状态并为GLSL着色程序提供数据。 在这个例子中GLSL着色程序的唯一输入是一个属性值`a_position`。 我们要做的第一件事就是从刚才创建的GLSL着色程序中找到这个属性值所在的位置。

```
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
```

寻找属性值位置（和全局属性位置）应该在初始化的时候完成，而不是在渲染循环中。

属性值从缓冲中获取数据，所以我们创建一个缓冲

```
var positionBuffer = gl.createBuffer();
```

WebGL可以通过绑定点操控全局范围内的许多数据，你可以把绑定点想象成一个WebGL内部的全局变量。 首先绑定一个数据源到绑定点，然后可以引用绑定点指向该数据源。 所以让我们来绑定位置信息缓冲（下面的绑定点就是`ARRAY_BUFFER`）。

```
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
```

现在我们需要通过绑定点向缓冲中存放数据

```
// 三个二维点坐标
var positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

这里完成了一系列事情，第一件事是我们有了一个JavaScript序列`positions` 。 然而WebGL需要强类型数据，所以`new Float32Array(positions)`创建了32位浮点型数据序列， 并从`positions`中复制数据到序列中，然后`gl.bufferData`复制这些数据到GPU的`positionBuffer`对象上。 它最终传递到`positionBuffer`上是因为在前一步中我们我们将它绑定到了`ARRAY_BUFFER`（也就是绑定点）上。

最后一个参数`gl.STATIC_DRAW`是提示WebGL我们将怎么使用这些数据。WebGL会根据提示做出一些优化。 `gl.STATIC_DRAW`提示WebGL我们不会经常改变这些数据。

在此之上的代码是 **初始化代码**。这些代码在页面加载时只会运行一次。 接下来的代码是**渲染代码**，而这些代码将在我们每次要渲染或者绘制时执行。

渲染

顶点着色器只是简单的传递了位置信息。由于位置数据坐标就是裁剪空间中的坐标，所以顶点着色器没有做什么特别的事。如果你想做三维渲染，你需要提供合适的着色器将三维坐标转换到裁剪空间坐标，因为webgl只是一个光栅化API。

对于描述二维空间中的物体，比起裁剪空间坐标你可能更希望使用屏幕像素坐标。所以我们来改造一下顶点着色器，让我们提供给它像素坐标而不是裁剪空间坐标。

这是我们新的顶点着色器

```
<script id="vertex-shader-2d" type="notjs">
 
  attribute vec2 a_position;
  uniform vec2 u_resolution;
  void main(){
  	//从像素坐标转换到0.0到1.0
  	vec2  zeroToOne = a_position/u_resolution;
  	//再把0->1转换到0->2
  	vec2 zeroToTwo = zeroToOne * 2.0;
  	//把0->2转换到-1->+1(裁剪空间)
  	vec2 clipSpace = zeroToTwo - 1.0;
  	gl_Position = vec4(clipSpace, 0 ,1);
  }
 
</script>
```

这里有些变化需要注意，我们将a_position改成vec2类型是因为我们只需要用x和y值。vec2和vec4有些类似但是仅有x和y值。

接着我们添加了一个uniform(全局变量)叫做u_resolution，为了设置它的值我们需要找到它的位置。

```
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
```

其余变化的应该能从注释中理解。通过设置u_resolution为画布的分辨率，着色器将会从positionBuffer中获取像素坐标将之转换为对应的裁剪空间坐标。

现在我们可以将位置信息转换为像素坐标。这次我们将通过绘制两个三角形来绘制一个矩形，每个三角形有三个点。

```
var positions = [
  10, 20,
  80, 20,
  10, 30,
  10, 30,
  80, 20,
  80, 30,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
```

在我们设置好使用这个着色程序后，可以设置刚才创建的全局变量的值。gl.useProgram就与之前降到的gl.bindBuffer相似，设置当前使用的着色程序。之后所有类似gl.uniformXXX格式的方法都是设置当前着色程序的全局变量。

```
gl.useProgram(program);
 
...
 
// 设置全局变量 分辨率
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
```

显然我们需要告诉webgl要运行六次顶点着色器来画两个三角形。所以我们将count改成6。

```
// 绘制
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);
```

旋转矩阵：[0,1]















































































