import React from "react";

// This is commonly called a “top-down” or “unidirectional” data flow.
// Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.
function FormattedDate(props)
{
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// When <Clock /> is passed to ReactDOM.render(), React calls the constructor of the Clock component.
// Since Clock needs to display the current time, it initializes this.state with an object including the current time. We will later update this state.
// React then calls the Clock component’s render() method.
// This is how React learns what should be displayed on the screen. React then updates the DOM to match the Clock’s render output.
// When the Clock output is inserted in the DOM, React calls the componentDidMount() lifecycle method.
// Inside it, the Clock component asks the browser to set up a timer to call the component’s tick() method once a second.
// Every second the browser calls the tick() method. Inside it, the Clock component schedules a UI update by calling setState() with an object containing the current time.
// Thanks to the setState() call, React knows the state has changed, and calls the render() method again to learn what should be on the screen.
// This time, this.state.date in the render() method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
// If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle method so the timer is stopped.
class Clock extends React.Component
{
    // Class components should always call the base constructor with props.
    constructor(props)
    {
        super(props);
        this.state = {date: new Date()};
    }

    //  Make the Clock component set up its own timer and update itself every second.
    // In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.
    // We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called “mounting” in React.
    // We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called “unmounting” in React.
    // The componentDidMount() lifecycle method runs after the component output has been rendered to the DOM. This is a good place to set up a timer.
    // While this.props is set up by React itself and this.state has a special meaning,
    // you are free to add additional fields to the class manually if you need to store something that does not participate in the data flow (like a timer ID).

    componentDidMount()
    {
        this.timerID = setInterval(() => this.tick(),1000);
    }

    // We will tear down the timer in the componentWillUnmount() lifecycle method.
    componentWillUnmount()
    {
        clearInterval(this.timerID);
    }

    // We will implement a method called tick() that the Clock component will run every second.
    // It will use this.setState() to schedule updates to the component local state
    tick()
    {
        this.setState({
            date: new Date()
        });
    }

    render()
    {
        return (
            <div>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
}

export default Clock;
