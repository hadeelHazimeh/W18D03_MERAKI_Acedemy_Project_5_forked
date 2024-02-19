import{createBrowserRouter} from "react-router-dom"
import ServiceProvider from "../pages/ServiceProvider"
import Login from "../pages/login"
import Register from "../pages/register"
import Packages from "../pages/Package"
export const router= createBrowserRouter(
[
   

    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"service/provider",
        element: <ServiceProvider/>
    },

    { 
        path:"/register",
        element:<Register/>
     },{
        path:"/packages",
        element:<Packages/>
    },
    

]

)