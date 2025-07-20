1.对用户的输入进行合理验证，对特殊字符(如<、>、'、"、()等)、特殊的 html 标签以及<script>,javascript 等进行过滤，防止各种绕过。

2.采用 OWASP ESAPI 对数据输出 HTML 上下文中不同位置(HTML 标签、HTML 属性、Javascript 脚本、CSS、URL)进行恰当的输出编码。

3.设置 HttpOnly 属性，避免攻击者利用跨站脚本漏洞进行 Cookie 劫持攻击，让其只能在 http 请求中去获取，不能通过 javascript 获取。
cookie.setHttpOnly(true);
