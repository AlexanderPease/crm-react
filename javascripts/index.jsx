import React from "react"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import App from "./app"

require('../stylesheets/index.scss')
import "react-table/react-table.css"

ReactDOM.render(
  (
    <Router>
      <App />
    </Router>
  ), document.getElementById("app"))