import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/body/Welcome';

import Headers from './components/Headers';
import Authentication from './components/body/Authentication';
import Response from './components/body/Response';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider} from 'react-router-dom'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Headers/>}>
        <Route index element={<Welcome/>}/>
        <Route path='authentication' element={<Authentication/>}/>
        <Route path='response' element={<Response/>}/>
      </Route>
    )
  );
  return (
   <RouterProvider router={router}/>
  )
}

export default App
