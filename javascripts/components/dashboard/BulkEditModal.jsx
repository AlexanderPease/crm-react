import React from "react"

import Input from "../shared/input"

const BulkEditModal = props => {
  return {
    title: 'Edit ' + props.numContacts + ' Contacts',
    body: (
      <div>
        <Input
          value={props.edits.company}
          onChange={props.onChange}
          controlId="company"
          title="Company"
          placeholder="ex. Google" 
        />
        <Input
          value={props.edits.tags}
          onChange={props.onChange}
          controlId="tags"
          title="Add Tags"
          placeholder="ex. VC, angel, startup..." 
        />
      </div>
    ),
    primaryCTA: 'Save',
    ...props
  }
}

export default BulkEditModal