import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
const LayoutesOne = () => {
  return (
    <>
    <div className='flex '>
      <Navbar/>
      <Outlet/>
    </div>
    </>
  )
}

export default LayoutesOne
