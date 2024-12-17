export function getDate(date) {  // date in yyyy-mm-dd format
    if (date) {
        return new Date(date).toLocaleDateString('en-GB')
    }
}