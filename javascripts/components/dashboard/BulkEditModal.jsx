import React from "react"
// import { Button } from "react-bootstrap"

import Input from "../shared/input"
import ConfirmButton from "../shared/ConfirmButton"


const BulkEditModal = props => {
  let title = 'Edit Contact'
  if (props.numContacts > 1) {
    title = 'Edit ' + props.numContacts + ' Contacts'
  }

  return {
    title: title,
    body: (
      <div>
        <Input
          value={props.inputName}
          onChange={props.onChange}
          controlId="name"
          title="Name"
          placeholder="ex. Hayao Miyazaki"
          disabled={true}
        />
        <Input
          value={props.inputCompany}
          onChange={props.onChange}
          controlId="company"
          title="Company"
          placeholder="ex. Studio Ghibli" 
        />
        <Input
          value={props.inputTags}
          onChange={props.onChange}
          controlId="tags"
          title="Add Tags"
          placeholder="ex. animation, culture..." 
        />
        <ConfirmButton
          id="mergeButton"
          variant='primary'
          disabled={props.numContacts < 2}
          onClick={props.mergeContacts}
        >
          Merge Contacts
        </ConfirmButton>
      </div>
    ),
    primaryCTA: 'Save',
    ...props
  }
}

export default BulkEditModal