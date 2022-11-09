import React from 'react'
import { Link } from 'react-router-dom'
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
              <Link to="/">
                Home
              </Link>
              
            </li>
            <li>
              <Link to="/contact">
                Contact 
              </Link>
              
            </li>


          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/order-history">My Orders</Link>
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