import React, { useEffect } from 'react'
import Product from '../../admino/product/Product'
import AdminOnlyRoute from '../../adminOnlyRoute/AdminOnlyRoute'
import Slider from '../../slider/Slider'
import styles from './Home.module.scss'

const Home = () => {
  const url=window.location.href;

  const scrollToProducts=()=>{
    if(url.includes("#products")){
        window.scrollTo({
          behavior:'smooth',
          top:700

        }

        )
        return
    }
  };
  useEffect(() => {
    scrollToProducts();
  
   
  }, [])
  
  return (
    <div>
    
      {/*<Slider/>*/}
       <Product/>
       
       </div>
       
  )
}

export default Home