import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import { router } from './Routers';

// import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import Login from './pages/login'
import ServiceProvider from './pages/ServiceProvider';
function App() {
  return <RouterProvider router={router}/>
}

export default App
