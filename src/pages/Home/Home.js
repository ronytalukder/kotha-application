import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo)
    console.log(data)
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!data){
         navigate('/login')
        }
    },[])

    return (
        <div>
            <h1>This is home page</h1>
        </div>
    );
};

export default Home;