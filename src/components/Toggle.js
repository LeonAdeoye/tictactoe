// We import the useState Hook from React.
// What is a Hook? A Hook is a special function that lets you “hook into” React features.
// For example, useState is a Hook that lets you add React state to function components.
import React, {useState, useEffect} from "react";

// Functions were previously known as “stateless components”.
// React has recently introduced the ability to use React state from functions, so we may prefer the name them “function components”.
// When would I use a Hook? If you write a function component and realize you need to add some state to it, previously you had to convert it to a class.
// Now you can use a Hook inside the existing function component.
function ToggleFunc()
{
    //  we declare a new state variable by calling the useState Hook. It returns a pair of values, to which we give names.
    //  We’re calling our variable count because it holds the number of button clicks. We initialize it to zero by passing 0 as the only useState argument.
    //  The second returned item is itself a function. It lets us update the count so we’ll name it setCount.

    // This JavaScript syntax is called “array destructuring”. It means that we’re making two new variables count and setCount, where count is set to the first value returned by useState, and setCount is the second variable (which happens to be a function).
    // It is equivalent to this code:
    // var countStateVariable = useState(0); // Returns a pair
    // var count = countStateVariable[0]; // First item in a pair
    // var setCount = countStateVariable[1]; // Second item in a pair
    // When we declare a state variable with useState, it returns a pair — an array with two items.
    // The first item is the current value, and the second is a function that lets us update it.
    // Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.
    const [count, setCount] = useState(0);
    // What do we pass to useState as an argument? The only argument to the useState() Hook is the initial state.
    // Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need.
    // In our example, we just want a number for how many times the user clicked, so pass 0 as initial state for our variable.
    // What does useState return? It returns a pair of values: the current state and a function that updates it.
    // This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class, except you get them in a pair.
    const [timestamp, setTimeStamp] = useState(Date.now());

    // WHAT does useEffect do? By using this Hook, you tell React that your component needs to do something after render.
    // React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
    // In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.

    // WHY is useEffect called inside a component? Placing useEffect inside the component lets us access the count state variable (or any props) right from the effect.
    // We don’t need a special API to read it — it’s already in the function scope.
    // Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.

    // DOES useEffect run after every render? Yes! By default, it runs both after the first render and after every update.
    // Instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that effects happen “after render”.
    // React guarantees the DOM has been updated by the time it runs the effects.

    // We pass a function to the useEffect Hook. This function we pass is our effect.
    // Inside our effect, we set the document title using the document.title browser API.
    // We can read the latest count inside the effect because it’s in the scope of our function.
    // When React renders our component, it will remember the effect we used, and then run our effect after updating the DOM.
    // This happens for every render, including the first one.
    // Effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive.
    useEffect(() =>
    {
        document.title = `You clicked ${count} times`;
        // If your effect returns a function, React will run it when it is time to do any clean up.
        // This clean-up function is equivalent to componentWillUnmount in a React component class.
        return () => {
            console.log(document.title + " => WELL DONE NOW I AM CLEANING UP YOUR MESS!");
        }
        // You can tell React to skip applying an effect if certain values haven’t changed between re-renders.
        // To do so, pass an array as an optional second argument to useEffect.
    }, [count]);

    // When the user clicks, we call setCount with a new value. React will then re-render the ToggleFunc component, passing the new count value to it.
    return (
        <button onClick = {() => {setCount(count + 1); setTimeStamp(Date.now())}} >
            The function count is {count} and the timestamp's seconds is {new Date(timestamp).getSeconds()}
        </button>
    );
}

class ToggleClass extends React.Component
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
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'} and class count is {this.state.count}
                </button>
                <ToggleFunc/>
            </div>

        );
    }
}
export default ToggleClass;

