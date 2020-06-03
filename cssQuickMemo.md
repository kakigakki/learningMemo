# CSS过程小笔记

## 容易混淆

### display,visibility,opacity的区别

1. display: none (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
  
- 会被子元素继承，毕竟子类也不会被渲染；

1. visibility: hidden（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）

- 会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；

1. opacity: 0（占据空间，可以点击）（场景：可以跟transition搭配）

- 会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；

## 小技巧

### 文本超出省略号

1. 单行

```css
.multiline-ellipsis {
  width:100px;
  white-space :nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

1. 多行

```css
.multiline-ellipsis {
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; //需要显示的行数
  overflow: hidden;
  text-overflow: ellipsis;
}