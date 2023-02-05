import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
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
])

export default router