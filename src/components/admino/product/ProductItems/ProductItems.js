
import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../card/Card'
import styles from './ProductItem.module.scss'

const ProductItems = ({product,grid,id,name,price,desc,imageUrl}) => {

  const shortenText = (text,n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
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
      {!grid && <p className={styles.desc}>{shortenText(desc,200)}</p>}
      <button
          className="--btn --btn-danger" style={{background:"rgb(131,58,180)", background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}
         
        >
          Add To Cart
        </button>

      
    </div>
    </Card>
  )
}

export default ProductItems