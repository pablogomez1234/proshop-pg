import './ItemDetail.css'
import ItemCount from "./ItemCount"
import { CartContext } from '../../contexts/CartContext'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { getFirestore, doc, setDoc } from 'firebase/firestore'


const ItemDetail = ({ item }) => {

  const { addItem } = useContext(CartContext)
  const [ color, setColor ] = useState(0) // 0 o 1
  const [ talleSelected, setTalleSelected ] = useState() // talle 0 a 5
  const [ stock, setStock ] = useState([]) // vector con stock del color elegido

  const toastConfig = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }

  useEffect(() => {
    setStock(item.stock.map((ele) => 
      color === 0 ? ele.stock : ele.stock2
    ))
  }, [color, item.stock])
  
  
  const itemStock = (item, cantidad, talleSelected) => { // reviso si hay stock y actualizo stock FIRESOTRE
    let resp = false
    let stockSel
    color === 0 ? stockSel = item.stock[talleSelected].stock
                  : stockSel = item.stock[talleSelected].stock2

    if ( cantidad <= stockSel) {
      resp = true    
      color === 0 ? item.stock[talleSelected].stock -= cantidad
                  : item.stock[talleSelected].stock2 -= cantidad      
      
      // Actualizo stock en Firesotre
      const db = getFirestore()
      const docRef = doc(db, "calzadoList", item.id.toString())
      setDoc(docRef, item, { merge:true })

    }
    return resp
  }
  

  const addCarrito = (cantidad) => { // agrego item al carrito
      if (talleSelected > -1 & cantidad > 0) {
        if ( itemStock(item, cantidad, talleSelected)) {
           addItem({"id": item.id,
                    "marca": item.marca,
                    "modelo": item.modelo,
                    "foto": item.colores[color],
                    "precio": item.precio,
                    "color": color, // 0 o 1
                    "talle": item.stock[talleSelected].talle,
                    "talleId": talleSelected,
                    "cantidad": cantidad})
            cantidad > 1 ?  toast.info(`Se agregaron ${cantidad} artículos al carrito`, toastConfig)
              : toast.info(`Se agregó un artículo al carrito`, toastConfig)
            
          } else {
            toast.error('No hay suficiente stock del artículo seleccionado', toastConfig)
          }
      } else {
        toast.error('Debe seleccionar talle e indicar cantidad', toastConfig)
      }                   
  }
   

  const colorHandle = (ev) => { // seleccion color de zapato
    setColor(parseInt(ev.target.id))
    setTalleSelected()
  }
  
  const talleHandle = (ev) => { // seleccion talle zapato
    setTalleSelected(parseInt(ev.target.id))
  }
  

  return (
    <div className=''>
    
      <div className='row row-cols-1 row-cols-xl-2'>       
        
        <div className='col'>
          <img className="img-fluid" src={item.colores[color]} alt='foto principal del zapato'/>
        </div>
        
        <div className='col detalles'>
          
          <div className='row fs-1 text-uppercase fw-bold'>{item.marca}</div>
          <div className='row text-uppercase fw-bold'>{item.modelo}</div>
          <div className='row fs-2 fw-bold'>${item.precio}</div>
          
          <hr></hr>
          
          <div className='row'>
            {item.colores.map((color, index) => (
              <img id={index} className="itemColores border m-1 col-2" src={color} key={index} onClick={colorHandle} alt='opciones de colores de zapato'/>
            ))}
          </div>
          
          <div className='row mx-auto'>
            {item.stock.map((stk, index) => (
              <div id={index} className={`btn ${index === talleSelected ?
                                                         "btn-success" :
                                                         "btn-primary"} 
                    badge text-center m-2 col-1 ${stock[index] === 0 ?
                                                 "disabled" :
                                                 ""}`}
                    key={index} onClick={talleHandle}>
                {stk.talle}
              </div>
            ))}
          </div>
          
          <hr></hr>
          
          <div className='container text-center contenedorCantidadDeArticulo'> 
            <ItemCount onAdd = {addCarrito}/>
            <Link className="row justify-content-center py-1" to={`/cart`}>
              <button className='badge col-7 fs-6 bg-success mx-auto btnPagar'>Pagar</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ItemDetail