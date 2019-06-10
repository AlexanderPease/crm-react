import React from "react"
import { Button } from "react-bootstrap"
import ReactTable from "react-table"
import matchSorter, { rankings } from 'match-sorter'

import { paths, apiBaseUrl } from "../lib/constants"
import Input from "../components/shared/input"


export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.selectedIds = this.selectedIds.bind(this)

    this.get = this.get.bind(this)
    this.put = this.put.bind(this)

    this.toggleRow = this.toggleRow.bind(this)
    this.toggleSelectAll = this.toggleSelectAll.bind(this)

    this.mergeContacts = this.mergeContacts.bind(this)

    this.state = {
      data: this.get(),
      selected: {},
      selectAll: 0
    }
  }

  selectedIds() {
    let selectedIds = []
    for (var key in this.state.selected) {
      if (this.state.selected[key]) {
       selectedIds.push(key)
      }
    }
    return selectedIds
  }

  /****************************************************/
  // Row selection
  /****************************************************/
  toggleRow(id) {
    const newSelected = Object.assign({}, this.state.selected)
    newSelected[id] = !this.state.selected[id]
    this.setState({
      selected: newSelected,
      selectAll: 2
    })
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.id] = true
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  /****************************************************/
  // Contact API methods
  /****************************************************/
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
    })
  }

  put(contact_id, data) {
    console.log('put')
    console.log(contact_id)
    console.log(data)
    fetch(
      apiBaseUrl + paths.contact + "/" + contact_id,
      { 
        method: "PUT",
        body: JSON.stringify(data)
      }
    )
    .then(resp => {
      if (resp.status == 200) {
        console.log('success')
        this.get()
      } else if (resp.status == 401) {
        throw new Error('Unauthorized to access.')
      } else {
        throw new Error('Failed to access.')
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    })
  }

  // Merge contacts together
  mergeContacts() {
    console.log('merge contacts')
    const ids = this.selectedIds()
    if (ids.length != 2) { return }
    let data = { 'merge': ids[1] }
    this.put(ids[0], data)
  }


  /****************************************************/
  // Render
  /****************************************************/
  render() {
    const columns = [
      {
        id: "checkbox",
        accessor: "",
        Header: x => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selectAll === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
          )
        },
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.id] === true}
              onChange={() => this.toggleRow(original.id)}
            />
          );
        },
        sortable: false,
        width: 40,
        filterable: false
      },
      {
        Header: 'Name',
        accessor: 'name',
        minWidth: 200,
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true,
      },
      {
        Header: 'Emails',
        accessor: 'email_addresses',
        Cell: row => (
          <div>{row.original.email_addresses.map(e => e.email_address)}</div>
        ),
        minWidth: 200,
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
        filterable: false,
        maxWidth: 70
      },
            {
        Header: 'Latest To',
        accessor: 'to_latest',
        filterable: false
      },
      {
        Header: 'From',
        accessor: 'from_count',
        filterable: false,
        maxWidth: 70
      },
            {
        Header: 'Latest From',
        accessor: 'from_latest',
        filterable: false
      }
    ]

    return (
      <div>
        <Button
          id="mergeButton"
          variant='primary'
          disabled={this.selectedIds().length !== 2}
          onClick={this.mergeContacts}
        >Merge Contacts</Button>

        <ReactTable
          data={this.state.data}
          columns={columns}
          className="-striped"
          defaultPageSize={10}
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