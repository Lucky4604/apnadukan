import React, { useEffect } from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import {  FaUserCircle ,FaShoppingCart,FaTimes} from 'react-icons/fa'
import { MdReorder,MdClear } from "react-icons/md";
import { useState } from 'react';
import { auth } from '../firebase/Config';
import { onAuthStateChanged, signOut} from "firebase/auth";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../Redux/slice/authSlice';
import ShowOnLogin,  { ShowOnLogout } from '../hiden/Hiden';
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';





const logo=(
  <div className={styles.logo}>
  <Link to='/'>
    <h2>
      Apna<span>Dukan</span>
      </h2>
  </Link>
  </div>
);


const activeLink=(
  (({ isActive} ) => 
  isActive ? `${styles.active}` : "")
);




const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState("")
 
  const navigate=useNavigate();

  const dispatch=useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user)
       
        //const uid = user.uid;
        //console.log(user.displayName);
        if(user.displayName==null){
          const u1=user.email.substring(0,user.email.indexOf('@'));
          const u2=u1.charAt(0).toUpperCase()+u1.slice(1);
          setDisplayName(u2);
        }else{
          setDisplayName(user.displayName);
        }
        
        dispatch(SET_ACTIVE_USER({
          email:user.email,
          userName: user.displayName?user.displayName : displayName,
          userId:user.uid
        
        }));  
      } else{
        dispatch(REMOVE_ACTIVE_USER());
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
  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
       <p> 0</p>
      </Link>
    </span>
  );

  return (
    <header >
      <div className={styles.header}  >
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
              <AdminOnlyLink>
                <Link to="/admin/home">
             
              <button className='--btn --btn-primary'> Admin</button>
              </Link>
              </AdminOnlyLink>
             
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
              <ShowOnLogout>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <a href='#'><FaUserCircle size={16} /> Hi, {displayName}</a>
              </ShowOnLogin>
              <ShowOnLogin>
              <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
              <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
            </span>
            { cart}
            
           

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