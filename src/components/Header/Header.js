import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import { FaShoppingCart } from 'react-icons/fa'
import { MdReorder,MdClear } from "react-icons/md";
import { useState } from 'react';


const logo=(
  <div className={styles.logo}>
  <Link to='/'>
    <h2>
      Apna<span>Dukan</span>
      </h2>
  </Link>
  </div>
);

const cart=(
  <span className={styles.cart}>
  <Link to='/cart'>
    Cart
    <FaShoppingCart size={20}/>
    <p>0</p>
  </Link>
</span>
);
const activeLink=(
  (({ isActive} ) => 
  isActive ? `${styles.active}` : "")
);




const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () =>{
    setShowMenu(!showMenu)
  };
  const hideMenu = () => {
    setShowMenu(false)
  };

  return (
    <header>
      <div className={styles.header}>
        {logo }
        <nav className={showMenu ? `${styles["show-nav"]}` :`${styles["hide-nav"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} 
          onClick={hideMenu}>
          </div>


          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <MdClear size={15} color="#fff"onClick={hideMenu}/>
            </li>
            <li>
              <NavLink to="/" 
              className={activeLink}>
                Home
              </NavLink>
              
            </li>
            <li>
              <NavLink to="/contact"
              className={activeLink}
              >
                Contact 
              </NavLink>
              
            </li>


          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
            </span>
            {cart}
           

         </div>
          
            </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <MdReorder size={28} onClick={toggleMenu} />
          </div>
        
     
      </div>
      
    </header>
  )
}

export default Header