import{createBrowserRouter} from "react-router-dom"
import ServiceProvider from "../pages/ServiceProvider"
import Login from "../pages/login"
import Register from "../pages/register"

import CreateService from "../pages/CreateService"
import Client from "../pages/client"

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

        element:<Register />
     },
     {
        path: "/service/provider/create",
        element: <CreateService/>

     },
     {
        path:"client",
        element:<Client/>

     }
     
    

]

)