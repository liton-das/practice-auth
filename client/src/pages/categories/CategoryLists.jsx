import React, { useEffect, useState } from "react";
import useGetCategory from "../../hooks/useGetCategory";
import Item from "antd/es/list/Item";
import useApi from "../../hooks/useApi";
import axios from "axios";
import getToastMsg from "../../helpers/toastMsg";
import CategorySelekton from "../../components/CategorySelekton";

const CategoryLists = () => {
  const [isApprove,setIsApproved]=useState('')
  const { categories, loading ,getCategoriesData} = useGetCategory("http://localhost:4000/category/allCategories");
console.log(categories)
  const [isOpen,setIsOpen]=useState(false)
  //handleSubmit 
  const handleUpdate=async(item)=>{
    try {
      await axios.patch('http://localhost:4000/category/updateCategory',{categoryId:item._id,updateStatus:isApprove}).then(()=>{
        getToastMsg.success('Category Updated successfully')
        setIsOpen(!isOpen)
        getCategoriesData()
      }).catch(e=>{
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  }
  // handleDelete 
  const handleDelete=async(item)=>{
    // console.log(item._id)
    try {
      await axios.post('http://localhost:4000/category/deleteCategory',{id:item._id}).then(()=>{
        console.log('object')
        getToastMsg.success('Category delete successfully')
        getCategoriesData()
      }).catch(e=>{
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(categories)
  return (
    <div className="w-full">
      {
        <table className="w-full border-separate border border-gray-400 ... text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 ...">No</th>
            <th className="border border-gray-300 ...">categoryName</th>
            <th className="border border-gray-300 ...">categoryImage</th>
            <th className="border border-gray-300 ...">adminApproval</th>
            <th className="border border-gray-300 ...">createdBy</th>
            <th className="border border-gray-300 ...">createdAt</th>
            <th className="border border-gray-300 ...">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, i) => (
            <tr key={i}>
              <td className="border border-gray-300 ...">{i + 1}</td>
              <td className="border border-gray-300 ...">{item?.categoryName}</td>
              <td className="border border-gray-300 ... w-full h-[70px] flex justify-center items-center overflow-hidden">
                <img className="w-full" src={item?.categoryImage} alt="product-img" />
              </td>
              <td
                className={`border border-gray-300 ... ${
                  item?.adminApproval == "cancel" || item?.adminApproval == "pendding"
                    ? "text-white bg-red-500"
                    : "bg-slate-200 text-green-500 font-semibold"
                }`}
              >
                {item?.adminApproval}
              </td>
              <td className="border border-gray-300 ...">{item?.createdBy}</td>
              <td className="border border-gray-300 ...">
                {new Date(item?.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-300 ...">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="inline py-2 bg-slate-200 border border-slate-200 rounded-sm cursor-pointer"
                >
                  {!isOpen ? (
                    <button
                      type="button"
                      onClick={() => setIsOpen(true)}
                      className="mx-1 px-2 py-1.5 rounded-sm cursor-pointer active:scale-[0.9] bg-green-500 text-white"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdate(item)}
                      type="submit"
                      className="mx-1 px-2 py-1.5 rounded-sm cursor-pointer active:scale-[0.9] bg-green-500 text-white"
                    >
                      Update
                    </button>
                  )}
                  {isOpen && (
                    <select
                      onChange={(e) => setIsApproved(e.target.value)}
                      name="isApproved"
                      className="border mx-1 py-1.5 border-slate-200 outline-none rounded-sm cursor-pointer  "
                    >
                      <option>Select</option>
                      <option value="approved">Approved</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  )}
                  <button
                    onClick={() => handleDelete(item)}
                    className="border px-[5px] mx-1 py-1.5 border-slate-200 rounded-sm active:scale-[0.9] cursor-pointer bg-rose-500 text-white "
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
};

export default CategoryLists;
