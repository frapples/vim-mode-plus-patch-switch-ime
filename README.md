
[README_CN.md 简体中文](https://github.com/frapples/vim-mode-plus-patch-switch-ime/blob/master/README_CN.md)

## Introduction
This is a patch for vim-mode-plus.
 In insert mode, for people who are not native speakers of English, the typed characters are not typed into the buffer immediately, they trigger the input method.
When you return to normal mode, the key still triggers the input method, which results in the key corresponding to the vim command can not be applied correctly.

## How to use
After installing this plug-in, without any configuration to take effect.
 Unfortunately, the current implementation still has some small bugs.
If you have a better program, welcome to report issue.

## Thanks
Thans to:

1. https://github.com/xream/atom-vim-mode-plus-auto-ime

1. https://github.com/t9md/atom-vim-mode-plus/issues/148
