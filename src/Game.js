import React, { Component } from 'react'
import Human from './Human'
import AI from './AI'

export default class Game extends Component {
    constructor() {
        super()
        this.state = {
            gameType: ''
        }

    }

    clickHandler = (e) => {
        this.setState({
            gameType: e.target.value
        })
    }

    onClick = () => {
        this.setState({
            gameType: ''
        })
    }

    render() {
        if (this.state.gameType === 'Human') {
            return (
                <div className='Game'>
                    <Human />
                    <button onClick={this.onClick}>{'Back to menu'}</button>
                </div>
            )
        } else if (this.state.gameType === 'AI') {
            return (
                <div className='Game'>
                    <AI />
                    <button onClick={this.onClick}>{'Back to menu'}</button>
                </div>
            )
        }
        return (
            <div className='choose-game-type'>
                <h1>{'How would you like to play?'}</h1>
                <div className='buttons'>
                    <button onClick={this.clickHandler} value='AI'>{'One Player'}</button>
                    <button onClick={this.clickHandler} value='Human'>{'Two Players'}</button>
                </div>
            </div>
        )

    }
}



