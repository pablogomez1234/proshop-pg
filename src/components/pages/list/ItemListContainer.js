import ItemList from "./ItemList"
import LoadingSpiner from '../../loadingspiner/LoadingSpiner'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'


const ItemListContainer = () => {

  const { tipoCalzado } = useParams()
  const [ calzado, setCalzado ] = useState([])
  
  useEffect(() => {
    const db = getFirestore()
    const itemsCollection = collection(db, 'calzadoList')
   
    if (tipoCalzado) { 
      // Filtrado por tipo de calzado (mujer, hombre o nino)
      const itemFilter = query(itemsCollection, where("genero", "==", tipoCalzado))
      getDocs(itemFilter).then((res) => 
        setCalzado(res.docs.map((item => 
          (item.data())))))
    } else {
      // Muestro todos los items
      getDocs(itemsCollection).then((res) => 
        setCalzado(res.docs.map((item => 
          (item.data())))))
    }

  }, [tipoCalzado])

  return (
    <div className="container">
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
      {calzado.length === 0 
      ?
        <LoadingSpiner/>
      : calzado.map((ele, index) => (       
            <div className='col'>
              <ItemList item={ ele } key={ index } />
           </div> 
        ))}
      </div>   
    </div>
  )
}

export default ItemListContainer