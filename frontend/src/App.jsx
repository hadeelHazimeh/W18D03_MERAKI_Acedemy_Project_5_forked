import { RouterProvider } from 'react-router-dom';
import { router } from './Routers';
// import './App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
function App() {
  return <>
  <RouterProvider router={router}/>
 

  </>

}

export default App
