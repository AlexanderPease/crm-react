// App.jsx
import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom"

import Header from "./components/Header"
// import Footer from "./footer"
import Dashboard from "./containers/Dashboard"
import { paths } from  "./lib/constants"

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {
    return (
      <Router>
        <Header />
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
