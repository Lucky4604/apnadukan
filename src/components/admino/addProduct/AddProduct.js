import { ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import Card from '../../card/Card'
import { storage } from '../../firebase/Config';
import styles from './AddProduct.module.scss'

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name :" ",
    imageUrl:" ",
    price: 0,
    category: " ",
    brand: " ",
    description: " ",
  })
  const handleChangeInput=(e)=>{
    const {name,value}=e.target
      setProduct({...product, [name]:value})
   
    
  }; 
  const handleChangeImage=(e)=>{
    const file=e.target.files[0];
   // console.log(file)
   const storageRef = ref(storage, `apnaDukan/${Date.now()}${file.name}`);
   const uploadTask = uploadBytesResumable(storageRef, file);
 
  }
  const addProduct=(e)=>{
    e.preventDefault();
    console.log(product)
  }
  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.Card}>
        <form onSubmit={addProduct} >
        <label>Product Name:</label>
        <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleChangeInput(e)}
            />
           <label>Product Image:</label>
           <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} styles={{width: "50%"}}>
                
                Uploading 50%
              </div>
            </div>
            <input type="file" accept="image/*"
            placeholder="Product Image" name="image"
            onChange={(e)=>handleChangeImage(e)}
            />
            <input type="text"
             //required
             placeholder='Image Url' 
             name='imageUrl' value={product.imageUrl} disabled/>

           </Card>
           <label>Product Price:</label>
        <input type="number"
         placeholder="Product Price" 
         required
          name="price"
          value={product.price}
           onChange={(e)=>handleChangeInput(e)}
           />
           <label>Product Category:</label>
           <select
               required
               name="category"
               value={product.category}
               onChange={(e)=>handleChangeInput(e)}
               >
                <option value="" disabled>
                  --choose product category--
                </option>
                {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}

           </select>
           <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleChangeInput(e)}
            />

            <label>Product Description</label>
            <textarea
             required
              name="desc"
              value={product.desc}
              onChange={(e) => handleChangeInput(e)}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">
              Submit
            </button>
           </form>
      </Card>
    </div>
  )
}

export default AddProduct