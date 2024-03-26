所有HTML元素可以看作盒子，包括margin(外边距),border(边框),padding(内边距),content(内容)。

![img](https://picx.zhimg.com/80/v2-385a82d2267b1275fb7a0a8311a244c4_720w.webp?source=d16d100b)

```text
div {
    width: 300px;//内容宽度为300px
    border: 25px solid green;//边框为25px
    padding: 25px;//内边距为25px
    margin: 25px;//外边距为25px
}
```

由上可知盒子总宽度为300+25*2+25*2+25*2=450px

以上是标准盒模型的性质，box-sizing默认为content-box

![img](https://pic1.zhimg.com/80/v2-ded177a679fe80c3471c13992f107c3b_720w.webp?source=d16d100b)

IE怪异盒子

```text
div {
    width: 300px;//包含content,border,padding，可计算出实际的conten-width为200px
    border: 25px solid green;//边框为25px
    padding: 25px;//内边距为25px
    margin: 25px;//外边距为25px
    box-sizing:border-box;
}
```

由上可知盒子总宽度为300+25*2=350px

![img](https://pic1.zhimg.com/80/v2-3005ade9014188086abc90368b665b89_720w.webp?source=d16d100b)

总结：盒子分为标准盒子和IE怪异盒子，标准盒子的宽高是content的宽高，而IE怪异盒子的宽高是content+padding+border的宽高，而盒子的总宽高为content+padding+border+margin。