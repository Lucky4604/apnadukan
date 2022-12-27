import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectUserName } from '../../Redux/slice/authSlice'
import styles from './Navbar.module.scss'

const activeLink=(
  (({ isActive} ) => 
  isActive ? `${styles.active}` : "")
);

const Navbar = () => {
  const userName=useSelector(selectUserName)
  return (
    <div className={styles.navbar}>
      <div className={styles.user} style={{background:"rgb(131,58,180)",background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}>
        <FaUserCircle size={40} color="#fff"/>
       <h4> {userName} </h4> 
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
                Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
                All Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
               Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/order" className={activeLink}>
               Order
            </NavLink>
          </li>
        </ul>
      </nav>
        
    </div>
  )
}

export default Navbar