import { useContext } from "react"

import './CartWidget.css'
import { Bag } from 'react-bootstrap-icons'
import { CartContext } from '../contexts/CartContext'

const CartWidget = () => {

  const { cartItems } = useContext(CartContext)

  return (
    <div className="widget">
      <div className="">
        <Bag className="bag"/>
      </div>
      { cartItems === 0
       ?
        <div></div>
       :
        <div className="number">
          {cartItems}
        </div>}
    </div>
  )
}

export default CartWidget