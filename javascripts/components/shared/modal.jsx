import React from "react"
import PropTypes  from 'prop-types'
import { PageHeader, Modal, Button } from "react-bootstrap"


const ReactModal = props => {
  return (
    <Modal show={props.isShowing} onHide={props.toggleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onClick}>
          {props.primaryCTA}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ReactModal.propTypes = {
  isShowing: PropTypes.bool,
  toggleShow: PropTypes.func
}

ReactModal.defaultProps = {
  isShowing: false,
  title: '',
  body: '',
  primaryCTA: 'Submit'
}

export default ReactModal