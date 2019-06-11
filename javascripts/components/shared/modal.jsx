import React from "react"
import PropTypes  from 'prop-types'
import { PageHeader, Modal, Button } from "react-bootstrap"


const ReactModal = props => {

  return (
    <Modal show={props.showModal} onHide={props.toggleShowModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggleShowModal}>
          Close
        </Button>
        <Button variant="primary" onClick={props.toggleShowModal}>
          {props.primaryCTA}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ReactModal.propTypes = {
  showModal: PropTypes.bool,
  toggleShowModal: PropTypes.func
}

ReactModal.defaultProps = {
  showModal: false,
  title: '',
  body: '',
  primaryCTA: ''
}

export default ReactModal