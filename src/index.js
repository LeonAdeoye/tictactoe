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
    // In JavaScript classes, you need to always call super when defining the constructor of a subclass.
    // All React component classes that have a constructor should start with a super(props) call.
    constructor(props)
    {
        super(props);
        // React components can have state by setting this.state in their constructors.
        // this.state should be considered as private to a React component that it’s defined in.
        // Let’s store the current value of the Square in this.state, and change it when the Square is clicked.
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
    // We’ll update the Board’s handleClick function to flip the value of xIsNext.
    handleClick(i)
    {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i])
        {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    // Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.
    // Next, we need to change what happens when a Square is clicked. The Board component now maintains which squares are filled.
    // We need to create a way for the Square to update the Board’s state.
    // Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.
    // Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked.
    renderSquare(i)
    {
        return (<Square value={this.state.squares[i]}
                        onClick={() => this.handleClick(i)} />);
    }

    render()
    {
        const winner = calculateWinner(this.state.squares);

        let status;
        if(winner)
        {
            status = 'Congratulations! The winner is: ' + winner;
        }
        else
        {
            // Change the “status” text in Board’s render so that it displays which player has the next turn:
            status = 'The next player is: ' + (this.state.xIsNext ? 'X' : 'O') ;
        }

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
