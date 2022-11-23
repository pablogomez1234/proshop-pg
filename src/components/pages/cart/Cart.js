import { CartContext } from '../../contexts/CartContext'
import CartItem from './CartItem'

import { useContext } from "react"
import { Link } from 'react-router-dom'

function Cart() {
  
  const { carrito, cartValue, clearCart } = useContext(CartContext)

  return (
    <div className="container">
      <h2 className="">Carrito de compras</h2>
      {carrito.length === 0 
      ?
        <div>
          <p className="cart py-5">Carrito vacio</p>
          <Link className="row justify-content-center py-3 pb-5" to={`/`}>
            <button className='badge bg-primary col-2 fs-6 mx-auto'>Seguir comprando</button>
          </Link>
        </div>
      :
        <div className="row border">
          <div className='col-7 fw-bold'>Producto</div>
          <div className='col-1 fw-bold'>Precio</div>
          <div className='col-1 fw-bold'>Cantidad</div>
          <div className='col-2 fw-bold'>Total</div>
          {carrito.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className='row justify-content-right'>
            <p className='col fs-3 pt-5'>Total: $ {cartValue}</p> 
          </div>
          <div className="py-4 d-flex justify-content-center">
            <button onClick={clearCart} className="badge bg-primary fs-5 mx-auto">Vaciar carrito</button>
           </div>
           <Link className="py-4 d-flex justify-content-center" to={`/`}>
            <button className='badge bg-primary fs-5 mx-auto'>Seguir comprando</button>
          </Link>
          <Link className="py-4 d-flex justify-content-center" to={`/checkout`}>
            <button className='badge bg-primary fs-5 mx-auto'>Proceder al pago</button>
          </Link>
          </div>
       
      }
    </div>)  
}

export default Cart