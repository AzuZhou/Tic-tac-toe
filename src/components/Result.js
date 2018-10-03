import React, { Component } from 'react'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      show: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        status: this.props.value,
        show: true
      })
    }, 400)
  }

  render() {
    let style
    if (this.state.show) {
      style = 'show'
    }
    return <h1 className={style}>{this.state.status}</h1>
  }
}
