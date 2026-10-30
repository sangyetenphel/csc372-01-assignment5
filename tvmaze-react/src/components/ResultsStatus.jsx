/*
  Displays a status message. This component receives the result count and search term as props.
*/
export default function ResultsStatus({ status, count, query, errorMessage }) {
  let message = ''
  let isError = false

  if (status === 'loading') {
    message = 'Loading results...'
  } else if (status === 'error') {
    message = errorMessage
    isError = true
  } else if (status === 'empty') {
    message = 'Please enter a search term.'
    isError = true
  } else if (status === 'no-results') {
    message = `No shows found for "${query}". Try a different search.`
    isError = true
  } else if (status === 'success') {
    message =
      count === 1
        ? `Showing 1 result for "${query}".`
        : `Showing ${count} results for "${query}".`
  }

  return <p className={'status' + (isError ? ' error' : '')}>{message}</p>
}