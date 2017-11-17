export const TYPES = {
    CLICKEVENT: 'CLICKEVENT'
};

export function clickAction(cntToAdd = 1) {
    var ret = {
        type: TYPES.CLICKEVENT,
        cnt: cntToAdd
    };
    console.log("(2) #clickAction: action=" + JSON.stringify(ret));
    return ret;
}

export default {
    clickAction
};
