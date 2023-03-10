import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Messege from "../pages/Messege/Messege";
import Registration from "../pages/registration";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Registration></Registration>
  },  
  {
    path:'/signup',
    element:<Registration></Registration>
  },  
  {
    path:'/login',
    element:<Login></Login>
  },  
  {
    path:'/forgotPassword',
    element:<ForgotPassword></ForgotPassword>
  },  
  {
    path:'/home',
    // element:<Home></Home>,
    element:<Main></Main>,
    children:[
      {
        path:'/home',
        element:<Home></Home>
    },
      {
        path:'/home/messege',
        element:<Messege></Messege>
    },
    ]
  },  
])

export default router