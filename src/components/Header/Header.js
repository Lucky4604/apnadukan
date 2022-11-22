import React, { useEffect } from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { MdReorder,MdClear } from "react-icons/md";
import { useState } from 'react';
import { auth } from '../firebase/Config';
import { onAuthStateChanged, signOut} from "firebase/auth";
import { toast } from 'react-toastify';

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
  const [displayName, setDisplayName] = useState("")
  const navigate=useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;
        console.log(user.displayName);
        setDisplayName(user.displayName);
        
      } else {
        setDisplayName("");
        
      }
    });
  
    
  }, [])
  

  const toggleMenu = () =>{
    setShowMenu(!showMenu)
  };
  const logoutUser=()=>{
    signOut(auth).then(() => {
      toast.success("Logout Successful")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });

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
              <a href='#'><FaUserCircle size={16} /> Hi, {displayName}</a>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
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