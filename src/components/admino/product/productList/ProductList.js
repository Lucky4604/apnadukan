import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import {BsFillGridFill} from "react-icons/bs"
import { FaListAlt } from 'react-icons/fa'
import Search from '../../../search/Search'
import ProductItems from '../ProductItems/ProductItems'
import { useDispatch, useSelector } from 'react-redux'
import {  FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from '../../../Redux/slice/filterSlice'
import Pagination from '../../../pagination/Pagination'




const ProductList = ({products}) => {
const [grid, setGrid] = useState(true)
const [search, setSearch] = useState("")
const [sort, setSort] = useState("latest")
const [currentPage, setCurrentPage] = useState(1)
const [productsPerPage] = useState(4);

const filteredProducts=useSelector(selectFilteredProducts)
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);

const dispatch=useDispatch();



useEffect(() => {
  dispatch(SORT_PRODUCTS({products,sort}))

}, [dispatch,products,sort]);

useEffect(() => {
  dispatch(FILTER_BY_SEARCH({products,search}))

}, [dispatch,products,search]);




  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icon}>
          <BsFillGridFill size={22} color="orangered"
          onClick={()=>setGrid(true)}
  
          />
           <FaListAlt size={24} color="#0066d4"
          onClick={()=>setGrid(false)}/>
          <p>
            <b>{filteredProducts.length}</b>products found
          </p>
        </div>
        <div>
         <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
         </div>
          {/* sort product*/}
          <div className={styles.sort} >
            <label>Sort by:</label>
            <select  value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="latest" >Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>

      </div>
      <div className={grid?`${styles.grid}`:`${styles.list}`}>
        {products.length===0 ?(
          <p> No Product Found</p>
          

        ):(
          <>
          {currentProducts.map((product)=>{
            return (
              <div key={product.id}>
                <ProductItems {...product} grid={grid} product={product}/>

              </div>
            )
          })}
          </>
        )
        }
        <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      productsPerPage={productsPerPage}
     totalProducts={filteredProducts.length}
      />

      </div>
      
    </div>
  )
}

export default ProductList