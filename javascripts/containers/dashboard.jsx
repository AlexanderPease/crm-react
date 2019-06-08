import React from "react"
import ReactTable from "react-table"
import matchSorter, { rankings } from 'match-sorter'

import { paths, apiBaseUrl } from "../lib/constants"
import Input from "../components/shared/input"

export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.get = this.get.bind(this)

    this.state = {
      'data': []
    }
  }

  componentDidMount() {
    this.get()
  }

  // GET
  get() {
    fetch(
      apiBaseUrl + paths.contact,
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
      this.setState({ data: json })
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true
      },
      {
        Header: 'Emails',
        accessor: 'email_addresses',
        Cell: row => (
          <div>{row.original.email_addresses.map(e => e.email_address)}</div>
        ),
        filterMethod: (filter, rows) => matchSorter(
          rows,
          filter.value,
          {
            keys: ["email_addresses.0.email_address", "email_addresses.1.email_address", "email_addresses.2.email_address"],
            threshold: matchSorter.rankings.WORD_STARTS_WITH
          }
        ),
        filterAll: true
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: row => ( 
          <div>{row.original.tags.map(t => t.name)}</div>
        ),
        filterMethod: (filter, rows) => matchSorter(
          rows,
          filter.value,
          { 
            keys: ["tags.0.name", "tags.1.name", "tags.2.name", "tags.3.name", "tags.4.name"],
            threshold: matchSorter.rankings.WORD_STARTS_WITH
          }
        ),
        filterAll: true
      },
      {
        Header: 'To',
        accessor: 'to_count',
        filterable: false
      },
            {
        Header: 'Latest To',
        accessor: 'to_latest',
        filterable: false
      },
      {
        Header: 'From',
        accessor: 'from_count',
        filterable: false
      },
            {
        Header: 'Latest From',
        accessor: 'from_latest',
        filterable: false
      }
    ]

    return (
      <div>
        <h1>Contacts</h1>
        <ReactTable
          data={this.state.data}
          columns={columns}
          className="-striped"
          filterable
          defaultSorted={[
            {
              id: "name",
              desc: false
            }
          ]}
        />
      </div>
    )
  }
}