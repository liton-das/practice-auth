import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetCategory = (url) => {
  const [categories,setCategories]=useState([])
  const [loading,setLoading]=useState(false)

  const getCategoriesData = async()=>{
      setLoading(true)
    try {
        const response = await axios.get(url)
        setLoading(false)
        setCategories(response.data)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
  }
  useEffect(()=>{
        getCategoriesData()
  },[])
  return {
    getCategoriesData,
    categories,
    loading
  }
}

export default useGetCategory
