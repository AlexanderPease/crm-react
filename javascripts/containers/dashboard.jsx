import React from "react"
import { Button } from "react-bootstrap"
import ReactTable from "react-table"
import matchSorter, { rankings } from 'match-sorter'

import { paths, apiBaseUrl } from "../lib/constants"
import Input from "../components/shared/input"
import BulkEditModal from "../components/dashboard/BulkEditModal"
import cleanContacts from "../lib/contacts"
import dateString from "../lib/date"


export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.selectedIds = this.selectedIds.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
    this.saveCell = this.saveCell.bind(this)
    this.showBulkEditModal = this.showBulkEditModal.bind(this)

    this.editContacts = this.editContacts.bind(this)
    this.updateEditState = this.updateEditState.bind(this)

    this.get = this.get.bind(this)
    this.put = this.put.bind(this)

    this.toggleRow = this.toggleRow.bind(this)
    this.toggleSelectAll = this.toggleSelectAll.bind(this)

    this.mergeContacts = this.mergeContacts.bind(this)

    this.state = {
      data: [],
      selected: {},
      selectAll: 0,

      // Edit contacts
      edits: {
        company: '',
        tags: ''
      }
    }
    this.get()
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
      return cleanContacts(json)
    })
    .then((data) => {
      this.setState({ data: data })
    })
    .catch(function (error) {
      console.log('Request failed', error);
    })
  }

  put(contact_id, data) {
    fetch(
      apiBaseUrl + paths.contact + "/" + contact_id,
      { 
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
    )
    .then(resp => {
      if (resp.status == 200) {
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
    const ids = this.selectedIds()
    if (ids.length != 2) { return }
    let data = { 'merge': ids[1] }
    this.put(ids[0], data)
  }

  editContacts(data) {

    console.log('editContacts')
  }

  saveCell(e) {
    console.log(e.target.innerHTML)
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={this.saveCell}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    )
  }

  updateEditState(e) {
    console.log('updateEditState')
    console.log(e)
    console.log(e.target.id)
    console.log(e.target.value)
    let edits = { ...this.state.edits }
    edits[e.target.id] = e.target.value
    console.log(edits)
    this.setState({ edits: edits })
  }

  showBulkEditModal() {
    const bulkEditModal = BulkEditModal({
      numContacts: this.selectedIds().length,
      edits: this.state.edits,
      onChange: this.updateEditState,
      onClick: this.editContacts // callback to execute
    })
    this.props.setModalProps(bulkEditModal)
    this.props.toggleShowModal()
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
        Cell: this.renderEditable,
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true,
      },
      {
        Header: 'Company',
        accessor: 'company',
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["company"] }),
        filterAll: true,
      },
      {
        Header: 'Emails',
        accessor: 'email_addresses',
        Cell: row => (
          <div>{row.original.email_addresses.map(e => e.email_address).join(', ')}</div>
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
        filterable: false,
        Cell: row => <div>{dateString(row.original.to_latest)}</div>
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
        filterable: false,
        Cell: row => <div>{dateString(row.original.from_latest)}</div>
      }
    ]

    return (
      <div>
        <div className="dashboard-actions">
          <Button
            id="mergeButton"
            variant='primary'
            disabled={this.selectedIds().length !== 2}
            onClick={this.mergeContacts}
          >Merge Contacts</Button>

          <Button
            id="mergeButton"
            variant='primary'
            disabled={this.selectedIds().length <= 1}
            onClick={this.showBulkEditModal}
          >Bulk Edit</Button>
        </div>

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