import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import  Menu  from '../components/Navbar/Menu';

const Main = () => {

    const data = useSelector(state => state.userLoginInfo.userInfo)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!data){
         navigate('/login')
        }
    },[])

    return (
        <div>
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;