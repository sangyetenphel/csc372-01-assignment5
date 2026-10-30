import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import CastList from './CastList.jsx'
import {
  SHOWS_URL,
  TVMAZE_WEB_URL,
  MAX_DETAIL_CAST,
  getJson,
  getErrorMessage,
  stripHtml,
  formatDate,
  formatDateTime,
} from '../utils.js'

export default function ShowDetail() {
  const { id } = useParams()

  const [show, setShow] = useState(null)
  const [showLoading, setShowLoading] = useState(true)
  const [showError, setShowError] = useState('')

  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function loadShow() {
      setShowLoading(true)
      setShowError('')
      try {
        const data = await getJson(
          SHOWS_URL + encodeURIComponent(id),
          controller.signal,
        )
        if (cancelled) return
        setShow(data)
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return
        setShow(null)
        setShowError(getErrorMessage(err))
      } finally {
        if (!cancelled) setShowLoading(false)
      }
    }

    async function loadCast() {
      setCastLoading(true)
      setCastError(false)
      try {
        const data = await getJson(
          SHOWS_URL + encodeURIComponent(id) + '/cast',
          controller.signal,
        )
        if (cancelled) return
        setCast(Array.isArray(data) ? data : [])
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return
        setCastError(true)
      } finally {
        if (!cancelled) setCastLoading(false)
      }
    }

    loadShow()
    loadCast()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [id])

  if (showLoading) {
    return <p className="status">Loading show...</p>
  }

  if (showError) {
    return (
      <div className="status error">
        <p>{showError}</p>
        <p>This show may not exist. Check the URL or return to the gallery.</p>
        <Link className="back-link" to="/">← Back to gallery</Link>
      </div>
    )
  }

  if (!show) {
    return (
      <div className="status">
        <p>Show not found.</p>
        <Link className="back-link" to="/">← Back to gallery</Link>
      </div>
    )
  }

  const summaryText = stripHtml(show.summary)
  const genres =
    show.genres && show.genres.length > 0
      ? show.genres.join(', ')
      : 'Not available'
  const rating =
    show.rating && show.rating.average != null
      ? show.rating.average + ' / 10'
      : 'Not available'
  const network = show.network?.name || show.webChannel?.name || 'Not available'
  const showStatus = show.status || 'Not available'

  return (
    <article className="show-detail">
      <Link className="back-link" to="/">← Back to gallery</Link>

      <div className="detail-header">
        {show.image && show.image.medium && (
          <img
            className="detail-poster"
            src={show.image.medium}
            alt={'Poster for ' + (show.name || 'this show')}
          />
        )}
        <div>
          <h1>{show.name || 'Untitled'}</h1>
          <p className="summary">{summaryText || 'Not available'}</p>
        </div>
      </div>

      <dl className="details">
        <dt>Premiered</dt>
        <dd>{formatDate(show.premiered)}</dd>
        <dt>Last updated</dt>
        <dd>{formatDateTime(show.updated)}</dd>
        <dt>Genres</dt>
        <dd>{genres}</dd>
        <dt>Rating</dt>
        <dd>{rating}</dd>
        <dt>Status</dt>
        <dd>{showStatus}</dd>
        <dt>Network / Channel</dt>
        <dd>{network}</dd>
      </dl>

      <h2>Cast</h2>
      <CastList
        cast={cast}
        loading={castLoading}
        error={castError}
        limit={MAX_DETAIL_CAST}
        showCharacters
      />

      <p>
        <a
          className="show-link"
          href={show.url || TVMAZE_WEB_URL + show.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on TVmaze
        </a>
      </p>
    </article>
  )
}