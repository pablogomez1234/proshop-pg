import ItemDetail from './ItemDetail'
import LoadingSpiner from '../../loadingspiner/LoadingSpiner'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from 'firebase/firestore'


function ItemDetailContainer() {
 
  const { modelo } = useParams() // modelo es el id de producto
  const [item, setItem] = useState()

  useEffect(() => {
    const db = getFirestore()
    const itemsCollection = collection(db, 'calzadoList')
    getDocs(itemsCollection).then((res) => {
      const arrproducts = res.docs.map((doc) => (doc.data()))
      setItem(arrproducts.filter(elem => elem.id.toString() === modelo)[0])
    })
  }, [modelo])


  return (
    <div className='container border'>
    { modelo > 9
      ?
    (<div className='badge bg-primary'>No existe item seleccionado</div>)
      :
      !item ?
        <LoadingSpiner/>
      :
        <ItemDetail item = {item} key = {item.id} />
    }  
    </div>

  )
}

export default ItemDetailContainer