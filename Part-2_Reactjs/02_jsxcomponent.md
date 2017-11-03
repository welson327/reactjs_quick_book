#### 直接看範例

```js
// JS檔(或JSX檔)裡，必須先匯入相關的module
import React from ‘react’;
import ReactDOM from ‘react-dom’;

class Hello extends React.Component {
  // 每個component都必須實作render()方法
  render() { 
    return (
      <h1>Hello! World!<h1>
    );
  }
}
```
Component是React最基本的class
自訂時，必須繼承React.Component，並實作`render()`方法
每當要繪Component時，就會執行`render()`


###### 但畫view時，總會需要輸入不同的資料，怎麼傳入呢？


#### Component + 傳入資料

假設有一個json資料
```js
var userInfo = { name: "welson", email: "welson@mail.com" };
```
在畫component時，直接以XML指定attr的方式傳入資料。React稱之為props (properties)
```js
ReactDOM.render( <Hello username={ userInfo.name } />, 
  document.getElementById('root') 
);
```
在JSX內使用`{}`取出變數
```js
class Hello extends React.Component {
  render() {
    <h1>Hello {this.props.username}!<h1> 
  }
}
```
如此一來，每次畫一個view你就可以傳入相對應的資料
並在render()裡，使用`this.props.attrName`得到資料