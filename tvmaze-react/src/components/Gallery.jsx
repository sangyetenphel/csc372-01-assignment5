import { useState, useEffect } from 'react'
import SearchForm from './SearchForm.jsx'
import ResultsStatus from './ResultsStatus.jsx'
import ShowList from './ShowList.jsx'
import {
  SEARCH_URL,
  MAX_RESULTS,
  DEFAULT_QUERY,
  getJson,
  getErrorMessage,
} from '../utils.js'

export default function Gallery() {
  /* State owned by Gallery and shared with children via props. */
  const [query, setQuery] = useState(DEFAULT_QUERY)        // input value
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY) // term actually searched
  const [retryKey, setRetryKey] = useState(0)              // forces a retry

  const [results, setResults] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  /* Effect: runs on mount and whenever the searched term or retry changes. */
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      setErrorMessage('')
      try {
        const url = SEARCH_URL + encodeURIComponent(searchTerm)
        const data = await getJson(url, controller.signal)
        if (cancelled) return

        const limited = Array.isArray(data) ? data.slice(0, MAX_RESULTS) : []
        setResults(limited)
        setStatus(limited.length === 0 ? 'no-results' : 'success')
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return
        setResults([])
        setErrorMessage(getErrorMessage(err))
        setStatus('error')
      }
    }

    load()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [searchTerm, retryKey])

  function handleSubmit() {
    const trimmed = query.trim()
    if (trimmed === '') {
      setResults([])
      setStatus('empty')
      return
    }
    if (trimmed === searchTerm) {
      /* Same term submitted again: retry rather than silently doing nothing. */
      setRetryKey((k) => k + 1)
    } else {
      setSearchTerm(trimmed)
    }
  }

  return (
    <div className="gallery-page">
      <SearchForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
      />

      <ResultsStatus
        status={status}
        count={results.length}
        query={searchTerm}
        errorMessage={errorMessage}
      />

      {status === 'success' && <ShowList shows={results} />}
    </div>
  )
}