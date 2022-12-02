import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import OnlineCompiler from './components/pages/contactus/OnlineCompiler'
import Home from './components/pages/home/Home'
import Reset from './components/pages/auth/Reset'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <> 
    <BrowserRouter>
    <ToastContainer />
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/onecompiler' element={< OnlineCompiler/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/reset' element={<Reset/>}/>

        
         </Routes>

    <Footer/>
    
    </BrowserRouter>
      
    </>
  )
}

export default App