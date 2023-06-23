import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Products from './views/Products/Products'
import Landing from './views/Landing/Landing'
import About from './views/About/About'
import Profile from './views/Profile/Profile'
import Login from './views/Login/Login'
import { Routes, Route, Outlet } from 'react-router-dom'
import Cart from './views/Cart/Cart'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={(
          <>
            <NavBar />
            <Outlet />
          </>
        )}>
          <Route path='/home' element={<Home />} />
          <Route path='products/:id' element={<Detail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/myprofile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </div>
  )
}



export default App

      </Routes>
    </div>
  )
}



export default App
