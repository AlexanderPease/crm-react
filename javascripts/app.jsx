// App.jsx
import React from "react"
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
import ReactModal from "./components/shared/modal"

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.toggleShowModal = this.toggleShowModal.bind(this)

    this.state = {
      showModal: false,
      modalProps: {}
    }
  }

  // Toggle showing modal
  toggleShowModal(modalProps) {
    this.setState({
      showModal: this.state.showModal ? false : true,
      modalProps: modalProps
    })
  }

  render () {

    // TODO: Not being passed in....
    const props = {
      toggleShowModal: this.toggleShowModal
    }

    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route
                path='/'
                exact={true}
                render={ (props) => <Dashboard {...props} toggleShowModal={this.toggleShowModal}/>}
              />
            </Switch>
          </div>

          <ReactModal
            showModal={this.state.showModal}
            toggleShowModal={this.toggleShowModal}
            {...this.state.modalProps}
          />
        </div>
      </Router>
    );
  }
}
