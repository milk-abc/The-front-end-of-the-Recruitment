git 工作流
git clone
git checkout -b
git fetch
git add . git commit git push

git checkout master
git merge
git push

对上次刚提交的进行修改覆盖
add commit 后发现提交的代码有问题， add commit -amend 修改覆盖

------------------------------------------------------------------------------------------------------------

1.第一次使用git

1)设置git的[user.name](http://link.zhihu.com/?target=http%3A//user.name/)和user.email

git config –global [user.name](http://link.zhihu.com/?target=http%3A//user.name/) ‘用户名’

git config –global user.email ‘邮箱’

2)生成密钥

ssh-keygen -t rsa –C ‘邮箱’

连续三个回车，C:\Users\Administrator\.ssh目录下得到id_rsa和id_rsa.pub

3)登录github，将id_rsa.pub文件中的内容复制到SSH keys

2.开发流程

git init demo：初始化空的git版本库于demo/.git/

cd demo

git clone ssh地址 –b 分支名：一定要问清楚分支名和tag

查看分支：git branch

在代码仓库上手动新建自己的分支

本地拉取分支：git fetch

切换到主分支：git checkout <name>

拉代码：git pull

切换到自己分支:git checkout <name>

合并主分支代码到自己分支:git merge <name>

开发。。。

查看代码修改状态:git status

查看代码修改前后区别:git diff

确认提交。。。

将代码加入暂存区：git add .

将暂存区内容添加到本地仓库中,feat代表自己开发,fix代表修改bug：git commit –m ‘feat/fix:说明’

将修改推到远程仓库的自己分支上:git push

切换到主分支并拉下代码，再切回自己分支并merge下主分支代码，merge过程可能会产生冲突，

若产生冲突，则对照报错指示进行修改解决冲突，再git add 冲突文件，git commit –m ‘说明’，git push

最后切换到主分支再拉下代码，并merge下自己分支代码，再git push

2.Git理论知识

工作目录：指的是我们拉下来的vscode里面的代码

工作目录有两个状态：已跟踪或未跟踪，可以用git status来查看状态

当你新增或删除了工作目录中一个文件的时候，此文件属于未跟踪

要跟踪新增文件:git add 文件

要从git移除某个文件:git rm 文件

要删除之前修改过或已经放到暂存区的文件：git rm –f 文件

初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。编辑后编辑为已修改文件，在工作时，可以选择性的将这些修改后的文件放入暂存区，然后提交所有已暂存的修改，在工作区它们又变成了未修改状态。

![img](https://pic1.zhimg.com/80/v2-6252ed352740c3914c844695941d336a_720w.webp?source=d16d100b)

查看提交历史：git log

想切到某个历史查看当时的代码:git checkout commitId

3.撤销操作：

撤销操作很危险也很常用，是必须要掌握的

1.如果commit后发现漏了几个文件没有add

git commit –m ‘说明’

git add forget_file

使用commit –amend重新提交

git commit –amend

2.当你改乱了代码，想直接丢弃修改时

git checkout – 文件名

也可以用vscode点击放弃更改

3.当你修改了代码，已经add到暂存区但没有进行commit操作的时候想撤销

git reset HEAD 文件名

也可以直接用vscode点击移出暂存区

4.当你修改了代码并提交到了仓库，用git log查看历史记录中的版本号commit_id

用git reset --hard commit_id 回退

hard参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交，因此使用这个命令需要将自己修改的文件移出来保存

5.当你回退到历史版本后想回到之前的版本

用git reflog查看命令历史

用git reset --hard commit_id 回退

HEAD指向当前分支

初始：

![img](https://picx.zhimg.com/80/v2-61caa09dc9cce2750d4c6c1d8f5b53ec_720w.webp?source=d16d100b)



在master上新建分支：git branch testing

![img](https://pica.zhimg.com/80/v2-4b326bd0cccfcca36ae907586683e82d_720w.webp?source=d16d100b)



Git通过HEAD指针知道当前所在的本地分支

![img](https://picx.zhimg.com/80/v2-973d3d09c086f185927155dfebabfdd3_720w.webp?source=d16d100b)

分支切换：git checkout testing

![img](https://pic1.zhimg.com/80/v2-62959752719a323495ba14de8e6f26c2_720w.webp?source=d16d100b)

修改代码并提交：git commit -a -m 'made a change‘

![img](https://picx.zhimg.com/80/v2-d6a0344a2a0878bb2d85366dce5f7ce5_720w.webp?source=d16d100b)

testing 分支向前移动了，但是 master 分支却没有，它仍然指向运行 git checkout 时所指的对象。

切回master分支：git checkout master

![img](https://picx.zhimg.com/80/v2-fa96ce05ca43446faac73aa8ade03297_720w.webp?source=d16d100b)

这个命令一是使 HEAD 指回 master 分支，二是将工作目录也就是vscode里代码恢复成 master 分支所指向的快照内容。

在master分支上修改并提交:git commit -a -m 'made other changes‘

![img](https://picx.zhimg.com/80/v2-7992d978bc000516a5c6c9f34580c4e6_720w.webp?source=d16d100b)
