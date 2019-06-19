import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "react-bootstrap"


// Button that requires confirmation
export default class ConfirmButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onClick = this.onClick.bind(this)

    this.state = {
      children: this.props.children,
      onClick: this.onClick,
      ...this.props
    }
  }

  onClick() {
    this.setState({
      children: "Are you sure?",
      onClick: this.props.onClick
    })
  }

  render() {
    return (
      <Button {...this.state}/>
    )
  }
}
