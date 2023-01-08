import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './ViewProduct.module.scss'
import { db, storage } from '../../firebase/Config';
import { collection, deleteDoc, doc, onSnapshot,orderBy,query } from "firebase/firestore";
import { Link } from 'react-router-dom';
import {FaEdit,FaTrashAlt} from 'react-icons/fa'
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from "notiflix"
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../Redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';








const ViewProduct = () => {
  const {data,isLoading}=useFetchCollection("cities")
  const products=useSelector(selectProducts)


  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(
    STORE_PRODUCTS({
    products: data,

    }
));
   
    },[dispatch,data]);
  



  
  const deleteProduct =async(id,imageUrl)=>{
      try{
        await deleteDoc(doc(db, "cities", id));
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef)
        toast.success("Product Deleted Successfully")

      }catch(error){
        toast.error(error.message)
      }
  };


  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
        cssAnimationStyle: "zoom",
      }
    );
  };

  
  return (
    <>
    {isLoading}
    <div className={styles.table}>
       <h2 > All Products</h2>
       {products.length===0 ?(
          <p> No Product Found</p>
       ):(
          <table>
            <thead style={{background:"rgb(131,58,180)", background:"linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"}}>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
            {products.map((product,index)=>{
              const{id,name,price,imageUrl,category}=product;
              return (
                <tbody>
                  <tr key={id}>
                    <td>
                      {index +1}
                    </td>
                    <td>
                      <img src={imageUrl} alt={name} style={{width: "100px"}}></img>
                    </td>
                    <td>
                      {name}
                    </td>
                    <td>
                      {category}
                    </td>
                    <td>
                      {`${price}₹`}
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green"/>
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" onClick={()=> confirmDelete(id,imageUrl)} />
                    </td>

                  </tr>
                  </tbody>

              )
            })}
          </table>
       )

      }
    </div>
    </>
  )
}

export default ViewProduct
