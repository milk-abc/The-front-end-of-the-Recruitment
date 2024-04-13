##### 验证码登录

###### 问题1：

后端写了验证码生成的接口后，postman能跑通，但是前端始终报错，打印状态码显示0

调查过程：

![image-20240408212912791](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240408212912791.png)

原因：

xMLHttp虽然去访问了，但是浏览器跨域的返回头没有允许，所以浏览器阻止Access-Control-Allow-Origin这个属性，所以status为0。

解决：

###### 问题2：

![image-20240408215503420](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240408215503420.png)

###### 问题3：

为什么验证码要用session？

因为需要设置过期时间，过一段时间需要刷新。

用express web开发框架开发网站时，关于session的设置大致可以分为两种情况，一种是只要用户通过浏览器访问网站就会生成session，第二种是只有用户登录的情况下才能生成session。

第一种的案例网站比较多，比方百度、淘宝、360等等，咱们来看一下百度首页：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/mboyfni9oy.jpeg)

我首先清除了浏览器的所有cookie，然后访问百度首页，在未登录情况下，浏览器依然存储了cookie。

用express开发网站设置session需要用到一个npm安装包，express-session，用这个包，就可以设置网站的session，在使用express-session时需要设置一个参数来配置session是否需要初始化。这个参数的名字比较长：saveUninitialized

设置如下：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/coonr6ug80.png)

saveUninitialized默认值为true，但是必须显性的设置一下，不然express-session会报一个警告:

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/y0zhky8wa.png)

当设置为true时，用户不论是否登录网站，只要访问网站都会生成一个session，只不过这个session是一个空的session，存储结构为：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/rxl2qf2rnh.png)

sessionid作为一个标识由后端设置set-cookie响应头的方式，告诉浏览器用cookie存储此sessionid，看一下百度的响应头：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/whvzdp6ehp.png)

那这种未登录就需要设置session的配置方式和只有登录情况下设置session的方式有什么不同呢？

前一种方式是为了方便设置验证机制，不知道大家上网有没有碰到过输入验证码的情况。

在讲解案例之前，首先咱来思考一下，网站登录为什么需要输入验证码呢？  

验证码一般是防止有人利用机器人自动批量注册、对特定的注册用户用特定程序暴力破解方式进行不断的登陆、灌水。因为验证码是一个混合了数字或符号的图片，人眼看起来都费劲，机器识别起来就更困难。像百度贴吧未登录发贴要输入验证码大概是防止大规模匿名回帖的发生。 一般注册用户ID的地方以及各大论坛都要要输入验证码。

以上答案已经很详细了，简单来说，就是增加登录难度，防止恶意登录注册。

那验证码的原理是啥呢？这里就需要用到session技术了。分如下几步来说明session技术配合实现验证码机制：

第一步，用户访问网站(未登录)，生成空的session，通过cookie记录sessionid

第二步，用户跳转到登录页面：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/2baafrz3or.png)

这个页面会向后端发送一个请求，这个请求可能是ajax发送的也可能是点击登录后渲染页面时一起发送到的，不论哪种方式，此时后端[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)，会根据此时用户的cookie中记录的sessionid找到前面生成的空session，生成一个验证码，存储结构如下：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/rnmh44tkfg.png)

第三步，用户填写完用户信息，点击提交，表单信息包括 {验证码：“大王”} 会被发送到服务器，服务器首先根据用户请求中用户的cookie中的sessionid，找到设置的验证码，和前端发送的验证码进行比对，若一致，则继续进行账号密码验证登录，若不一致则返回错误，从这里也可以看出，验证码机制可以单独抽离成一个微服务。

第四步，验证码验证通过，验证登录，将用户信息存入session，用户变为登录状态。此时session存储结构为：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/ez0uyjts9z.png)

关于第二种情况，只有登录情况下设置session，一般用于内部OA系统，不需要验证码机制，不需要这么麻烦。

express-session中的另外一个十分有用的参数是rolling，这个参数又是干什么用的呢？

简单在这里解释一下，解释之前首先咱们思考一个场景，比方说我上午登录的淘宝，中午下班我去吃饭了，中午回来之后刷新网页，登录显示超时，需要重新登录。但是假如我比较敬业中午不吃饭了，一直在刷淘宝，午饭时间已经过了，其他同事纷纷回来了，但是这时我的淘宝并没有退出，一直是登录状态，中间不需要重新登录，这是为什么呢？

总结这个场景发现两种情况：

1、登陆淘宝后，一段时间未刷新网页，会自动退出

2、登陆淘宝后，一直在浏览淘宝信息，一直刷新，跳转网页，就不会退出。

为什么会出现上面两种情况呢？

相信有部分同学已经猜到了，session设置一般有个过期时间，在express-session中是通过maxAge来设置。

时间到期之后，session会被自动删除，需要重新登录，比方说淘宝设置session保存1小时，我从登录开始，一小时后，session会被删除，但是现实是如果我一直在浏览淘宝的页面，一小时后并不会删除，而是一小时之内我不去刷新淘宝页面就会将session删除。

为什么会这样呢？这是因为，session的计时设置是根据：用户最后一次请求开始计算，这就需要用户每次请求都需要修改session的保存时间。

那在express中如何设置呢？将express-session的rolling的值设置为ture即可，这个值默认为false，需要手动开启，设置如图：

![img](https://ask.qcloudimg.com/http-save/yehe-5837318/g2c7naprcv.png)

以上便是在使用express-session这个npm包碰到的一些问题，特此和大家分享出来。

学习nodejs开发网站肯定要学习express框架，学习express框架，肯定绕不过session登陆的设置，而如果对于一些刚刚接触网站登陆设置的新手来说，express-session这个npm包是个不错的选择。

这篇文章不算是入门文章，只能算是填坑文章，只有踩到这个坑的同学才会深有感触，但是文章中关于session的存储方式，验证码机制，相信对大家来说还是很有帮助的。

-------------------------------------------------------------------------------------------------------------------------------------------------------

nodejs热更新：nodemon

-------------------------------------------------------------------------

##### 鉴权

node中的核心模块----crypto提供加密解密

node获取响应头Authorization的方法：res.setHeader("Access-Control-Expose-Headers", "Authorization");

![image-20240412102647577](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240412102647577.png)

![image-20240412102908504](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240412102908504.png)

##### mysql

关于mysql语句，最好先在数据库【Navicat Premium】中写好执行准确后再在代码里调试。

###### 可以选择对应语句执行

select * from task 

select * from category 

###### 联表查询分组

select ca.id, ca.name, count(ta.id) as 'count'
from category ca inner join task ta on ca.id = ta.category_id 
where ca.user_id = 1
group by ca.id, ca.name 



SELECT id,user_id,category_id,name,description,create_time,update_time,run FROM task WHERE id=?

INSERT INTO task ( user_id, category_id, name, description, create_time, update_time ) VALUES ( ?, ?, ?, ?, ?, ? ) 

DELETE FROM task_label WHERE (task_id = ?) 

INSERT INTO task_label ( task_id, label_id, create_time, update_time ) VALUES ( ?, ?, ?, ? ) 



SELECT id,user_id,category_id,name,description,create_time,update_time,run FROM task WHERE id=191
INSERT INTO task ( user_id, category_id, name, description, create_time, update_time ) VALUES ( 23, 157, "react", "", NOW(), NOW() )

DELETE FROM task_label WHERE (task_id = 191) 

INSERT INTO task_label ( task_id, label_id, create_time, update_time ) VALUES (191, 2, NOW(), NOW()  ) 