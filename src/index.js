import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component
{
    // In JavaScript classes, you need to always call super when defining the constructor of a subclass.
    // All React component classes that have a constructor should start with a super(props) call.
    constructor(props)
    {
        super(props);
        // React components can have state by setting this.state in their constructors.
        // this.state should be considered as private to a React component that it’s defined in.
        // Let’s store the current value of the Square in this.state, and change it when the Square is clicked.
        this.state =
            {
                value: null,
            };
    }
    render()
    {
        // Notice how with onClick={() => console.log('click')}, we’re passing a function as the onClick prop. React will only call this function after a click.
        // Forgetting () => and writing onClick={console.log('click')} is a common mistake, and would fire every time the component re-renders.

        // By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked.
        // After the update, the Square’s this.state.value will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.
        // When you call setState in a component, React automatically updates the child components inside of it too.
        return (
            <button className="square"
                    onClick={ () => { this.setState({value:'X'}) }}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
            {
                squares: Array(9).fill(null),
            }
    }
    renderSquare(i)
    {
        return <Square value={this.state.squares[i]} />;
    }

    render()
    {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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

class Game extends React.Component
{
    render()
    {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
