// App.jsx
import React from "react"
import { PageHeader } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom"

import Header from "./components/header"
// import Footer from "./footer"
import Dashboard from "./containers/dashboard"
import EmailDashboard from "./containers/emails"

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {
    return (
      <Router>
        <Header />
        <div className="wrapper">
          <Switch>
            <Route
              path='/'
              exact={true}
              render={ (props) => <Dashboard {...props} />}
            />
            <Route
              path='/email-address'
              component={EmailDashboard}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
