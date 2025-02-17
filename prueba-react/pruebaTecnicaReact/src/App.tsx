import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Series from './pages/Series'
import Movies from './pages/Movies'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/series" element={<Series />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  )
}

export default App
