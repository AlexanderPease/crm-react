// App.jsx
import React from "react";
import { PageHeader } from "react-bootstrap";
import { Switch, Route, Redirect } from "react-router-dom";

// import Header from "./header"
// import Footer from "./footer"
// import LoginForm from "./login-form"
import Dashboard from "./containers/dashboard"

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.setCurrentUser = this.setCurrentUser.bind(this);

    // // Flask context sets initial user state
    // this.state = {
    //   currentUser: window.Context.user,
    // };
  }

  // setCurrentUser(user) {
  //   this.setState({
  //     currentUser: user
  //   });
  // }

  render () {
    return (
      <div className="wrapper">
        <Switch>
          <Route
            path='/'
            render={ (props) => <Dashboard {...props} />}
          />
        </Switch>
      </div>
    );
  }
}
