import { Routes, Route, Link } from 'react-router-dom'
import Gallery from './components/Gallery.jsx'
import ShowDetail from './components/ShowDetail.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <h1>
          <Link to="/">TVmaze Show Gallery</Link>
        </h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}