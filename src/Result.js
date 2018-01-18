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
        }, 1000)
    }

    render() {
        return (
            <Fragment>
                {this.state.status}
            </Fragment>
        )
    }
}

/*setTimeout(() => {
            this.setState({
                button: <button onClick={this.props.onClick}>{"Next Round"}</button>
            })

            {this.state.button}

            button: ''
        }, 2000)*/