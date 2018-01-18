import React, { Component } from 'react'

export default class Player extends Component {
    render() {
        return (
            <div className='pick'>
                <h1>{'Choose your side!'}</h1>
                <div className="options">
                    <button onClick={this.props.onClick} value={'X'}>{'X'}</button>
                    <button onClick={this.props.onClick} value={'O'}>{'O'}</button>
                </div>
            </div>
        )
    }
}

