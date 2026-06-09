// Root component — sets up client-side routing with React Router.
// Nav and Footer are rendered outside <Routes> so they appear on every page.
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Locations from './pages/Locations'
import BrandWithUs from './pages/BrandWithUs'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/brand-with-us" element={<BrandWithUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
