// Convert date strings to objects
const cleanContacts = (contacts) => {
  for (var i=0; i < contacts.length; i++) {
    if(contacts[i]['to_latest']) {
      contacts[i]['to_latest'] = new Date(contacts[i]['to_latest'])    
    }
    if(contacts[i]['from_latest']) {
      contacts[i]['from_latest'] = new Date(contacts[i]['from_latest'])
    }
  }
  return contacts
}
export default cleanContacts