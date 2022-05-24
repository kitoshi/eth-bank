export default function handleError(error: unknown) {
  if (typeof error === 'string') {
    return error.toUpperCase() // works, `e` narrowed to string
  } else if (error instanceof Error) {
    console.log(error) // works, `e` narrowed to Error
    alert('Metamask error, please whitelist site and check if logged in')
  } else if (typeof error === undefined) {
    console.log(error)
  }
}
