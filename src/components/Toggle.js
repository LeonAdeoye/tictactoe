import React from "react";

class Toggle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isToggleOn: true,
            count:0
        };

        // You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default.
        // If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.
        // this.handleClick = this.handleClick.bind(this); COMMENTED OUT
        // This is the matching syntax <button onClick={this.handleClick}>
        // However to avoid explicit binding you can use this syntax: button onClick={() => this.handleClick()}>
        // BUT: The problem with this syntax is that a different callback is created each time the LoggingButton renders.
        // In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering.
        // We generally recommend binding in the constructor or using the class field syntax, to avoid this sort of performance problem.
        // If calling bind annoys you, there is another way you can get around this.
        // If you are using the experimental public class fields syntax, you can use class fields to correctly bind callbacks:
        // handleClick = () => {  console.log('this is');   }
    }

    // Experimental public class syntax, see comment above with explanation.
    handleClick = () =>
    {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            count: prevState.count + 1
        }));
    }

    render()
    {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'} and count is {this.state.count}
            </button>
        );
    }
}

export default Toggle;
