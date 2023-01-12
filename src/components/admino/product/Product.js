import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../Redux/slice/productSlice'
import styles from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'

 

const Product = () => {
    const {data,isLoading}=useFetchCollection("cities")
    const [showFilter, setShowFilter] = useState(false);
    const products=useSelector(selectProducts)
    console.log(products)
  
  
    const dispatch=useDispatch()

  
    useEffect(() => {
      dispatch(
      STORE_PRODUCTS({
      products: data,
  
      }
  ));
  dispatch(
    GET_PRICE_RANGE({
      products: data,
    })
  );

     
      },[dispatch,data]);
      const toggleFilter = () => {
        setShowFilter(!showFilter);
      };
      

  return (
   
        <section>
            <div  className={`container ${styles.product}`}>
          <aside  className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }>
            <ProductFilter/>
          </aside>
          <div className={styles.content}>
            <ProductList products={products}/>
            <div className={styles.icon} onClick={toggleFilter}>
            <AiOutlineMenu size={28} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
          </div>
        </div>


        </section>
    
  )
}

export default Product
