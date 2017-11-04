## Redux簡介
-----------------------------

### 什麼是Redux？為什麼要Redux?

英文原話：Predictable state container for JavaScript  
翻成中文就是「可預測 state 容器」。這鬼才看的懂吧？(我們先跳過)  
  
隨著對 single page application(SPA)的要求變得越來愈複雜  
想像一下facebook的頁面有按讚，有留言數，…等等  
這些資料(稱為 state，存於store中)  可能包括伺服器回應及快取的資料，或以及本地端建立而尚未保存到伺服器的資料。為了有效的管理 state，Redux因此誕生。  
  
為了讓大家秒懂! 我決定先讓知道Redux是怎麼運作的，然後看一個Redux和jQuery怎麼配合的  
最後再慢慢補充Redux的概念!  
  
  
### Redux怎麼運作的
  
我什麼圖也不畫，就用文字解釋，講的愈白話你愈能秒懂！  
  
1. 
首先用Redux.createStore()建立一個存放所有資料的變數
```js
const store = Redux.createStore(function(state, action) { 
  // 處理資料後，必須回傳一個新的state
  return state; // state可以是任何型式
});
```
  
2. 
在一個事件觸發時，呼叫`store.dispatch(action)`，以發出一個action  
其中`action = { type: "your_evt_name", payload: xxx }`，type一定要有! 其他隨你!  
  
3. 
發出action後，Redux會傳遞至步驟1建立store時的function  
Redux稱這個function叫Reducer Function.  
Reducer Function必須回傳一個新的state值  
  
4. 最後如果你有subscribe store，則可以在此更新UI
```js
store.subscribe(() => {
  $('#num').html(store.getState());
});
```
  
簡單總結就是：
```
click -> store.dispatch(action) -> reducer function -> 由 store.subscribe() 更新UI
```
  
就這麼簡單而已!  
  
了解redux的工作流程後，接下來就要慢慢補充一下redux的觀念及名詞  
(1) 三大原則  
(2) action, reducer function, store  
  
  
### 三大原則
  
1. 所有的資料都以state描述，存於redux的store裡；  
  
2. state是唯讀的；  
  
3. 由reducer function接收action後，回傳新的state。  
  
  
### Action
  
JSON結構，必須有一個 type及任何樣式的payload  
例:  
{ type: “add", text: “xxx" }  
{ type: “add", index: 5 }  
…  
由 `store.dispatch(action)` 發出  
  
  
### Reducer Function
請參考 https://www.tipga.com/e/5966d3e83286fe34e10611f9  
  
  
### Store
  
前面我們定義了「發生了什麼」的 action，和處理 action 的reducer。 
Store 是把它們結合在一起的物件，負責處理資料。  
  
由 `getState()` 取得 state；  
由 `dispatch(action)` 觸發去更新 state；  
由 `subscribe(listener)` 註冊 listener更新UI;  
  
**重要觀念! Redux 中只會有一個 store儲存所有資料(一般資料，UI狀態，…)。**  
  
  
### 完整範例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redux with jQuery</title>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.5.2/redux.js"></script>
</head>

<body>

<div>
  Count = <span id="num">#</span>
  <button type="button" id="inc">+</button>
  <button type="button" id="dec">-</button>
</div>

<script>
  // Reducer
  const counter = (state = 0, actions) => {
    switch (actions.type) {
      case 'INCREMENT': return state + 1;
      case 'DECREMENT': return state - 1;
      default: return state
    }
  }

  // Store to hold state of the app
  const store = Redux.createStore(counter);

  // The only way to mutate the internal state is to dispatch an action.
  $('#inc').click(() => store.dispatch({type: 'INCREMENT'}));
  $('#dec').click(() => store.dispatch({type: 'DECREMENT'}));

  // Use subscribe() to update the UI in response to state changes.
  store.subscribe(() => {
    $('#num').html(store.getState())
  });
</script>
</body>
</html>
```
另存成index.html後，就可以直接在Browser執行了!([Source](https://github.com/welson327/reactjs_quick_book/blob/master/Part-2_Reactjs/eg.redux_intro.html))


最後，如果你想懂更多，可以參考[繁中版的官網](https://chentsulin.github.io/redux/index.html)! 你會更快上手!

**PS: #redux和reactjs沒關係**