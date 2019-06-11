// Display a date object
const dateString = (date) => {
    if (date) {
        console.log(date)
        return date.toISOString().substring(0, 10)
    }
    console.log('NULL')
    return null
}
export default dateString