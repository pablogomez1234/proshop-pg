import './NavBar.css'

import { NavLink, Link } from 'react-router-dom'

import CartWidget from './CartWidget'
import logo from './logo.png'


const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}><img src={logo} alt="logo" width={80}/></Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
              <li className="nav-item fw-bold px-5 mx-2 fs-3">
                <NavLink className="nav-link"  to={'/calzado/mujer'}>Mujer</NavLink>
              </li>
              <li className="nav-item fw-bold px-5 mx-2 fs-3">
                <NavLink className="nav-link" to={'/calzado/hombre'}>Hombre</NavLink>
              </li>
              <li className="nav-item fw-bold px-5 mx-2 fs-3">
                <NavLink className="nav-link" to={'/calzado/nino'}>Niños</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Link className="" to={`/cart`}>
          <CartWidget/>
        </Link>   
      </nav>
    </div>
  )
}

export default NavBar
