### 分布式的版本控制系统
1.  每个客户端本地都储存了项目的所有历史版本（git人员对其进行极致的压缩）
2.  Git中有区域和对象的概念
    - 区域：
        - 工作区
        - 暂存区
        - 版本库
    - 对象
        - Git对象：所有的文件的每个版本的内容都是以哈希值名的压缩文件保存在.git文件夹下的objects文件夹里。Git对象代表文件的一次次版本
            - `Git hash-obejct -w fileUrl` ：生成一个键值对存到 .git/objects
        - 树对象：代表项目的一次次版本 
            - ` Git update-index - -add - -cacheinfo 100644 hash text.txt` ：往暂存区添加一条记录，（让git对象对应文件名）
        - 提交对象： 我们需要知道的对象，能看到有谁提交了版本，每一个代表项目的一次版本
            - `Echo “first commit” | git commit-tree treehash` :生成一个提交对象存到.git/objects
    - 对以上对象的查询
        - ` Git cat-file -p hash` : 拿到对应对象的内容
        - `Git cat-file -t hash` ：拿到对应对象的类型

### Git初始化配置
1.	初始化配置git，用来说明你是谁。
    ```
    Git config --global user.name “xxxx”
    Git config --global user.email xxxxx
    ```
     - 除--global 还--system（对该电脑所有用户都适用），还有啥都不写（只对当前项目有用）
2.  Git config –list 查看当前的配置
3.  删除初始化的全局配置
    ``` 
    Git config - -global - -unset user.name
    Git config - -global - -unset user.email
    ```
### GIT的底层命令
1.	 `Git init` 初始化仓库
2.	.git隐藏文件夹中的文件夹分别为
	![20200430005432](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200430005432.png) 
3.	`clear` 清屏
4.	`echo ‘xxxx’` 往控制台输出信息
    - `echo ‘xxx’ > test.txt`  创建test文件，且输入xxx
5.	`ll` 遍历当前文件夹
6.	`find` 目录名 ：打印对应目录下的子孙文件和目录
7.	`find` 目录名 -type f  打印对应目录下的子孙文件
8.	`Rm` 文件 
9.	`Mv` 文件 剪切（重命名）
10.	`Cat` 文件，查看文件的内容
11.	`Vim` 文件
    - 按i进入编辑模式
    - 按esc退出i模式后， :wq后保存退出
12.	`Git cat-file -p hash` : 拿到对应对象的内容
13.	`Git cat-file -t hash` ：拿到对应对象的类型
14.	`Git ls-files -s` 查看暂存区的内容

### Git的高层命令
1.	`Git add ./`  将修改添加到暂存区（其实是提到版本库，再拉回暂存区）
    - `Git hash-object -w 文件名`（修改了多少个工作目录中的文件，这个命令就被执行多少次）
    - `Git update-index …`
2.	`Git commit -m “xxxx”`   将暂存区提交到版本库
    - `Git write-tree`
    - `Git commit-tree`
3.	`Git init` 初始化新仓库
4.	`Git status` 检查当前文件的状态
    - Git中的文件有两种状态
        - 已跟踪 （被git add过的文件）
            - 已修改 `modified`
            - 已暂存 `staged`
            - 已提交 `commited`
        - 未跟踪  （未被git add过的文件）
5.	`Git diff` 查看哪些还没有暂存
6.	`Git diff –staged` 查看哪些修改已经被暂存了，还没提交的
7.	`Git commit -m "xxx"` 提交+注释
8.	`Git commit -a` 跳过暂存区直接提交
9.	`Git commit -a -m "xxx"` 跳过暂存区直接提交
10.	`Git mv xxxx xxxx` ：此步骤相当于下面三步
    - `Mv`
    - `Rm`
    - `Git add`
11.	`Git rm xxx` ： 此步骤相当于下面两步
    - `Rm`  
    - `Git add`
12.	`Git log` 查看提交记录
    - `Git log  - - oneline`  可以简略显示。显示的hash值是提交对象
    - `Git log --oneline --decorate  --graph  --all` 查看所有的分支的历史记录
    - 太长的命令可以用配别名
        - `Git config --global alias.xxx "Git log --oneline --decorate  --graph  --all"`
13.	`Git reflog` 查看完整操作记录
    - 查看所有分支的记录，我在本地上配置了alllog
### Git分支操作
15.	分支的本质就是一个提交对象
16.	HEAD : 是一个指针，它默认指向master分支，切换分支时就是让HEAD指向不同的分支，每次有新的提交时，HEAD就会带着当前的分支往前移动（HEAD移动，分支不会移动）。
17.	`git/refs`目录中保存了所有的分支，及其对应的提交对象的hash值（每次提交对象被新提交时，hash值都会改变）
18.	切换分支会改变workspace中的文件。
    - 每次切换分支前，当前分支一定得是干净的（已提交状态）
    - 因为在切换分支时，当前分支有未暂存的新创建的modified的文件 或者有未提交的的新创建的staged的文件的时候，会把此文件一次带到切换的分支上，会污染切换的分支
19.	操作命令
    - `Git branch xxx` ：在当前提交对象上创建一个新的分支
    - `Git branch xxx Hash值` ：在指定的提交对象上创建新的分支（时光机）
    - `Git branch` ：查看分支列表
    - `Git checkout branch` 切换分支
    - `Git checkout -b xxx ` 创建新的分支，并切换至此分支
    - `Git branch -d xxx` :删除一个合并了的分支
    - `Git branch -D xxx`：强制删除一个分支（不管合并了否）
    - `Git branch -v` 可以查看所有分支的最后一次提交

### Git存储
20.	当你大工作做一半，但是有其他小工作要做，又不想提交当前分支的话，可以用存储
21.	常用命令
    - `Git stash` 将未完成的modified保存到一个栈上
    - `Git stash list`   查看栈上有哪些修改
    - `Git stash apply` 将保存到栈上的第一个modified重新取出
    - `Git stash apply stash@{x}` 指定取出哪个modified
    - `Git statsh drop` 删除第一个
    - `Git statsh pop` 取出修改，删除栈上的第一个

### Git撤销和重置（主要用下面三个命令）
22.	`git checkout - - filename :`  撤回自己在工作区的修改
23.  `git reset filename`  撤回自己在暂存区的修改
    - 相当于reset第二步曲的缩写
24.	`git commit --amend` 再次提交暂存区内已修改的文件(类似撤回自己在版本库的提交，再提交一次)

### reset
25.	三步曲
    - 第一步：git reset - -soft HEAD~  
        - 一步：
            - 动HEAD，带着当前branch一起往前一版本后退（撤销）
        - (类似`git commit --amend`，不过`--amend`撤回然后提交了）
        `Git reset --soft 提交对象的hash值` ：HEAD带着branch去指定的提交对象上
    - 第二步：`git reset [- -mixed] HEAD~`
        - 两步：
            - 动HEAD ,带着当前branch一起撤退
            - 动了暂存区。
        - `git reset --mixed` 提交对象的hash值 ：HEAD带着branch去指定的提交对象上
        - 可缩写成：`git reset`
    - 第三步：`git reset --hard HEAD~`（reset命令唯一的危险用法）
        - 三步：
            - 动HEAD ,带着当前branch一起撤退
            - 动了暂存区
            - 动了工作区（会将工作区的内容覆盖）
        - 一般撤销工作区用：`Git checkout --filename`
        - 跳过第一步，第二步，
        - 只做第三步：动了工作区
### 标签
15.	标签跟分支很像，只是分支能动，标签不能动
16.	常用命令
    - `Git tag`  查看当前标签名
    - `Git tag <标签名>` [可选：提交对象的hash值] 新建标签
    - `Git show <标签名>` :查看标签
    - `Git tag -d <标签名>` ：删除标签
    - `Git checkout <标签名>` ：切换到tag 
    - 如果当前标签没有分支时，会产生头部分离。需要在当前标签上创建分支
    - `git checkout -b <分支名>`

### 远程仓库
1.	`git remote add <别名>  url` ： 让本地仓库跟远程仓库连起来
2.	`git remote -v` ：查看远程仓库
3.	`git remote show 别名` ：查看远程仓库的更多信息
4.	`git remote rename 旧别名 新别名` ：重命名远程仓库
5.	`git remote rm 别名` ：删除远程仓库
6.	`git push 远程仓库别名 分支名`
7.	`git clone 远程仓url` ：将远程仓库拉到本地
a)	`git clone`下来的远程仓库的别名，自动设置成origin
8.	自己创建的仓库，可以进行push,但是如果是从别人的仓库clone下来的话，如果没有那个人的成员邀请的话，无法进行push

### 团队协作流程
1.	项目经理初始化远程仓库
    - 在github上初始化一个空的仓库
2.	项目经理创建本地仓库
    - `Git init`
    - 将源码复制进来
    - 修改用户名，修改邮箱
3.	项目经理将本地仓库跟远程仓库链接起来
    - `Git remote add 别名 url`
4.	项目经理将本地仓库推送到远程仓库
    - 清理windows凭据
    - `Git push 别名 分支` （输入github的用户名，密码，退完后会附带生成远程跟踪分支xxx/xxx）
5.	项目成员在自己本地克隆远程仓库
    - `Git clone 仓库地址`
        - 默认为远程仓库配了别名origin 
        - 附带生成远程跟踪分支xxx/xxx
6.	项目成员做出贡献
    - `Git add`
    - `Git commit`  
    - `Git push` 别名 分支（输入github的用户名，密码）
7.	项目经理更新修改
    - `Git fetch 别名`（将修改同步到远程跟踪分支上）
    - `Git merge远程跟踪分支`（将同步了的远程跟踪分支与本地分支合并）

### 深入理解远程库
#### 远程跟踪分支
1.	远程跟踪分支是远程分支状态的引用，它们是不能自己移动的，在每次网络通信操作时，自动移动
2.	如果本地分支没有跟踪任何远程跟踪分支的话，是无法进行网络通信操作的
3.	一个本地分支怎么去跟踪一个远程跟踪分支
    - 当克隆的时候，会自动生成一个master本地分支（已经跟踪了对应的远程跟踪分支）
    - 在新建其他分支的时候，可以指定想要跟踪的远程跟踪分支
        - `Git checkout -b `本地分支名 远程跟踪分支名
        - 或者 `git checkout --track` 远程跟踪分支名（创建一个跟远程分支同一个名字的本地分支和远程跟踪分支，并让本地分支跟踪远程跟踪分支）
4.	如果没有对应的远程跟踪分支的话，可以用`git fetch`去远程仓库拿
    - 将一个已经存在的本地分支名，跟踪一个远程跟踪分支
        - `Git branch -u 远程跟踪分支名`
        - 没有远程跟踪分支的话，无法进行`git push`,`git pull`操作
        - 可以用`gir branch -vv `查看当前分支所跟踪的远程跟踪分支

#### 冲突
1.	当`git pull`的时候，没有将暂存区的内容提交时，会冲突
2.	当`git push`的时候，远程仓库的内容已经被修改的时候，会冲突

#### 删除远程分支
4.	`Git push 仓库别名 --delete 远程分支`
5.	`Git remote prune 仓库别名--dry-run`   ：列出已经不存在的运程仓库上，仍在跟踪的无用分支
6.	`Git remote prune 仓库别名` : 清楚上面列出的无用分支

#### Pull request
7.	可以通过`fork`别人的项目，修别人的bug，给别人提request。（此步骤可以用github操作，不需要命令行）
8.	一般只有大神才会用到。。

### 学习过程笔记
1. `git checkout `后面也可以跟提交对象的hash值，让HEAD移动到对应提交对象
2. `git branch -f xxxx HEAD~3 ` 强制移动分支xxxx到前三个提交对象身上
3. `git branch -f xxxx 提交对象hash ` 强制移动分支xxxx到某个提交对象
4. `git checkout HEAD^[HEAD~]` 移动HEAD到上一个提交对象上
    - ~后面跟数字表示移动几个提交对象
    - ^后面跟数字表示移动第几个父提交（当前提交类型为合并提交的情况下）
    - 如 `git checkout HEAD~2^2` 表示向上移动两个提交对象，然后在二叉口，移动到第二个父提交对象
        - 正如你所见，此命令支持链式调用
5. `git reset HEAD^` 将提交对象重置回上一次提交对象
6. `git revert HEAD^` 创建一个新的提交对象，这个提交对象是上一个提交对象的复刻，此方法比较安全。
7. `git cherry-pick [hash或者分支名] [hash或者分支名]`  此命令可以在当前分支获取其它分支的正在进行的代码，可以接多个commitHash，命令中接了几个commitHash,就会获得几个提交对象。
    - `cherry-pick`还可以让master分支直接去拿多个分支，合成大分支
8. `git rebase branchName` 将当前的分支线上的若干个目标分支线上不存在的提交对象的code与目标分支的code结合，并在目标分支下面生成若干个提交对象，提交对象上的还是当前分支
    - 情景：假如自己开发的分支开发到一半，然后之前的master分支已经被提交过，这时需要提交完的master分支中自己分支里没有的代码时，就可以用这个命令，轻松获得
    - `git rebase 分支1 分支2` 在分支2下生成分支1和分支2结合的提交对象
9. `git rebase -i HEAD~4` 可以指定当前提交对象之前的若干个提交对象，
    - 这些提交对象可以排序，也可以删减。来构建自己想要rebase的提交对象顺序和个数
    - `git cherry-pick`在知道hash的情况下牛逼，相反，这个命令是在不知道hash的情况下牛逼，总之两个挺像的
10. `git rebase xxxx master` 当处在xxxx分支上，且想要与master合并时，此步骤可以代替下面两步
    - `git checkout master`
    - `git merge xxxx`
11. 一般能用hash值直接定位的地方，也能用`HEAD~`配合`HEAD^`来找该地方（相对位置找法）
12. 一般能用hash值的命令也能用分支名字

### 学习过程笔记2
1. 远程跟踪分支是无法进行手动更新的，只能保持上一次通信时的状态。
2. 如果`git checkout 远程跟踪分支`的话，会产生HEAD分离
    - 即变成了`git checkout HEAD`
3. `git fetch`
    - 与远程仓库进行通信
    - 更新远程跟踪分支
    - **注意**：`git fetch` 并不会去改变本地仓库分支的位置。就是单纯的更新远程跟踪分支。
    - 即：把远程分支上的内容给下载到了远程跟踪分支上而已。没有再进行其他的操作了。
4.  `git pull`
    - `git fetch` + `git merge`
    - `git fetch`只是下载。`git pull`是下载+合并
5.  `git pull --rebase`
    - `git fetch` + `git rebase`
6. `git merge` 与`git rebase`的优缺点
    - `git merge` 保留提交树的历史，有时候可能看起来很乱
    - `git rebase` 所有提交都在一条树上，不保留历史。看起来更简洁