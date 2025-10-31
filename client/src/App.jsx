import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutesOne from './layoutes/LayoutesOne'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutesOne/>}>
          <Route index element={<Home/>}/>
      </Route>
      {/* Auth Routes */}
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
