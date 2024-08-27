export function getDate(date) {  // date in yyyy-mm-dd format
    return new Date(date).toLocaleDateString('en-GB')
}