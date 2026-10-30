import ShowCard from './ShowCard.jsx'

/* Renders the search results with a stable key per show. */
export default function ShowList({ shows }) {
  return (
    <section className="gallery">
      {shows.map((result) => (
        <ShowCard key={result.show.id} show={result.show} />
      ))}
    </section>
  )
}