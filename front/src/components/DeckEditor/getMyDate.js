export const getMyDate = (timestamp) => {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const myDate = `${day}/${month}/${year}`

  return myDate
}
