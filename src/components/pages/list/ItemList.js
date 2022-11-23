import Item from './Item'

import { Link } from 'react-router-dom'


const ItemList = ({item}) => {

  
  return (
    <div className=''>
      <Link className="" to={`/calzado/${item.genero}/${item.id}`}>
        <Item ele={item} key={item.id}/>
      </Link>        
    </div>
  )
}

export default ItemList