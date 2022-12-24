import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../Redux/slice/authSlice'


const AdminOnlyRoute = ({children}) => {
    const userEmail=useSelector(selectEmail);
    if(userEmail==="luckygovindrao182@gmail.com"){
         return children;
    }
   
        return null;

    
 
};

export default AdminOnlyRoute
