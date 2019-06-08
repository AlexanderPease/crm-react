import React from "react"
import ReactTable from "react-table"

import { paths, apiBaseUrl } from "../lib/constants"

export default class EmailDashboard extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.getEmails = this.getEmails.bind(this)

    this.state = {
      'emails': []
    }
  }

  componentDidMount() {
    this.getEmails()
  }

  // GET email addresses
  getEmails() {
    fetch(
      apiBaseUrl + paths.emailAddressDashboard,
      { method: "GET" }
    )
    .then(resp => {
      if (resp.status == 200) {
        return resp.json()
      } else if (resp.status == 401) {
        throw new Error('Unauthorized to access.')
      } else {
        throw new Error('Failed to access.')
      }
    })
    .then((json) => {
      this.setState({ emails: json })
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  render() {
    const columns = [
      {
        Header: 'Email',
        accessor: 'email_address'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'To',
        accessor: 'to_count'
      },
            {
        Header: 'Latest To',
        accessor: 'to_latest'
      },
      {
        Header: 'From',
        accessor: 'from_count'
      },
            {
        Header: 'Latest From',
        accessor: 'from_latest'
      }
    ]

    return (
      <div>
        <h1>Emails</h1>
        <ReactTable
          data={this.state.emails}
          columns={columns}
          className="-striped"
          defaultSorted={[
            {
              id: "email_address",
              desc: false
            }
          ]}
        />
      </div>
    )
  }
}