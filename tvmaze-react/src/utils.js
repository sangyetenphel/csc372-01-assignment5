/* API configuration and shared helper functions. */

export const SEARCH_URL = 'https://api.tvmaze.com/search/shows?q='
export const SHOWS_URL = 'https://api.tvmaze.com/shows/'
export const TVMAZE_WEB_URL = 'https://www.tvmaze.com/shows/'

export const MAX_RESULTS = 10
export const MAX_CARD_CAST = 5
export const MAX_DETAIL_CAST = 15
export const DEFAULT_QUERY = 'friends'

/** Remove HTML tags from a summary string and collapse whitespace. */
export function stripHtml(htmlText) {
  if (!htmlText) return ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlText, 'text/html')
  const text = doc.body.textContent || ''
  return text.replace(/\s+/g, ' ').trim()
}

/** Format a premiere date like "2005-03-26" as a readable date. */
export function formatDate(value) {
  if (!value) return 'Not available'
  const d = new Date(value + 'T00:00:00')
  if (isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Format a full ISO timestamp as a readable date and time. */
export function formatDateTime(value) {
  if (!value) return 'Not available'
  const d = new Date(value)
  if (isNaN(d.getTime())) return 'Not available'
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/**
 * Fetch JSON, checking res.ok before calling res.json().
 * Accepts an AbortSignal so stale requests can be cancelled.
 */
export async function getJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    const error = new Error('HTTP ' + response.status)
    error.status = response.status
    throw error
  }
  return response.json()
}

/** Turn a fetch error into a user-facing message. */
export function getErrorMessage(error) {
  if (error.status === 429) {
    return 'The TVmaze rate limit was reached. Please wait a moment and try again.'
  }
  if (error.status) {
    return 'The request failed (HTTP ' + error.status + '). Please try again.'
  }
  return 'Something went wrong contacting TVmaze. Check your connection and try again.'
}