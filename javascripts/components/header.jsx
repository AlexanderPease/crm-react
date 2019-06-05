import React            from 'react'
import PropTypes        from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='o-container o-container--full clearfix'>
        <NavLink to="/email-address">
          Email Addresses
        </NavLink>
      </div>
    </header>
  )
}

export default withRouter(Header);
