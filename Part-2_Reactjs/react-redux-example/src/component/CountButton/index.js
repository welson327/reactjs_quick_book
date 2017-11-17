import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clickAction from './action.js';

export class CountButton extends React.Component{
    onClickCountButton(count, delay){
        console.log("(1) CountButton#onClickCountButton: this.props:", this.props);

        // this.props.actions 可以直接使用，是因為有connect()
        var action2dispatch = this.props.actions.clickAction(count, delay); // dispatch a action to reducer
    }
    render(){
        console.log("CountButton#render: props=", this.props);
        return (
            <div>
                <h1>{this.props.clickInfo.cnt}</h1>
                <button onClick={this.onClickCountButton.bind(this, 1)}>Add by 1</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    var ret = {clickInfo: state.clickInfo};
    console.log("#mapStateToProps: state=" + JSON.stringify(state) + ", ret=" + JSON.stringify(ret));
    return ret; // return state for component to re-render()
}

function mapDispatchToProps(dispatch) {
    console.log("#mapDispatchToProps: clickAction=");console.log(clickAction);

    // bind action to call store.dispatch(action)
    // http://cn.redux.js.org/docs/api/bindActionCreators.html
    var ret = { actions: bindActionCreators(clickAction, dispatch), fooKey: "foo-value" };

    // Or you can use 'dispatch(clickAction)' to map to props.
    // http://cn.redux.js.org/docs/basics/UsageWithReact.html

    console.log("#mapDispatchToProps: ret.actions:");
    console.log(ret.actions);

    return ret; // return members for this.props to use
}

// connect component to store of <Provider store={store}/>
export default connect(mapStateToProps, mapDispatchToProps)(CountButton);
