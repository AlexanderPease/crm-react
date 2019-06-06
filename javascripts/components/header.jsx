import React            from 'react'
import PropTypes        from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { paths } from  "../lib/constants"

const Header = () => {
  return (
    <header>
      <div className='o-container o-container--full clearfix'>
        <NavLink to={paths.emailAddressDashboard}>
          Email Addresses
        </NavLink>
      </div>
    </header>
  )
}

export default withRouter(Header);
