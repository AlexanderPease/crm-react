import cleanContacts from "../../lib/contacts"
import { paths, apiBaseUrl } from "../../lib/constants"


const contactGET = (context) => {
  console.log('GET')
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
    context.setState({ data: data })
  })
  .catch(function (error) {
    console.log('Request failed', error);
  })
}

export default contactGET