import { paths, apiBaseUrl } from "../../lib/constants"

import { contactGET } from "./index"


const contactPUT = (context, contact_id, data) => {
  console.log('PUT')
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
      console.log('success')
      contactGET(context)
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

export default contactPUT