#### 基礎知識先修班：React ES5、ES6+ 常見用法對照表
---------------------------------------------

本文推薦一些我覺得學習React.js之前，可能會需要知道的知識
不一定要先看完本文才能看React.js
而是當你在看程式時如果碰壁了，可以來這邊看看是否有需要補強的知識


比如你會常看到
```js
class MyComponent extents React.Component {
  render() {
    return <div>Hello World</div>;
  }
}
```
如果你覺得怎麼不像javascript或覺得怪怪的，那就需要來這邊充電一下唷!


因此本文希望透過整理在 React 中 ES5、ES6+ 常見用法對照表，讓讀者們可以在實現功能時（尤其在 React Native）可以更清楚兩者的差異，無痛轉移到 ES6+。
http://blog.kdchang.cc/2016/04/04/react-react-native-es5-es6-cheat-sheet/

如果以下的定義您看不懂
```js
const MyComponent = props => (
  <div className={props.className} />
); 
```
趕快看這篇
http://eddychang.me/blog/javascript/80-react-es6-class.html