## connect(), mapDispatchToProps 詳解

### 前情提要

`connect()`是react-redux的重要函數  
但一般入門者在使用這個方法時，雖然程式能運作，但總有些似懂非懂的  
本文就來一一破解你可能會遇到的問題  

### 參數：mapDispatchToProps(dispatch)

目的：讓action和store結合，做到可以`store.dispatch(action)`的效果  
  
`connect()`的第2個參數，照字面意思就是 map dispatch to props  
代表在component內可以直接以 `this.props.xxx` 使用。可以是Object或Function。  

Eg: 
```js
function mapDispatchToProps(dispatch) {
    return { myActions: bindActionCreators(myClickAction, dispatch) };
}
```

中文官網：
如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 `bindActionCreators()`）
  
第一次看應該會覺得有看沒有懂!  
複習一下，redux的資料流，就是`event -> store.dispatch(action)`  
所以我們的目的是dispatch一個action  
經過`mapDispatchToProps`這個參數，就能把回傳的東西合併到component的props中  
如此一來就可以使用`this.props.myActions.myClickAction()`  

### 如何辦到？
  
知道它幹麻用以後，再解析一下source code，看看如何辦到!  
  
`bindActionCreator()`的source code：  
https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js  

當中提到
```
Turns an object whose values are action creators, into an object with the same keys, but with every function wrapped into a `dispatch` call so they may be invoked directly. This is just a convenience method, as you can call `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
```
  
關鍵程式碼如下:  
```js
const keys = Object.keys(actionCreators)  
const boundActionCreators = {}
for (let i = 0; i < keys.length; i++) {
  const key = keys[i]
  const actionCreator = actionCreators[key]
  if (typeof actionCreator === 'function') {
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
  }
}
return boundActionCreators
```

代表，把actionCreators內的所有json key(如果是function)都`bindActionCreator()`一次。最後回傳已經bind過的產物。  
```
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}
```
它回傳一個function。當執行這個function時，就會`dispatch(action)`  
通常`actionCreator()`只會回傳一個action的json(例如: { type: "type1", payload: {...} })  
透過`bindActionCreator()`後，在執行時就能自動dispatch這個action  


### 小結

由上面的解析，可知
* 經由`connect()`的第二個參數, mapDispatchToProps, 可以將回傳值合併到props裡，如此就可以使用 `this.props.myActions`
* 經由`mapDispatchToProps()`的回傳值，就可以調用 `this.props.myActions.myClickAction(...args)`，以達到dispatch一個action的目的。