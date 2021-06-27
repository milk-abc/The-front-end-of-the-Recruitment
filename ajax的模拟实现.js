//GET请求
let xhr = new XMLHttpRequest();//初始化
let name = 'll'
xhr.open('get', 'login.php?username=' + name);//规定请求的类型、URL以及是否异步处理请求
xhr.setRequestHeader('Content-Type', 'application/json');//设置请求头的参数
xhr.send();//将请求发送到服务器，里面的参数仅限于post请求
xhr.onreadystatechange = function () {//当readyState发生变化时会调用此函数
    if (xhr.status == 200 && xhr.readyState == 4) {//状态码为200，请求已完成，且响应已就绪
        console.log(xhr.reponseText);
    }
}
//POST请求
let xhr2 = new XMLHttpRequest();
xhr2.open('post', 'login.php');
xhr2.send('name=' + name);
xhr2.onreadysatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        console.log(xhr.reponseText)
    }
}
