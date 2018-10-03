import React from 'react'

export const Player = props => {
  return (
    <div className="pick">
      <h1>{'Choose your side!'}</h1>
      <div className="options">
        <button onClick={props.onClick} value={'X'}>
          {'X'}
        </button>
        <button onClick={props.onClick} value={'O'}>
          {'O'}
        </button>
      </div>
    </div>
  )
}
