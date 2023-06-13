
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Products, Home } from "./components"


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
