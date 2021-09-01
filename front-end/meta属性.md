meta 是描述 HTML 文档的元数据
有两个名称：name,http-equiv 和 content 属性成对出现，content 属性是对 name 属性内容的具体描述
name 属性
name 属性用来描述网页，成对的 content 属性是对 name 属性内容的具体描述
1.keywords
定义文档关键词，用于搜索引擎

<meta name="keywords" content="前端">
2.description
定义web页面描述
<meta name="descriptiotn" content="理科生，热爱前端，目前研二">
3.viewport
用于设计移动端网页
<meta name="viewport" content="width=device-width,initial-scale=1">
4.charset
定义文档的字符编码。
<meta charset="utf-8">
http-equiv属性
把 content 属性关联到 HTTP 头部
1.content-Type
2.X-UA-Compatible(浏览器采取何种版本渲染当前页面)
用于告知浏览器以何种版本来渲染页面
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
指定IE和chrome使用最新版本渲染当前页面
3.cache-control
指定浏览器如何缓存某个响应以及缓存多长时间
<meta http-equiv="cache-control" content="no-cache">
no-cache:先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存
no-store:不允许缓存，每次都要去服务器上下载完整的响应
public:缓存所有响应，可以被所有用户缓存(多用户共享)，包括终端和CDN等中间代理器
private:缓存所有响应，只能被终端浏览器缓存，不允许中继缓存服务器进行缓存
4.expires
指定网页的到期时间，过期后网页必须到服务器上重新请求
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
5.Set-Cookie:设置cookie
如果网页到期，那么这个网页存在本地的cookies会被自动删除
<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=Sunday, 10-Jan-16 10:00:00 GMT"> //具体范例
