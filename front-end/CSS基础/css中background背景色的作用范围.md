一般元素的background-color覆盖该元素的content+padding+border。而margin不会显示该背景颜色，而是由外层元素的背景色决定。但body有所不同。

```
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      .tabs {
        position: relative;
        width: 400px;
        height: 300px;
        background-color: green;
        padding: 15px;
        border: 10px dashed rgba(255, 0, 0, 0.5);
      }
    </style>
  </head>
  <body>
    <div class="tabs"></div>
  </body>
</html>
```

![image-20240326193608017](C:\Users\liqian\AppData\Roaming\Typora\typora-user-images\image-20240326193608017.png)

结论如下：

（1）一般div元素的background-color只覆盖到border，而其margin的颜色由外层元素的背景色决定。

（2）body元素的background-color覆盖了除子元素之外的部分，包括其自身的margin。

（3）但当html设置background-color，body的background-color就只覆盖到border，与一般div元素相同。而html的背景色覆盖了body的border以外的部分。

https://blog.csdn.net/liyaoyao288/article/details/60132560