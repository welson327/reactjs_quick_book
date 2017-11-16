import { createStore, combineReducers, applyMiddleware } from 'redux';
// import delayMiddleware from 'middleware/DelayMiddleware';
import clickReducer from 'component/CountButton/reducer';

// return a store enhancer
// let createStoreWithMiddleware = applyMiddleware(delayMiddleware)(createStore);

// combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
let reducers = combineReducers({
    clickInfo: clickReducer
});

// middleware version
// export default createStoreWithMiddleware(reducers);

// basic version
export default createStore(reducers);
