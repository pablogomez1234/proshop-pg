import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState, useContext } from "react"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CartContext } from '../../contexts/CartContext'

function CheckoutForm() {

  const { carrito, cartValue, clearCart } = useContext(CartContext)
  const[ form, setForm ] = useState([])
  const [ orderId, setOrderId ] = useState()
 
  const orden = { form, carrito, cartValue }
 
  const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  }

  
  const submitHandler = (ev) => {
    ev.preventDefault()

    if ( form.name && form.email && form.email === form.email2 ) {

      // Guardo orden de compra en FIRESTONE
      const db = getFirestore()
      const orderCollection = collection(db, 'ordenes')
      addDoc(orderCollection, {orden, time: serverTimestamp()}).then((res) => {
        setOrderId(res.id)
      })

      clearCart()

    } else {
      !form.name && toast.error('No ha ingresado un nombre', toastConfig)
      !form.email && toast.error('Debe ingresar un email', toastConfig)
      form.email !== form.email2 && toast.error('Los email deben coincidir', toastConfig)
    }

  }

  const changeHandler = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value })
  }

 
  
  return (
    <div className='container'>
      { orderId ? (
        <div className='row justify-content-center'>
          <h3 className='my-5'>Gracias por su compra, le enviaremos el pedido en los próximos 5 días</h3>
          <h5 className=''>Para hacer seguimiento del mismo puede usar su número de orden, id:</h5>
          <p className='badge col-5 fs-2 bg-primary'>{orderId}</p>
        </div>
      ):(
        <div className='row justify-content-center'>
          
          <form className="col-6 form" onSubmit={submitHandler}>
            <div className='py-3'>
              <label htmlFor="name" className="">Nombre</label>
              <input className="form-control" name="name" id="name" value={form.name} onChange={changeHandler}/>
            </div>
            <div className='py-3'>
              <label htmlFor="email" className="">Email</label>
              <input className="form-control" type="email" name="email" id="email" value={form.email} onChange={changeHandler}/>
            </div>
            <div className='py-3'>
              <label htmlFor="email" className="">Repita Email</label>
              <input className="form-control" type="email" name="email2" id="email2" value={form.email2} onChange={changeHandler}/>
            </div>
            <div className="justify-content-center">
              <button className="badge bg-primary fs-6 mx-auto">Finalizar compra</button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default CheckoutForm