## Flux 工作流程
----------------

#### 什麼是Flux？

Flux是Facebook的一個架構，隨著應用程式愈來愈複雜，主要解決：
(1) 由parent component傳props至child component的機會愈來愈多，flux可降低複雜度
(2) 容易管理state

上面看不懂沒關係! 接著看!

#### 最重要的事：Flux能做什麼？

想像一下個view的結構，有父元件與子元件
```
<ParentComponent data={dataJson}>
  <ChildComponent data={dataJson} />
</ParentComponent>
```
子元件render時，必須由父元件傳遞dataJson給子元件
這個方式在大專案時會很難維護(例如改傳遞參數的名字...等等)
**Flux的出現，就是為了解決這件事** (夠秒懂吧! 請按讚!)


#### Flux流程圖

說到flux，就一定會想到官網介面的流程圖
![](https://tipga.s3-ap-northeast-1.amazonaws.com/0/welson/l_5941fe953286fe36b31377aa.png)

但是這樣的圖要馬上理解，是有點困難的
所以本篇以一個Todo list為例來簡單說明流程

雖然是"秒入門"，但Flux並不好懂
我盡我所能讓大家只看最精華的code，但還請耐著性子看!
因為很重要! 所以講三次：
我知道developer都很急，但請稍微耐著點性子唷!
我知道developer都很急，但請稍微耐著點性子唷!
我知道developer都很急，但請稍微耐著點性子唷!

![](https://tipga.s3-ap-northeast-1.amazonaws.com/0/welson/l_59410b2d3286fe36b3108b69.png)

Todo list的行為是：按下[送出]後，在list處新增一筆項目
共有2個component，分別為 < TodoHeader /\> 和 < TodoList />

##### 有經驗者一定會馬上想到：
(1) < TodoHeader />裡一定有onClick函數
(2) < TodoList />裡應該有draw list的函數
但這是傳統的設計方式。

##### Flux流程並不是這樣，它的設計哲學是：
(1) button click後去改變資料(Flux稱為store)
(2) < TodoList />的畫面去監控store，若有變化則重新render()
有了這樣的哲學，我們看code入門就會快上許多!

下面看code時，請記住Flux的流程：
```
button click --> 改變store <-- TodoList監控store
```