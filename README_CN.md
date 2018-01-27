## 介绍
用过类vim编辑器的中文用户（如vim，spacemacs等）应该都知道，这些编辑器都存在一个输入法问题。
在插入模式下打开中文输入法输入，然后按ESC切回普通模式，这时如果按下j键k键什么的，会触发输入法，导致vim普通模式的命令无法执行。


## 使用
使用本插件 **无需任何配置** ，直接安装就能用了。不过目前的实现方式会有点小bug。如下：

1. 如果在插入模式下打开了输入法，退回到普通模式，部分命令如 ~:~ ~/~ 等会失效。（好像只有字母数字键能用。。。）

2. 解决方法是，按输入法切换键把输入法切回英文，就正常了。直接在普通模式切就行，能影响到插入模式。虽然有瑕疵，但是至少比之前什么都不能用要好很多了。。。

3. 如果你有更好的实现方式，欢迎你给我提issue。

## 原理
打开atom的开发者工具研究一番会发现：
1. 光标对应的组件那里有个class为 `hidden-input` 的 `input` 组件，这个组件是隐藏的，作用是用来捕获按键输入的。

2. 用户在buffer中的输入，实际上相当于在该input组件中输入。如果能操作该input，使在其中输入时不触发输入法，即可解决问题。

3. 遗憾的是webkit不支持firefox的css属性 `ime-mode` ，目前我只找到两种方案，把input的type改成password，和把input设为readonly，两种方案各有缺陷。目前使用的是后一种方案。


## 关于atom-vim-mode-plus-auto-ime插件
由于vim也有类似问题，vim使用fcitx.vim插件解决此问题（spacemacs也有类似插件），原理大概是在模式切换的时候通过fcitx-remote命令操作fcitx，普通模式关掉输入法进插入模式时再恢复到之前的状态。

关于这种思路，已经有插件实现了，atom-vim-mode-plus-auto-ime 插件就是。但是问题是，经过我的使用，这种通过调用外部命令操纵输入法的方案只能在linux下完美解决问题，在windows和os x下都有很大的瑕疵。

作为一个目前在跨三个平台使用atom的“特殊”用户来说，这种方案行不通，所以我开发了这个插件。

不过，如果你仅仅在Linux上使用atom，建议使用atom-vim-mode-plus-auto-ime搭配fcitx输入法，贴上我之前的配置，完美解决问题。

```json
"vim-mode-plus-auto-ime": {
    "getCurrentInputSource": "/usr/bin/fcitx-remote",
    "insert": "/bin/bash -c 'if [ $(echo ${source}) == 2 ] ; then fcitx-remote -o; fi'",
    "normal": "/usr/bin/fcitx-remote -c",
    "visual": "/usr/bin/fcitx-remote -c"
},
```

## 鸣谢
1. https://github.com/xream/atom-vim-mode-plus-auto-ime

1. https://github.com/t9md/atom-vim-mode-plus/issues/148
