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
            gameType: this.props.type
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

    handleClick = (i) => {
        let squares = [...this.state.squares];
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
        })

        if (this.state.gameType === 'AI') {
            if (this.state.firstPlayer === 'X') {
                const best = maximize(squares);
                squares[best[1]] = 'O'
                this.setState({
                    xIsNext: true
                })
            } else {
                const best = maximize(squares);
                squares[best[1]] = 'X'
                this.setState({
                    xIsNext: false
                })
            }
        }
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
        )
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

const minimize = board => {
    const moves = getAvailableSpots(board);
    if (theEnd(board)) return 1;
    if (!moves.length) return 0;
    let bestMove;
    let bestValue = Infinity;
    for (let i = 0; i < moves.length; i++) {
        board[moves[i]] = 'O';
        let hValue = maximize(board);
        if (Array.isArray(hValue)) {
            hValue = hValue[0];
        }
        if (hValue < bestValue) {
            bestMove = moves[i];
            bestValue = hValue;
        }
        board[moves[i]] = null;
    }
    return [bestValue, bestMove];
};

const maximize = board => {
    const moves = getAvailableSpots(board);
    if (theEnd(board)) return -1;
    if (!moves.length) return 0;
    let bestMove;
    let bestValue = -Infinity;
    for (let i = 0; i < moves.length; i++) {
        board[moves[i]] = 'X';
        let hValue = minimize(board);
        if (Array.isArray(hValue)) {
            hValue = hValue[0];
        }
        if (hValue > bestValue) {
            bestMove = moves[i];
            bestValue = hValue;
        }
        board[moves[i]] = null;
    }
    return [bestValue, bestMove];
};

const getAvailableSpots = board => {
    let result = [];
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) result.push(i);
    }
    return result;
};


