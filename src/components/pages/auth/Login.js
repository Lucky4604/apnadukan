import {React,useState} from 'react'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import loginImg  from '../../assets/login.jpg';
import Card from '../../card/Card';
import { auth } from '../../firebase/Config';
import {  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false)
  
  const navigate=useNavigate();

const loginUser = (e) => {
  e.preventDefault();
  setIsLoader(true)
  


signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {   
    const user = userCredential.user;
    setIsLoader(false)
    toast.success("Login Successful")
    navigate("/")
   
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoader(false)
  });
};
const provider = new GoogleAuthProvider();
const signInWithGoogle =()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success("Login Successfully")
    navigate("/")
    
  }).catch((error) => {
    toast.error(error.message)
   
   
  });
};

  return ( 
    <>
    {isLoader}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg}
         alt="Login " width={400} />
      </div>
      <Card >
   
      
      <div className={styles.form}>
        <h2 >Login</h2>
        <form onSubmit={loginUser}>
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
          <button className='--btn --btn-primary --btn-block' >login</button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
          <p> -- or --</p>
          <button type="submit" onClick={signInWithGoogle} className='--btn --btn-danger --btn-block'><FaGoogle color='white' size={ 15} /> Login With Google</button>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      </Card>
     
    
    </section>
    </>


    )
  
};

export default Login