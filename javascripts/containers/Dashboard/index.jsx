import React from "react"
import { Button } from "react-bootstrap"
import ReactTable from "react-table"
import matchSorter, { rankings } from 'match-sorter'

import Input from "../../components/shared/input"
import BulkEditModal from "../../components/dashboard/BulkEditModal"
import ReactModal from "../../components/shared/modal"
import dateString from "../../lib/date"
import { contactGET, contactPUT } from "../../api/contact"


const defaultModalProps = {
  type: '',
  isShowing: false,
  inputCompany: '', 
  inputTags: ''
}


export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.selectedIds = this.selectedIds.bind(this)

    this.editContacts = this.editContacts.bind(this)
    this.updateModalInputs = this.updateModalInputs.bind(this)
    this.toggleShowModal = this.toggleShowModal.bind(this)

    this.toggleRow = this.toggleRow.bind(this)
    this.toggleSelectAll = this.toggleSelectAll.bind(this)

    this.mergeContacts = this.mergeContacts.bind(this)

    this.state = {
      data: [],
      selected: {},
      selectAll: 0,

      // Edit contacts
      modalProps: {
        numContacts: 0,
        ...defaultModalProps
      }
    }
    contactGET(this)
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
  // Table
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
  // Modal
  /****************************************************/

  // Callback for modal inputs
  updateModalInputs(e) {
    let modalProps = { ...this.state.modalProps }
    const key = 'input' + e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)
    modalProps[key] = e.target.value
    this.setState({ modalProps })
  }

  // Toggle showing modal
  toggleShowModal(e) {
    let modalProps = {...this.state.ModalProps}
    
    if (this.state.modalProps.isShowing) {
      modalProps = defaultModalProps
    } else {
      modalProps.isShowing = true
      modalProps.type = e.target.id
    }

    this.setState({ modalProps })
  }

  /****************************************************/
  // Contact API methods
  /****************************************************/

  // Merge contacts together
  mergeContacts() {
    const ids = this.selectedIds()
    if (ids.length != 2) { return }
    let data = { 'merge': ids[1] }
    contactPUT(this, ids[0], data)
  }

  // Edit contacts using inputs from modal
  editContacts() {
    for (const id of this.selectedIds()) {
      const inputs = this.state.modalProps
      let data = {
        name: inputs.inputName,
        company: inputs.inputCompany,
        tags: inputs.inputTags
      }
      contactPUT(this, id, data)
    }
    this.toggleShowModal()
    this.setState({ selected: {}, selectAll: 0 })
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

    const modalProps = BulkEditModal({
      numContacts: this.selectedIds().length,
      onChange: this.updateModalInputs,
      toggleShow: this.toggleShowModal,
      mergeContacts: this.mergeContacts,
      onClick: this.editContacts,
      ...this.state.modalProps
    })

    let editCTA = 'Edit Contact'
    if (this.props.numContacts > 1) {
      title = 'Edit ' + props.numContacts + ' Contacts'
    }

    return (
      <div className="dashboard-screen">

        <div className="dashboard-actions">
          <Button
            id="sendEmail"
            variant='primary'
            disabled={this.selectedIds().length < 1}
            onClick={this.toggleShowModal}
          >Send Email</Button>
          <Button
            id="editContacts"
            variant='secondary'
            disabled={this.selectedIds().length < 1}
            onClick={this.toggleShowModal}
          >Edit Contacts</Button>
        </div>

        <div className="dashboard-table">
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

        <ReactModal {...modalProps} />
      </div>
    )
  }
}