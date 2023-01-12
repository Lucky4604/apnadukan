
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../../card/Card'
import { ADD_TO_CART } from '../../../Redux/slice/cartSlice'
import styles from './ProductItem.module.scss'


const ProductItems = ({product,grid,id,name,price,desc,imageUrl}) => {
  const dispatch=useDispatch()

  const shortenText = (text,n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const addToCart=(product)=>{
    dispatch(ADD_TO_CART(product))


  };

  return (
    <Card cardClass={grid?`${styles.grid}`:`${styles.list}`}>
      <Link to= {`/product-details/${id}`}>
    <div className={styles.img}>
      <img src={imageUrl} alt={name}></img>

    </div>
    </Link>
    <div className={styles.content}>
      <div className={styles.details}>
        <p>{`${price}₹`}</p>
        <h4>{shortenText(name,18)}</h4>
      </div>
      {!grid && <p className={styles.desc}>{shortenText(desc,100)}</p>}
      <button
          className="--btn --btn-danger" style={{background:"rgb(131,58,180)", background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}
         onClick={()=>addToCart(product)}
        >
          Add To Cart
        </button>

      
    </div>
    </Card>
  )
}

export default ProductItems