上節我們大致說明什麼是Component，並使用props技巧將資料傳給Component
這節我們將以一個較完整的例子來說明props / state

#### 以商品為例

我們想要畫出一個「商品」，總共四個欄位，由上至下依序是
「預覽圖:previewImg」
「名稱:title」
「描述:desc」
「瀏覽數:browsingCnt」
為了讓例子說明Component內有一個子Component
browsingCnt是在一個ProductFooter裡的
![](https://tipga.s3-ap-northeast-1.amazonaws.com/0/welson/l_593972503286fe086837e513.png)

商品資料如下:
```
var productInfo = {
  previewImg: "http://...",
  title: "畢卡索畫",
  desc: "1950年代的",
  browsingCnt: 29457294
};
```
畫Product這個Component，並傳入product=productInfo
```
ReactDOM.render( <Product product={productInfo} />, // 畫出Component
  document.getElementById(‘product') 
);
```
定義<Product />, <ProductFooter />
```
class Product extends React.Component {
  render() {
    return (
    <div className=“product”> // html的class必須用className
      <img src={this.props.product.previewImg} />
      <div className=“title”>{this.props.product.title}</div>
      <div className=“desc”>{this.props.product.desc}</div>
      <ProductFooter product={this.props.product} /> // 畫出Child component
    </div>
    );
  }
}

class ProductFooter extends React.Component {
  render() { return (
    <div className=“footer”>
      瀏覽數：<span className=“browsingCnt”>{this.props.product.browsingCnt}</span>
    </div>
  )}
}
```
如此以來就完成了商品的Component

再進階一點

#### 如果click一下商品，就把瀏覽數加1，那該怎麼做呢？

這時會使用到React的state觀念
props可以想成是Component的初始值
state可以想成是Component資料變化後的值

```
class Product extends React.Component {
  constructor(props) { // 定義constructor, 必須寫
    super(props);
    // 只要有定義FUNCTION就要BIND一個
    this.onClickProduct = this.onClickProduct.bind(this);
    // 定義state
    this.state = { product: props.product };
  }
  onClickProduct() {
    console.log(“click product”);
    this.state.product.browsingCnt += 1;
    this.setState({this.state}); // 只要呼setState()一次，component就會呼render一次
  }
  render() {
    return (
    <div className=“product” onClick={this.onClickProduct}> // 定義onClick
      <img src={this.props.product.previewImg} />
      <div className=“title”>{this.props.product.title}</div>
      <div className=“desc”>{this.props.product.desc}</div>
      <ProductFooter product={this.props.product} />
    </div>
    );
  }
}
```
**要點如下**:
1. 在html上指定onClick
2. onClick時，把變化後的結果存回state
3. 重新呼叫setState()讓結果重新render()
 
這樣是不是props和state的觀念都懂了呢？^^