res.writeHead()必须在 res.end()之前调用
如果两者同时存在（没必要），要先写 res.setHeader()，后写 res.writeHead()，且 res.writeHead()优先

res.setHeader('Content-type', 'text/plain;charset=utf-8')
res.writeHead(200, { 'Content-type', 'text/plain;charset=utf-8' }); ---text/plain 就是普通文本，纯文本
res.end('hello 世界');
