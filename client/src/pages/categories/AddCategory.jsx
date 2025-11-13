
import React from 'react'

const AddCategory = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-2xl mb-3'>Add Category</h1>
      <div className='w-[95%] bg-white shadow-2xl border border-slate-200 rounded-lg p-10'>
        <form className='flex flex-col'>
          <label htmlFor="categoryName" className='mb-2'>Category Name</label>
          <input className='outline-none border border-slate-200 rounded-[5px] px-2 py-2' type="text" name="categoryName" id="categoryName" placeholder='Category Name' />
          <label htmlFor="categoryImage" className='mb-2'>Category Image</label>
            <div className='w-full h-[300px] overflow-hidden bg-slate-100 border border-slate-200 rounded-2xl shadow-2xl flex justify-center items-center'>
              <div className='w-full flex justify-center items-center'>
                  <img className='' src="" alt="categoryImg" />
              </div>
            </div>
            <button className='px-3 py-1.5 border border-slate-100 shadow-2xl rounded-[5px] bg-sky-700 text-white mt-2 font-semibold cursor-pointer active:scale-[0.9]'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory