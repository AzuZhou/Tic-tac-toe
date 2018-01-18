import React, { Component } from 'react'
import Square from './Square'
import Result from './Result'

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            firstPlayer: this.props.value,

        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice()

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    componentDidMount() {
        if (this.state.firstPlayer === 'O') {
            this.setState({
                xIsNext: false
            })
        }
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status
        let results
        const gameOver = theEnd(this.state.squares)

        if (winner) {
            results = 'Winner: ' + winner
            status = <Result value={results} />
        } else {
            if (gameOver) {
                results = 'It was a draw'
                status = <Result value={results} />
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
            }
        }

        return (
            <div className="game-board">
                <div className="status"><h1>{status}</h1></div>
                <div className="board">
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
            </div>
        );
    }
}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null;
}

function theEnd(squares) {
    for (let square of squares) {
        if (square !== 'X' && square !== 'O') {
            return false
        }
    }
    return true
}