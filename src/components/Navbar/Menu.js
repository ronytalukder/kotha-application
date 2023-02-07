import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';
import { FaCommentDots, FaHome } from 'react-icons/fa';
import {IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import {AiFillSetting } from 'react-icons/ai';


const Menu = () => {
    const [openNav, setOpenNav] = useState(false);
    useEffect(() => {
        window.addEventListener(
            "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    }, []);
   
    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="green"
          className="p-1 font-normal"
        >

          <NavLink  to='/home' className={({ isActive }) => isActive ? 'text-secondary-headding block border-t-2 pt-2 border-secondary-headding ' : 'text-primary-headding border-none' } >

            
            <Tooltip content="home" placement="bottom">
          <Button variant="outlined" className='border-none h-auto p-0 hover:opacity-100 focus:shadow-none'>
          <FaHome className='text-4xl'></FaHome>
          </Button>
          </Tooltip>

            
          </NavLink>


        </Typography>
        <Typography
          as="li"
          variant="small"
          color="green"
          className="p-1 font-normal"
        >

          <NavLink  to='' className={({ isActive }) => isActive ? 'text-secondary-headding block border-t-2 pt-2  border-secondary-headding ' : 'text-primary-headding border-none' } >

          <Tooltip content="Messesger" placement="bottom">
          <Button variant="outlined" className='border-none h-auto p-0 hover:opacity-100 focus:shadow-none'>
          <FaCommentDots className='text-4xl' ></FaCommentDots>
          </Button>
          </Tooltip>
          </NavLink>

        </Typography>
        <Typography
          as="li"
          variant="small"
          className="p-1 font-normal"
        >
          <NavLink  to='' className={({ isActive }) => isActive ? 'text-secondary-headding block border-t-2 pt-2 border-secondary-headding ' : 'text-primary-headding border-none' } >
          <Tooltip content="Notification" placement="bottom">
          <Button variant="outlined" className='border-none h-auto p-0 hover:opacity-100 focus:shadow-none'>
          <IoMdNotifications  className='text-4xl '></IoMdNotifications>
          </Button>
          </Tooltip>
          
          </NavLink>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="green"
          className="p-1 font-normal"
          >
         <NavLink  to='' className={({ isActive }) => isActive ? 'text-secondary-headding block border-t-2 pt-2 border-secondary-headding ' : 'text-primary-headding border-none' } >
         <Tooltip content="Settings"  placement="bottom">
          <Button variant="outlined" className='border-none h-auto p-0 hover:opacity-100 focus:shadow-none'>
          <AiFillSetting className='text-4xl'></AiFillSetting>
          </Button>
          </Tooltip>
          
          </NavLink>
        </Typography>
        <Typography>
          <div className='h-20 w-20 rounded-full overflow-hidden'>
            <img src="images/profile.png" className='w-full' alt="" />
          </div>
        </Typography>
      </ul>
    );
    
    
    const auth = getAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut=()=>{

        signOut(auth).then(() => {
            dispatch(userLoginInfo(null))
            localStorage.removeItem('userInfo')
            navigate('/login')
          }).catch((error) => {
            // An error happened.
          });
    }


    return (
      <Navbar color='white' className=" rounded-none max-w-full py-2 px-4 lg:px-8 lg:py-4">
        
        
        <div className="mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <Link to='/home'><span  className='text-4xl font-bold text-primary-headding'>Kotha</span></Link>
          </Typography>
          <div className='flex items-center'>
            <div className="hidden lg:block">{navList}</div>
          <Button  onClick={handleLogOut} variant="gradient" color='green' size="sm" className="hidden  lg:inline-block ml-0 lg:ml-5">
             
            <span>Log Out</span>
          </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
          
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            <Button onClick={handleLogOut} variant="gradient" color='amber' fullWidth className="mb-2">
              <span >Log Out</span>
        
            </Button>
            
          </div>
        </MobileNav>
      </Navbar>
    );
  
};

export default Menu;