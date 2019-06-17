// Display a date object
const dateString = (date) => {
    if (date) { return date.toISOString().substring(0, 10) }
}
export default dateString