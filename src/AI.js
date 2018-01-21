import React, { Component } from 'react'
import Board from './Board'
import Player from './Player'

export default class AI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: false,
            firstPlayer: '',
            gameType: this.props.type
        }
    }

    clickHandler = (e) => {
        this.setState({
            ready: true,
            firstPlayer: e.target.value
        });
    }

    onClick() {
        this.setState({
            ready: false,
            firstPlayer: '',
        })
    }

    render() {
        if (this.state.ready) {
            return (
                <div className="game">
                    <Board value={this.state.firstPlayer} type={this.state.gameType} />
                    <button onClick={() => this.onClick()}>{'New Game'}</button>
                </div>
            )
        } else {
            return (
                <div className="game">
                    <Player onClick={this.clickHandler} />
                </div>
            )
        }
    }
}



