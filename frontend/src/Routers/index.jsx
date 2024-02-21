import{createBrowserRouter} from "react-router-dom"
import ServiceProvider from "../pages/ServiceProvider"
import Login from "../pages/login"
import Register from "../pages/register"
import Home from "../pages/Home"


import Packages from "../pages/Package"


import CreateService from "../pages/CreateService"
import Client from "../pages/client"
import AdminDashboard from "../pages/AdminDashbored"
import PendingServices from "../pages/PendingServices"
// import Service from "../pages/Service/Service"
import PortFolio from "../pages/PortFolio"
import Talk from "../pages/LetsTalk"
import About from "../pages/About"
import Navbar from "../components/Navbar"
export const router= createBrowserRouter(
[
   {
      path:"/",
      element:<>  <Navbar/>
      <Home/> </>
     
     
   },
 

   {
      path:"/login",
      element:<Login/>,
       
  },
    {
        path:"service/provider",
        element: <ServiceProvider/>
    },
    {
      path:"/portfolio",
      element: 
      <> <Navbar/>
      <PortFolio/>
      </>
  },
  {
   path:"/letstalk",
   element:<> <Navbar/>
   <Talk/>
   </> 
},
{
   path:"/AboutUs",
   element: <> <Navbar/>
   <About/>
   </>
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
        path:"client",
        element:<>
        <Navbar/>
        <Client/>
        </>

     },
    
     {
      path:"/admin/dashboard",
      element:<AdminDashboard/>,
      children:[
         {
            path:"pending/Services",
            element:<PendingServices/>
         },{
            path:"packages",
            element:<Packages/>
        },
      ]
   },

    

]

)