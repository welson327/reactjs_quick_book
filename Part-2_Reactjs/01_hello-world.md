#### 最簡單的一個例子

**html**:
```
<div id=“root”>
</div>
```

**js**:
```
ReactDOM.render(<h1>Hello, world!</h1>, 
    document.getElementById('root')
);
```
或
```
ReactDOM.render(<Hello />, // 使用JSX
    document.getElementById('root') 
); // 較複雜的UI，會採用此法
```

第一種方法就是把HTML畫到DOM裡；
第二種方法就是把Component畫到DOM裡。

簡單的語法看懂後，馬上的問題就是：什麼是Component?