import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'

const CartContext = React.createContext()


const CartProvider = ({ children }) => {

  const [ carrito, setCarrito ] = useState([])
  const [ cartItems, setCartItems ] = useState(0) // numero de items en el carrito
  const [ cartValue, serCartValue ] = useState(0)


  useEffect(() => {
    setCartItems(carrito.reduce((acc, ele) => acc + ele.cantidad, 0, ))
    serCartValue(carrito.reduce((acc, ele) => acc + ele.cantidad * ele.precio, 0, ))
  }, [ carrito ])


  const clearCart = () => {
    carrito.map ( ele => clearItem(ele.id))
    setCarrito([])
  }


  const clearItem = (id) => {
    let itemTienda = {}

    // traigo item carrito {}
    const itemCarrito = carrito.filter(elem => elem.id === id)[0]

    // traigo item de calzadoList
    const db = getFirestore()
    const itemsCollection = collection(db, 'calzadoList')
    getDocs(itemsCollection).then((res) => {
      const arrproducts = res.docs.map((doc) => (doc.data()))
      itemTienda = arrproducts.filter(elem => elem.id === itemCarrito.idProducto)[0]
      
      // actualizo FIRESTORE
      itemCarrito.color === 0 ?
        itemTienda.stock[itemCarrito.talleId].stock += itemCarrito.cantidad
      :
        itemTienda.stock[itemCarrito.talleId].stock2 += itemCarrito.cantidad

      const docRef = doc(db, "calzadoList", itemCarrito.idProducto.toString())
      setDoc(docRef, itemTienda, { merge:true })
     
    })

  setCarrito(carrito.filter((item) => item.id !== id))  
    
  }

  
  const isInCart = (id) => carrito.find((item) => item.id === id) ? true : false

  
  const addItem = (item) => {
    const indexItem = `${item.id}-${item.color}-${item.talle}` // talle == item.stock[item.talle].talle  
    if (isInCart(indexItem)) {
      setCarrito( carrito.map((ele) => 
        ele.id === indexItem ? {...ele, cantidad: ele.cantidad + item.cantidad } : ele 
      ))
    } else {
      setCarrito([...carrito, {"id": indexItem,
                                "idProducto": item.id,
                                "marca": item.marca,
                                "modelo": item.modelo,
                                "foto": item.foto,
                                "precio": item.precio,
                                "color": item.color,
                                "talle": item.talle,
                                "talleId": item.talleId,
                                "cantidad": item.cantidad}])
    }
  }
  
  return (
    <CartContext.Provider  value={{carrito, addItem, cartItems, clearCart, clearItem, cartValue}}>
      {children}
    </CartContext.Provider>
  )
} 

export { CartContext, CartProvider }