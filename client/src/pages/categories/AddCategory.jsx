
import React, { useRef, useState } from 'react'
import { LuImageUpscale } from "react-icons/lu";
import getToastMsg from '../../helpers/toastMsg';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const AddCategory = () => {
  let decodedToken = useSelector(state=>state.user.userToken)
  let token = useSelector(state=>state.user.userToken)
  const navigate = useNavigate()
  if(decodedToken){
    decodedToken = jwtDecode(decodedToken)
  }
  const [image,setImage]=useState('')
  const [imageBackend,setBackendImage]=useState('')
  const [inputData, setInputData]=useState()
  const [isLoading,setLoading]=useState(false)
const currentImg = useRef()

  // handleImgOpen
  const handleDrop=(e)=>{
    e.preventDefault();
    const file = e.dataTransfer.files[0]
    setBackendImage(file)
    const url = URL.createObjectURL(file)
    setImage(url)
  }
  // handleChange 
  const handleChange =(e)=>{
    e.preventDefault()
    const file = e.target.files[0]
    setBackendImage(file)
    const url = URL.createObjectURL(file)
    setImage(url)
  }
  // handleDragOver
  const handleDragOver=(e)=>e.preventDefault()
  
  // handleSubmit function 
  const handleSubmit=async(e)=>{
    setLoading(true)
    const form_data = new FormData()
    form_data.append("categoryImage",imageBackend)
    form_data.append("categoryName",inputData)
    form_data.append("createdBy",decodedToken.userId)
    e.preventDefault()
    try {
      const categoryData = await axios.post(`http://localhost:4000/category/addCategory`,
          form_data,
        {
          headers: {
            Authorization: `${token}`
          }
        }
    )
    setInputData('')
    setLoading(false)
    navigate('/all-category')
    getToastMsg.success(categoryData.data.message)

    } catch (error) {
      getToastMsg.error(error.response.data.message)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-2xl mb-3'>Add Category</h1>
      <div className='w-[95%] bg-white shadow-2xl border border-slate-200 rounded-lg p-10'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label htmlFor="categoryName" className='mb-2'>Category Name</label>
          <input onChange={(e)=>setInputData(e.target.value)} className='outline-none border border-slate-200 rounded-[5px] px-2 py-2' type="text" name="categoryName" id="categoryName" placeholder='Category Name' />
          <input type="text" value={decodedToken.userId} hidden />
          <label htmlFor="categoryImage" className='mb-2'>Category Image</label>
            <div onDrop={handleDrop} onDragOver={handleDragOver} className='w-full h-[300px] overflow-hidden bg-slate-100 border border-slate-200 rounded-2xl shadow-2xl flex justify-center items-center'>
              <div onClick={()=>currentImg.current.click()} className='w-full flex justify-center items-center cursor-pointer'>
                  <img className=' w-full rounded-2xl' src={image} alt="categoryImg" />
                  <div className='absolute flex justify-center items-center '>
                    <LuImageUpscale className='text-4xl  text-slate-400'/>
                    <span className='text-sky-500 font-semibold'>Drag & Drop</span>
                  </div>
                  <input onChange={handleChange} type="file" hidden ref={currentImg} />
              </div>
            </div>
            {
              isLoading ?

              <button className='px-3 py-1.5 border border-slate-100 shadow-2xl rounded-[5px] bg-sky-700 text-white mt-2 font-semibold cursor-pointer active:scale-[0.9]'>Loading......</button>
              :
              <button className='px-3 py-1.5 border border-slate-100 shadow-2xl rounded-[5px] bg-sky-700 text-white mt-2 font-semibold cursor-pointer active:scale-[0.9]'>Submit</button>
            }
        </form>
      </div>
    </div>
  )
}

export default AddCategory