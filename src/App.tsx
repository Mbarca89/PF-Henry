import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Products from './views/Products/Products'
import Landing from './views/Landing/Landing'
import About from './views/About/About'
import Profile from './views/Profile/Profile'
import Success from './views/Success/Success'
import Login from './views/Login/Login'
import Checkout from './views/Checkout/Checkout'
import { Routes, Route, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='products/:id' element={<Detail />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/myprofile' element={<Profile />}/>
        <Route path='/success' element={<Success />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/checkout' element={<Checkout />}/>
      </Routes>
    </div>
  )
}

export default App
