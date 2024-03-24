# npm run dev 的 script 是如何执行的？

## 1. 通过 package.json 找到 scripts 对应的脚本配置

`package.json` 代码示例：

```json
json复制代码{
  "scripts": {
    "dev": "webpack-dev-server --mode development --config webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --mode production --config webpack.config.js",
    "lint": "eslint --fix --ext .js,.vue src",
    "help": "webpack -v",
    "svgo": "svgo -f src/icons/svg"
  },
}
```

首先，当执行 `npm run dev` 的时候，`node` 会去项目的 `package.json` 文件找到 `scripts` 对应的 dev 脚本配置。

## 2. 通过 node_modules/.bin 找到对应的脚本文件

找到 `dev` 脚本配置后将执行对应的命令，也就是 `webpack-dev-server` 。

为了找到这个命令对应的脚本文件，`Node` 首先会去项目中的 `node_modules/.bin` 目录寻找名为 `webpack-dev-server` 的脚本文件，如果存在则执行该脚本。

如果不存在，再去全局的 `C:\Users\Administrator\AppData\Roaming\npm` 目录寻找对应文件。

如果全局目录还是没找到，那么就从 `path` 环境变量中查找有没有其他同名的可执行程序。

如果还没找到则抛出异常。

**脚本文件的三种类型：**

```shell
webpack-dev-server       # unix 系统的脚本文件
webpack-dev-server.cmd   # windows 系统 cmd 的脚本文件
webpack-dev-server.ps1   # window 系统 PowerShell 的脚本文件
```

## 3. 执行 .bin 目录下的脚本文件

`Node` 会根据不同的操作系统和命令窗口，执行不同类型的脚本文件，下面的脚本代码是 `windows` 系统 `cmd` 窗口对应的 `webpack-dev-server.cmd` 文件的脚本代码：

```bat
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\webpack-dev-server\bin\webpack-dev-server.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\webpack-dev-server\bin\webpack-dev-server.js" %*
)
```

由上面的脚本代码可以看出，`Node` 最终执行的是对应工具包中的 `node_modules\webpack-dev-server\bin\webpack-dev-server.js` 脚本文件。

## 4. 如何建立 .bin 目录对应的软链接

首先在安装包的 `package.json` 文件中，备注 `bin` 字段，包含对应的`命令名称`和`执行文件路径`：

```json
{
  "bin": {
    "webpack-dev-server": "bin/webpack-dev-server.js" // 相对于 package.json 的相对路径
  },
}
```

然后在执行文件的第一行备注 `#!/usr/bin/env node` ，用来表明该脚本文件要使用 `node` 来执行。

其中 `/usr/bin/env` 用来告诉用户到 `path` 目录下去寻找 `node` ，`#!/usr/bin/env node` 可以让系统动态的去查找 `node`，以解决不同机器不同用户设置不一致问题。

```js
#!/usr/bin/env node

// 此处省略代码...
```

这样当我们使用 `npm` 或者 `yarn` 命令安装包时，如果该包的 `package.json` 文件中含有 `bin` 字段，就会在 `node_modules/.bin` 目录下建立对应的 `webpack-dev-server` 的脚本文件，该脚本文件复制了 `bin` 字段链接的执行文件，比如 `webpack-dev-server.cmd` 代码如下所示：

```bat
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\webpack-dev-server\bin\webpack-dev-server.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\webpack-dev-server\bin\webpack-dev-server.js" %*
)
```

通过这种 `.bin` 的软链接形式，我们就可以很方便的通过 `webpack-dev-server --mode development --config webpack.config.js` 来执行对应的命令，而不用关注该命令对应的执行文件。