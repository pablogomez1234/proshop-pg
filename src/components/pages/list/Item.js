import './Item.css'

const Item = ({ ele }) => {

  return (
    <div className="container itemCard">
      <div className="itemFoto row">
        <img className="fotoPrincipal" src={ele.colores[0]} alt='foto principal del zapato'/>
      </div>
      <div className="row">
        {ele.colores.map((color, index) => (
          <img className="itemColores border m-1 col-3" src={color} key={index} alt='opciones de colores de zapato'/>
        ))}
      </div>
      <div className="itemmarca text-uppercase fw-bold row">{ele.marca}</div>
      <div className="itemmodelo text-start text-uppercase fw-light row">{ele.modelo}</div>
      <div className="itemPrecio fw-bold row">$ {ele.precio}</div>
    </div>
  )
}

export default Item