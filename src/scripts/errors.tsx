export default function handleError(error: unknown) {
  if (typeof error === 'string') {
    return error.toUpperCase() // works, `e` narrowed to string
  } else if (error instanceof Error) {
    console.log(error) // works, `e` narrowed to Error
  } else if (typeof error === undefined) {
    console.log(error)
  }
}
