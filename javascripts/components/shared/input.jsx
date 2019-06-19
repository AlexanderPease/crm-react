import React from 'react'
import PropTypes from 'prop-types'
import { Form } from "react-bootstrap"


export default class Input extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Label>{this.props.title}</Form.Label>
        <Form.Control
          value={this.props.value}
          type={this.props.type}
          onChange={(e) => {this.props.onChange(e)}} 
          placeholder={this.props.placeholder} 
        />
      </Form.Group>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
}

Input.defaultProps = {
  type: "text",
  value: ""
}
