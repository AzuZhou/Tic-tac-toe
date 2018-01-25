import React, { Component, Fragment } from 'react'
import Square from './Square'
import Result from './Result'

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            firstPlayer: this.props.value,
            humanPlayer: this.props.value,
            aiPlayer: 'O',
            gameType: this.props.type
        }
    }

    turnTimer = () => {
        setTimeout(function () {
            this.setState({
                xIsNext: !this.state.xIsNext
            })
        }.bind(this), 400)
    }

    handleClick = (i) => {
        let squares = [...this.state.squares]
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        if (this.state.gameType === 'AI') {
            let index = this.minimax(squares, this.state.aiPlayer).index
            const aiTimer = (i) => {
                setTimeout(function () {
                    squares[index] = i
                }, 200)
            }
            if (this.state.aiPlayer === 'X') {
                aiTimer('X')
                this.turnTimer()
            } else {
                aiTimer('O')
                this.turnTimer()
            }
        }
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
        })
    }

    minimax = (newBoard, player) => {
        let winning = calculateWinner(newBoard)
        let availableSpots = getAvailableSpots(newBoard)

        if (winning === this.state.humanPlayer) {
            return { score: -10 }
        }
        else if (winning === this.state.aiPlayer) {
            return { score: 10 }
        }
        else if (availableSpots.length === 0) {
            return { score: 0 }
        }

        let moves = []
        for (let i of availableSpots) {
            let move = {}
            move.index = i
            newBoard[i] = player
            if (player === this.state.aiPlayer) {
                let result = this.minimax(newBoard, this.state.humanPlayer)
                move.score = result.score
            } else {
                let result = this.minimax(newBoard, this.state.aiPlayer)
                move.score = result.score
            }
            newBoard[i] = null
            moves.push(move)
        }

        let bestMove
        if (player === this.state.aiPlayer) {
            let bestScore = -10000
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        } else {
            let bestScore = 10000
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
        }
        return moves[bestMove]
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    componentDidMount() {
        if (this.state.firstPlayer === 'O') {
            this.setState({
                xIsNext: false,
                aiPlayer: 'X'
            })
        }
    }

    render() {
        let winner = calculateWinner(this.state.squares)
        let status
        let results
        let tie = gameOver(this.state.squares)

        if (winner) {
            results = 'Winner: ' + winner
            status = <Result value={results} />
        } else {
            if (tie) {
                results = 'It was a draw'
                status = <Result value={results} />
            } else {
                status = <h1>{'Next player: ' + (this.state.xIsNext ? 'X' : 'O')}</h1>
            }
        }

        return (
            <Fragment>
                <div className="status">{status}</div>
                <div className="board">
                    <div className="row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </Fragment>
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

function gameOver(squares) {
    for (let square of squares) {
        if (square !== 'X' && square !== 'O') {
            return false
        }
    }
    return true
}

function getAvailableSpots(board) {
    let indexFinder = 0
    let spots = []
    for (let spot of board) {
        indexFinder++
        if (spot !== "O" && spot !== "X") {
            spots.push(indexFinder - 1)
        }
    }
    return spots
}


