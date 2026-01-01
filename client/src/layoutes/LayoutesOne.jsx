import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Bradcumb from '../components/Bradcumb'
const LayoutesOne = () => {
  return (
    <>
    <div className='w-full flex '>
        <Navbar />
        <div className='w-full flex flex-col'>
        <Bradcumb/>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default LayoutesOne
