import './Cart.css'
import { X } from 'react-bootstrap-icons'

import {CartContext} from '../../contexts/CartContext'
import { useContext } from "react"

function CartItem({ item }) {

  const { clearItem } = useContext(CartContext)

  const xHandle = (ev) => clearItem(ev.target.id)

  return (
    <div className='row aling-items-center'>
      <img className="px-0 col-2 miniFoto" src={item.foto} alt="foto del articulo"/>
      <div className='px-0 col-5'>{item.modelo} - {item.marca} - talle: {item.talle}</div>
      <div className='px-0 text-center col-1'>$ {item.precio}</div>
      <div className='px-0 text-center col-1'>{item.cantidad}</div>
      <div className='px-0 text-center col-1'>$ {item.cantidad * item.precio}</div>
      <div className="px-0 text-center col-1 btn" onClick={xHandle} id={item.id}><X className=''/></div>

      <hr></hr>
    </div>
  )
}

export default CartItem