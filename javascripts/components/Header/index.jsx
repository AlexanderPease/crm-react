import React            from 'react'
import PropTypes        from 'prop-types'
import { Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { paths } from  "../../lib/constants"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand href="#home" className="logo">Personal CRM</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default withRouter(Header);
