import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Products from './views/Products/Products'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<Detail />}/>
        <Route path='/products' element={<Products />}/>
      </Routes>
    </div>
  )
}

export default App
