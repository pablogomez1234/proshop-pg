import './App.css'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './components/nav/NavBar'
import Home from './components/routes/Home'
import ItemListContainer from './components/pages/list/ItemListContainer'
import ItemDetailContainer from './components/pages/detail/ItemDetailContainer'
import Cart from './components/pages/cart/Cart'
import CheckoutForm from './components/pages/checkout/CheckoutForm'
import Footer from './components/footer/Footer'

import { CartProvider } from './components/contexts/CartContext'


function App() {

  return (
    <BrowserRouter>
      <CartProvider>
      <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/calzado' element={<ItemListContainer />} /> 
          <Route exact path='/calzado/:tipoCalzado' element={<ItemListContainer />} />
          <Route exact path='/calzado/:tipoCalzado/:modelo' element={<ItemDetailContainer />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/checkout' element={<CheckoutForm />} />
        </Routes>
      </CartProvider>
      <Footer/>
    </BrowserRouter>    
  )
}

export default App;
