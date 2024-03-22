##### HTTP1.1

![image-20240321210245276](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240321210245276.png)

一个TCP连接一次只能发一个HTTP请求，收到HTTP响应后才发下一个。若一直未收到响应，则会造成HTTP队头阻塞。谷歌浏览器默认有6个连接。虽然有管线化的技术，但是不可用，按顺序发送按顺序接收，如果丢包了会顺序替换。因此出现了浏览器优化，精灵图，base64，js和css合并到html中等。

报文主体压缩，首部不压缩。

##### HTTP2

多路复用：单个TCP连接就可以进行交错发送请求和响应，并且互不影响。

原本HTTP报文的首部和实体可以拆分为首部帧和数据帧，帧中的流标识符可以按顺序进行组合。

![image-20240321213412924](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240321213412924.png)

首部也会进行压缩，引入的HPACK的压缩算法，要求浏览器和服务器都保留一张静态表，去掉了索引，后续重复的首部可以实现在二次请求和响应里直接去掉。cookie和token这样的首部可以作为动态信息加入动态首部。

不是ASCII编码的报文，而是被提前转化为二进制的帧，解析更快。

服务器推送，不需要等浏览器解析HTML时再一个一个响应，而是把浏览器后续可能需要的文件一次性发给浏览器。

还有TCP队头阻塞。

##### HTTP3

![image-20240321220552085](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240321220552085.png)

HTTP3把HTTP2的TCP/TLS握手整合到一起变成QUIC握手了，减少了来回带来的开销，如果是恢复的会话还可以不用再重新握手。

![image-20240321220931809](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240321220931809.png)

![image-20240321221229450](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240321221229450.png)

![image-20240322140757453](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240322140757453.png)

只要连接ID没变就不需要重新建立连接。