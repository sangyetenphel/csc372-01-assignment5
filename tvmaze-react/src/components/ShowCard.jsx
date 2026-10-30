import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CastList from './CastList.jsx'
import {
  SHOWS_URL,
  TVMAZE_WEB_URL,
  MAX_CARD_CAST,
  getJson,
  stripHtml,
  formatDate,
  formatDateTime,
} from '../utils.js'

export default function ShowCard({ show }) {
  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function loadCast() {
      setCastLoading(true)
      setCastError(false)
      try {
        const data = await getJson(
          SHOWS_URL + show.id + '/cast',
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

    loadCast()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [show.id])

  const summaryText = stripHtml(show.summary)
  const genres =
    show.genres && show.genres.length > 0
      ? show.genres.join(', ')
      : 'Not available'
  const rating =
    show.rating && show.rating.average != null
      ? show.rating.average + ' / 10'
      : 'Not available'

  return (
    <article className="card">
      <div className="card-poster">
        {show.image && show.image.medium ? (
          <img
            src={show.image.medium}
            alt={'Poster for ' + (show.name || 'this show')}
          />
        ) : (
          <p className="poster-fallback">No poster available</p>
        )}
      </div>

      <div className="card-body">
        <h2>
          <Link to={`/shows/${show.id}`}>{show.name || 'Untitled'}</Link>
        </h2>

        <p className="summary">
          {summaryText
            ? summaryText.length > 220
              ? summaryText.slice(0, 220) + '...'
              : summaryText
            : 'Not available'}
        </p>

        <dl className="details">
          <dt>Premiered</dt>
          <dd>{formatDate(show.premiered)}</dd>
          <dt>Last updated</dt>
          <dd>{formatDateTime(show.updated)}</dd>
          <dt>Genres</dt>
          <dd>{genres}</dd>
          <dt>Rating</dt>
          <dd>{rating}</dd>
        </dl>

        <h3>Main cast</h3>
        <CastList
          cast={cast}
          loading={castLoading}
          error={castError}
          limit={MAX_CARD_CAST}
        />

        <a
          className="show-link"
          href={show.url || TVMAZE_WEB_URL + show.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on TVmaze
        </a>
      </div>
    </article>
  )
}