import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Contact from './components/pages/contactus/Contact'
import Home from './components/pages/home/Home'
import Reset from './components/pages/auth/Reset'
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Admin from './components/pages/admin/Admin'
import AdminOnlyRoute, { AdminOnlyLink } from './components/adminOnlyRoute/AdminOnlyRoute'
import ProductDetails from './components/admino/product/productDetails/ProductDetails'

const App = () => {
  return (
    <> 
    <BrowserRouter>
    <ToastContainer />
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={< Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/reset' element={<Reset/>}/>

        <Route path='/admin/*'
         element={<AdminOnlyRoute>
          <Admin/>
          </AdminOnlyRoute>
        }
        />
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
        
         </Routes>

    <Footer/>
    
    </BrowserRouter>
      
    </>
  )
}

export default App