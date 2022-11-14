import React from 'react'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.jpg'
import Card from '../../card/Card';
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
    <Card>
    <div className={styles.form}>
      <h2 >Login</h2>
      <form>
        <input type="text" placeholder="email" required/>
        <input type="password" placeholder="password" required/>
        <input type="password" placeholder="confirm password" required/>
        <button className='--btn --btn-primary --btn-block' >Register</button>
        <span className={styles.register}>
        <p>Already an account?</p>
        <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
    </Card>
    <div className={styles.img}>
      <img src={registerImg}
       alt="Register " width={400} />
    </div>
   
  
  </section>
  )
}

export default Register