/* Footer component displaying TVmaze attribution (CC BY-SA). */
export default function Footer() {
  return (
    <footer>
      <p>
        Data from{' '}
        <a
          href="https://www.tvmaze.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TVmaze
        </a>{' '}
        · Licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-SA
        </a>
      </p>
    </footer>
  )
}