import React from 'react'

export default (props) => (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
)

