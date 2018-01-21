import React, { Component, Fragment } from 'react'

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
            <Fragment>
                {this.state.status}
            </Fragment>
        )
    }
}
