import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { db } from '../../../firebase/Config';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../Redux/slice/cartSlice';
import styles from './ProductDetails.module.scss'




const ProductDetails = () => {
  const {id}=useParams()

  const [product, setProduct] = useState(null)
  const dispatch=useDispatch(); 
  const cartItems=useSelector(selectCartItems)

  const cart=cartItems.find((cart)=>cart.id === id);
  const isCartAdded=cartItems.findIndex((cart)=>{
    return cart.id===id
  })

  useEffect(() => {
    getProduct()
  
    
  }, [])

  const addToCart=(product)=>{
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())

  }
  const decreaseCart=()=>{
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())

  }


  const getProduct=async()=>{
    const docRef = doc(db, "cities", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());
  const obj={
    id:id,
    ...docSnap.data()
  }
  setProduct(obj)
} else {
 toast.error('No Product Found')
}

  };



  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products" style={{background:"rgb(131,58,180)", background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",color:"white "}}>&larr; Back To Products</Link>
        </div>
       {product === null ? (
          <img src={""} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
           <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`${product.price}₹`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}
                >
                  {isCartAdded <0 ?null :(
                    <>
                     <button className="--btn"
                  onClick={()=>decreaseCart(product)} >
                    -
                    </button>
                  <p>
                    <b>{cart.cartQuantity}</b>
                  </p>
                  <button className='--btn'
                   onClick={()=>addToCart(product)}>
                    +
                    </button>
                    </>
                  )}
                 
          
                </div>
                <button className='--btn --btn-danger' style={{background:"rgb(131,58,180)", background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}
                onClick={()=>addToCart(product)}
                >ADD TO CART</button>
                </div>
              </div>
          
          </>
          
        
        )}
        
              
      </div>
    </section>
  )
}




export default ProductDetails