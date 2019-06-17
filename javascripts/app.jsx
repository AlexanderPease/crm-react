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
    this.setModalProps = this.setModalProps.bind(this)

    this.state = {
      showModal: false,
      modalProps: {}
    }
  }

  // Toggle showing modal
  toggleShowModal() {
    this.setState({ showModal: this.state.showModal ? false : true })
  }

  // Set modal props
  setModalProps(modalProps) {
    this.setState({ modalProps: modalProps })
  }

  render () {

    // TODO: Not being passed in by {...props}....
    const props = {
      // toggleShowModal: this.toggleShowModal
      // modalProps: this.state.modalProps
    }

    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route
                path='/'
                exact={true}
                render={ (props) => <Dashboard {...props} toggleShowModal={this.toggleShowModal} modalProps={this.state.modalProps} setModalProps={this.setModalProps}/>}
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
