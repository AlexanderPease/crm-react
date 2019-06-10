// App.jsx
import React from "react"
import { PageHeader } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom"

// import Header from "./components/header"
// import Footer from "./footer"
import Dashboard from "./containers/dashboard"
import { paths } from  "./lib/constants"

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {
    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route
                path='/'
                exact={true}
                render={ (props) => <Dashboard {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
