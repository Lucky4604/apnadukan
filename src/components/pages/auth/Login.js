import React from 'react'
import styles from './auth.module.scss'
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import loginImg  from '../../assets/login.jpg';
import Card from '../../card/Card';

const Login = () => {
  return ( 
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg}
         alt="Login " width={400} />
      </div>
      <Card>
   
      
      <div className={styles.form}>
        <h2 >Login</h2>
        <form>
          <input type="text" placeholder="email" required/>
          <input type="password" placeholder="password" required/>
          <button className='--btn --btn-primary --btn-block' >login</button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
          <p> -- or --</p>
          <button className='--btn --btn-danger --btn-block'><FaGoogle color='white' size={ 15} /> Login With Google</button>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      </Card>
     
    
    </section>


    )
  
};

export default Login