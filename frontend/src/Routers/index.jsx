import{createBrowserRouter} from "react-router-dom"
import ServiceProvider from "../pages/ServiceProvider"
import Login from "../pages/login"
import Register from "../pages/register"
import Home from "../pages/Home"


import Packages from "../pages/Package"


import CreateService from "../pages/CreateService"


export const router= createBrowserRouter(
[
   

    {
        path:"/login",
        element:<Login/>,
         
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

 {
        path: "/service/provider/create",
        element: <CreateService/>


     },
     {
        path:"/",
        element:<Home/>
     }

    

]

)