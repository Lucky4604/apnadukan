import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { selectProducts, STORE_PRODUCTS } from '../../Redux/slice/productSlice'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
 

const Product = () => {
    const {data,isLoading}=useFetchCollection("cities")
    const products=useSelector(selectProducts)
    console.log(products)
  
  
    const dispatch=useDispatch()

  
    useEffect(() => {
      dispatch(
      STORE_PRODUCTS({
      products: data,
  
      }
  ));
     
      },[dispatch,data]);
  return (
   
        <section>
            <div  className={`container ${styles.product}`}>
          <aside className={styles.filter}>
            <ProductFilter/>
          </aside>
          <div className={styles.content}>
            <ProductList products={products}/>
          </div>
        </div>


        </section>
    
  )
}

export default Product