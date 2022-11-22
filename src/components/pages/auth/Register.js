import {React,useState} from 'react'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.jpg'
import Card from '../../card/Card';
import { Link, Navigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/Config';
import { ToastContainer ,toast} from 'react-toastify';




const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false)
  
  const registerUser = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("password is not match");
    }
    setIsLoader(true)
   
    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    setIsLoader(false)
   
    toast.success("Registration Successful");
    Navigate("/login")
    
  })
  .catch((error) => {
    toast.error(error.message);
    setIsLoader(true);
   
  });


  };
  return (
    <>
    <ToastContainer />
   {isLoader}
    <section className={`container ${styles.auth}`}>
    <Card>
    <div className={styles.form}>
      <h2 >Login</h2>
      <form onSubmit={registerUser}>
        <input type="text"
         placeholder="email" 
         required 
         vlaue={email} 
         onChange={(e)=> setEmail(e.target.value)}
         />
        <input type="password"
         placeholder="password"
          required
           vlaue={password} 
          onChange={(e)=>setPassword(e.target.value)}
          />
        <input type="password" 
        placeholder="confirm password" 
        required
         vlaue={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <button type='submit' className='--btn --btn-primary --btn-block' >Register</button>
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
  </>
  )
}

export default Register