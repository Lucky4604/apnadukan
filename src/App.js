import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Contact from './components/pages/contactus/Contact'
import Home from './components/pages/home/Home'




const App = () => {
  return (
    <> 
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact />}/>

        
         </Routes>

    <Footer/>
    
    </BrowserRouter>
      
    </>
  )
}

export default App