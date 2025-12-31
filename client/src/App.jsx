import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutesOne from './layoutes/LayoutesOne'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import RegistrationForm from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
import CategoryLists from './pages/categories/CategoryLists'
import AllProducts from './pages/categories/AllProducts'
import AddCategory from './pages/categories/AddCategory'
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutesOne/>}>
          <Route index element={<Home/>}/>
          <Route path='/all-category' element={<CategoryLists/>}/>
          <Route path='/all-products' element={<AllProducts/>}/>
          <Route path='/add-category' element={<AddCategory/>}/>
      </Route>
      {/* Auth Routes */}
      <Route path='/register' element={<RegistrationForm/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  ))
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
