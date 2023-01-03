import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../admino/addProduct/AddProduct'
import Navbar from '../../admino/navbar/Navbar'
import Order from '../../admino/order/Order'
import OrderDetails from '../../admino/orderDetails/OrderDetails'
import ViewProduct from '../../admino/viewProduct/ViewProduct'
import Home from '../home/Home'
import './Admin.module.scss'
import styles from './Admin.module.scss'





const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
        </div>
        <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home/>}/>
          <Route path="all-products" element={<ViewProduct/>}/>
          <Route path="add-product/:id" element={<AddProduct/>}/>
          <Route path="order" element={<Order/>}/>
          <Route path="order-details" element={<OrderDetails/>}/>
        
        </Routes>
      </div>
    </div>
  )
}

export default Admin