// http://cn.redux.js.org/docs/advanced/Middleware.html
const delayMiddleware = store => next => action => {
    if (action.delay) {
        return setTimeout(() => {
            next(action); // next = store.dispatch(action)
        }, action.delay * 1000);
    } else {
        next(action);
    }
}
export default delayMiddleware;
