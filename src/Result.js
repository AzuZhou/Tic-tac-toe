import React, { Component } from 'react'

export default class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                status: this.props.value
            })
        }, 500)
    }

    render() {
        return (
            <h1>
                {this.state.status}
            </h1>
        )
    }
}
