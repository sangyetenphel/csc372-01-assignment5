/*
  Presentational cast list. ShowCard passes up to 5 names;
  ShowDetail passes up to 15 names plus characters.
*/
export default function CastList({
  cast,
  loading,
  error,
  limit = 5,
  showCharacters = false,
}) {
  if (loading) {
    return (
      <ul className="cast-list">
        <li>Loading cast...</li>
      </ul>
    )
  }

  if (error) {
    return (
      <ul className="cast-list">
        <li>Cast not available</li>
      </ul>
    )
  }

  if (!cast || cast.length === 0) {
    return (
      <ul className="cast-list">
        <li>Not available</li>
      </ul>
    )
  }

  const visible = cast.slice(0, limit)

  return (
    <ul className="cast-list">
      {visible.map((member) => {
        const personId = member.person?.id ?? 'unknown'
        const characterId = member.character?.id ?? 'unknown'
        return (
          <li key={`${personId}-${characterId}`}>
            {member.person?.name || 'Not available'}
            {showCharacters && member.character?.name && (
              <> as {member.character.name}</>
            )}
          </li>
        )
      })}
    </ul>
  )
}