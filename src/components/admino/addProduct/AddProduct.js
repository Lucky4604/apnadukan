import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../card/Card'
import { db, storage } from '../../firebase/Config';
import { selectProducts } from '../../Redux/slice/productSlice';
import styles from './AddProduct.module.scss'




const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];
const initialState={
  name :"",
  imageUrl:"",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}



const AddProduct = () => {
  const {id}=useParams();
  const products=useSelector(selectProducts)
 const productEdit=products.find((item)=>item.id===id)
 console.log(productEdit)
  
  const [product, setProduct] = useState(()=>{
    const newState=detectForm(id,
      {...initialState},
      productEdit
      )
      return newState
  });

  const [uploadProgress, setUploadProgress] = useState(0)
  const navigate=useNavigate();
  


  function detectForm(id,f1,f2){
    if(id==="ADD"){
      return f1;
    }else{
      return f2;
    }
  }


  const handleChangeInput=(e)=>{
    const {name,value}=e.target
      setProduct({...product, [name]:value})
   
    
  }; 
  const handleChangeImage=(e)=>{
    const file=e.target.files[0];
   // console.log(file)
   const storageRef = ref(storage, `apnaDukan/${Date.now()}${file.name}`);
   const uploadTask = uploadBytesResumable(storageRef, file);
 


   uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)
   
  }, 
  (error) => {
    toast.error(error.message)
  }, 
  () => {
 
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product,imageUrl:downloadURL})
      toast.success("Image Uploaded Successfully")
    });
  }
);
  }
  const addProduct=(e)=>{
    e.preventDefault();
    console.log(product)
    try{
      const docRef =  addDoc(collection(db, "cities"), {
        name: product.name,
        imageUrl:product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt:Timestamp.now().toDate()
       
      });
      toast.success("Product Uploaded Successfully")
      

    }catch(error){
      toast.error(error.message)

    }
  }
  const editProduct=(e)=>{
    e.preventDefault();
    if(product.imageUrl!==productEdit.imageUrl){
      const storageRef = ref(storage, productEdit.imageUrl);
     deleteObject(storageRef)


    }

    try{
       setDoc(doc(db, "cities", id), {
        name: product.name,
        imageUrl:product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt:productEdit.createdAt,
        editedAt:Timestamp.now().toDate()
        
      });
      toast.success("Product Edited Succesfully")
     
      navigate("/admin/all-products")

    }catch(error){
      toast.error(error.message)
    }
  }
  
  return (
    <div className={styles.product}>
      <h2>{detectForm(id,"Add New Product","Edit product")}</h2>
      <Card cardClass={styles.Card}>
        <form onSubmit={detectForm(id,addProduct,editProduct)} >
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
           {uploadProgress===0? null :(
            <div className={styles.progress}>
            <div className={styles["progress-bar"]} styles={{width: `${uploadProgress}%`}}>
             {uploadProgress <100 ? `Uploading ${uploadProgress}`: `Upload Complete ${uploadProgress}%`}
            </div>
          </div>
          
          )}
          
            
            <input type="file" accept="image/*"
            placeholder="Product Image" name="image"
            onChange={(e)=>handleChangeImage(e)}
            />
            {product.imageUrl===""? null :(
               <input type="text"
               //required
               placeholder='Image Url' 
               name='imageUrl' value={product.imageUrl} disabled/>
            
            )}
           

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
              {detectForm(id,"Save Product","Edit Product")}
            </button>
           </form>
      </Card>
    </div>
  )
}

export default AddProduct