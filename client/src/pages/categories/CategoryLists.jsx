import React, { useEffect, useState } from "react";
import Item from "antd/es/list/Item";
import useApi from "../../hooks/useApi";
import axios from "axios";
import getToastMsg from "../../helpers/toastMsg";
import CategorySelekton from "../../components/CategorySelekton";
import Cookies from 'js-cookie'
const CategoryLists = () => {
const [allCategories,setCategories]=useState()
const user = Cookies.get('token')
// get All categories
const getCategories=async()=>{
  try {
    const categorys= await axios.get(`http://localhost:4000/category/allCategories`, {
  headers: {
    Authorization: `${user}`,
  },
})
  const allCategories = await categorys.data
  setCategories(allCategories)

}catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  getCategories()
},[])
console.log(allCategories)
  return (
      <>
        <div>
          
        </div>
      </>
  );
};

export default CategoryLists;
