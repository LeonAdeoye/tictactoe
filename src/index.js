import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// In React, function components are a simpler way to write components that only contain a render method and don’t have their own state.
// Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered.
// Function components are less tedious to write than classes, and many components can be expressed this way.
function Square(props)
{
    return (
        <button className="square"
                onClick={ () =>  props.onClick() }>
            {props.value}
        </button>
    );
}

class Board extends React.Component
{
    // Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.
    // Next, we need to change what happens when a Square is clicked. The Board component now maintains which squares are filled.
    // We need to create a way for the Square to update the Board’s state.
    // Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.
    // Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked.
    renderSquare(i)
    {
        return (<Square value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)} />);
    }

    render()
    {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++)
    {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

function calculateDraw(squares)
{
    for (let i = 0; i < squares.length; i++)
    {
        if (!squares[i])
            return false;
    }
    return true;
}

class Game extends React.Component
{
    // In JavaScript classes, you need to always call super when defining the constructor of a subclass.
    // All React component classes that have a constructor should start with a super(props) call.
    constructor(props)
    {
        super(props);
        this.state =
        {
            history: [{ squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0, // Added stepNumber to the Game component’s state to indicate which step we’re currently viewing.
        };
    }

    // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
    // We’ll update the Board’s handleClick function to flip the value of xIsNext.
    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // Unlike the array push() method you might be more familiar with, the concat() method does not mutate the original array, so we prefer it.
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step)
    {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // Using the map method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to “jump” to past moves.
        // As we iterate through history array, STEP variable refers to the current history element value, and MOVE variable refers to the current history element index.
        // We are only interested in move here, hence step is not getting assigned to anything.
        // For each move in the tic-tac-toe game’s history, we create a list item <li> which contains a button <button>.
        // The button has a onClick handler which calls a method called this.jumpTo().
        const moves = history.map((step, move) =>
        {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner)
        {
            status = <h1>{'Congratulations! The winner is: ' + winner}</h1>;
        }
        else
        {
            // Change the “status” text in Board’s render so that it displays which player has the next turn:
            if(calculateDraw(current.squares))
                status = <h2>'This is a draw!!!'</h2>
            else
                status = <h3>{'The next player is: ' + (this.state.xIsNext ? 'X' : 'O')}</h3>;
        }

        // When using React, you generally don’t need to call addEventListener to add listeners to a DOM element after it is created.
        // Instead, just provide a listener when the element is initially rendered.
        // When you define a component using an ES6 class, a common pattern is for an event handler to be a method on the class.

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <LoginControl></LoginControl>
                    <Toggle />
                    <Clock/>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

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

class Toggle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {isToggleOn: true};

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
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render()
    {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

class LoginControl extends React.Component {
    constructor(props)
    {
        super(props);
        // this.handleLoginClick = this.handleLoginClick.bind(this);
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    // Prefer to use experimental public class syntax so commenting out above bindings in constructor.
    handleLoginClick = () =>
    {
        this.setState({isLoggedIn: true});
    }

    // Prefer to use experimental public class syntax so commenting out above bindings in constructor.
    handleLogoutClick = () =>
    {
        this.setState({isLoggedIn: false});
    }

    render()
    {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        button =  isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

function UserGreeting(props)
{
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props)
{
    return <h1>Please sign up.</h1>;
}

function Greeting(props)
{
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn)
    {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props)
{
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props)
{
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
