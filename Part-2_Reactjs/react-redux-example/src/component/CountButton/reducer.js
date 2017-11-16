import { TYPES } from './action.js'

export const initialState = {
    cnt: 0
};

export default function clickReducer (state = initialState, action) {
    console.log("(3a) #clickReducer: action="+JSON.stringify(action));
    var ret = null;
    switch (action.type) {
        case TYPES.CLICKEVENT:
            state.cnt += action.cnt;
            ret = { ...state }; // duplicate a json with all fields of state
            break;
        default:
            ret = state;
            break;
    }
    console.log("(3b) #clickReducer: ret="+JSON.stringify(ret));
    return ret; // then, pass new state to method of mapStateToProps() of the component
}
