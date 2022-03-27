import React from "react";

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

export default Board;
