## React-Redux
--------------

### 預備知識

1.
首先說明redux和react-redux是兩個不同的東西  
redux是一個通用的資料流方法，只是reactjs也剛好用這個概念  
  
2.
為了本文能更順暢，稍稍複習redux的運作流程
```
event
-> store.dispatch(action) 發出action
-> reducer function 內處理action 
-> store.subscribe() 處理UI
```
上面的翻譯就是：  
一個事件來臨時，利用`store.dispatch()`送出action  
action會送到reducer function內處理，最後在`store.subscribe()`的call back處理UI。  
所以目標是：找出實作`store.dispatch(action)`, `store.subscribe()`的地方  
  
如果你不清楚redux的概念，請先秒懂以下文章  
https://github.com/welson327/reactjs_quick_book/blob/master/Part-2_Reactjs/redux_intro.md
https://www.tipga.com/e/5968922a3286fe6f7957dc2e
 
本文主要介紹 react-redux  
這個東西很難理解，要弄懂整個流程，幾乎要看source code才有辦法  
但這不是本文的重點，本文的重點是讓你知道react-redux的流程怎麼跑  
秒懂以後再去進階，比較有成就感啦!  
  
  
### 範例說明

我們提供三個按鈕，讓計數器可以「加1」、「加10」、「2秒後加5」  
本文只討論「加1」這個功能  
![](https://tipga.s3-ap-northeast-1.amazonaws.com/0/welson/l_599fed033286fe4bd7970942.png)

### 程式進入點

**main.js**
```js
import store from 'store/index';

let app = (
    <Provider store={store}>
        <CountButton />
    </Provider>
);
ReactDom.render(app, document.getElementById('app'))
```
**重點**：  
react-redux有兩個重要的東西：`<Provider />`, `connect()`。  
如果想要使用react-redux，就必須用Provider把你的ancestor component包起來  
並且給定一個store當做redux的"唯一"store，則react-redux才能運作  
  
**觀念複習**：
* redux只能有一個store
* 要改變store的內容，必須由store.dispatch()發出action至reducer


### Store

**store/index.js**
```js
import { createStore, combineReducers } from 'redux';
import clickReducer from 'component/CountButton/reducer';

// combineReducers 的作用是，把多個 reducer 函数合并成一個
let reducers = combineReducers({
    clickInfo: clickReducer
});

export default createStore(reducers);
```

**重點**：  
1.  
我們利用`createStore()`這個API建立store  
因為一個app可能有多個reducer，可用`combineReducers()`合併所有的reducer  
直覺上參數應該傳入 reducer function array( 例：[reducer1, reducer2, ...]) 才對，但傳入的卻是一個object  
其實這技巧有點類似js的namespace寫法  
例：
```js
obj = {
  func1: function(x) { ... },
  func2: function(x) { ... }
}
```
可以寫成
```js
func1 = function(x) { ... }
func2 = function(x) { ... }
obj = { 
  func1: func1, 
  func2: func2
}
```
或
```js
obj = { func1, func2 } (如果你的json field name不改的話)
```
2.  
這邊我們只有一個reducer，如果第2個(例如是顯示目前時間)，那可能如下  
```js
let reducers = combineReducers({
  clickInfo: clickReducer,
  timeInfo: getTimeReducer
})
```
你可能覺得naming很怪，但這都是為了之後好讀，所以這邊先這樣記著：  
「**reducer最後return一個新的state, 這個state的名字我們就以xxxInfo來表示**」
  
  
### Component

**CountButton/index.js**
```js
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clickAction from './action.js';

export class CountButton extends React.Component{
  onClickCountButton(count, delay){
    // this.props.actions 可以直接使用，是因connect()的關係
    this.props.actions.clickAction(count, delay);
  }
  render(){
    return (
      <div>
        <h1>{this.props.clickInfo.cnt}</h1>
        <button onClick={this.onClickCountButton.bind(this, 1, 0)}>Add by 1</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {clickInfo: state.clickInfo};
}

function mapActionToProps(dispatch) {
  // bind action to call store.dispatch(action)
  return { actions: bindActionCreators(clickAction, dispatch) };
}

// connect component to store of <Provider store={store}/>
export default connect(mapStateToProps, mapActionToProps)(CountButton);
```

**重點**：  
1.  
react-redux最重要的API就是`connect()`，用來「連接 React Component和 Redux store」的。  
2.  
`connect()`總共四個參數，前2個較重要，後2個是optional。  
第1個參數，mapStateToProps，照字面的意思就是「map state to props」  
就是把state的東西合併到component props裡  
並且，在store有變化時，都會呼叫此函數一次  
第2個參數，mapDispatchToProps，照字面的意思就是「map dispatch to props」  
就是把dispatch的東西合併到component props裡  
=> 只要記得! 經過`connect()`後，這兩個function的回傳值，會合併到component的props裡，可以直接使用。  
3.  
既然redux的流程是`「event -> store.dispatch(action) -> reducer」`  
到底哪邊有 `store.dispatch(action)` 呢？  
原來細節藏在`connect()`的第二個參數，mapDispatchToProps，裡  
結論是，以本例來說，  
只要回傳 `{ actions: bindActionCreators(clickAction, dispatch) }` 就可以幫我們`store.dispatch(action)`
如果你想看一下怎麼回事，請參考：https://www.tipga.com/e/59a3c6373286fe4bd79b3b9b  
4.  
當事件被觸發後，因為已經由`connect()`把所有東西都合併到props裡  
原使用`store.dispatch(action)`，現在只要`this.props.actions.clickAction`即可  
react-redux會幫我們傳送action到reducer  
5.  
官方資料：  
`connect()`：http://cn.redux.js.org/docs/react-redux/api.html  
`bindActionCreator()`：http://cn.redux.js.org/docs/api/bindActionCreators.html  

PS:  
最重要的部份已被提起，至於為什麼能做到這樣，還需要再看source code才能更明白!  
  
  
### Reducer

**CountButton/reducer.js**
```js
export const initialState = {
    cnt: 0
};
export default function clickReducer (state = initialState, action) {
    var ret = null;
    switch (action.type) {
        case TYPES.CLICKEVENT:
            state.cnt += action.cnt;
            ret = { ...state }; // means: duplicate a json with all fields of state
            break;
        default:
            ret = state;
            break;
    }
    return ret;
}
```

**重點**：  
1.  
進到reducer後，進行state的處理，最後根據redux回傳一個新的state  
可以看到，在cnt+1以後，我們採用ES6的「...」語法回傳一個新的state  
你可以簡單的視為是clone的操作  
```js
a = { k1:"v1", k2:"v2" }
b = { ...a }
```
則b和a有相同的內容，b不會因為a改變而跟著變


### Render

最後回到connect的第一個參數`mapStateToProps()`
```js
function mapStateToProps(state) {
    return {clickInfo: state.clickInfo};
}
```

在reducer處理完後，新的state會傳進`mapStateToProps()`裡  
回傳新的object會合併到component的props裡  
最後呼叫Component.render  


### 小結

上面就是整個react-redux的流程  
本文只是協助你了解整個流程，協助大家更快的進入狀況，並不是去看source code  
後面進階的章節會慢慢拆解react-redux到底怎麼做的  


### 參考資料
* [這篇關於connect()寫的較好理解，可先看看](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)

* [關於connect()這個redux API](https://noootown.gitbooks.io/deeperience-react-native-boilerplate/content/Redux/MapStateToProps%20&%20MapDispatchToProps%20&%20Connect.html)
