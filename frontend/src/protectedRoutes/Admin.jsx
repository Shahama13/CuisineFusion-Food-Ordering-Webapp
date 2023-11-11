import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loader from '../components/Loader';

const Admin = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    if(user?.role !== "admin" || !isAuthenticated){
        return <Loader/>
    }
    else{
        return <Outlet/>
    }
}

export default Admin