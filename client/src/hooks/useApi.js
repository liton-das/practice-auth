import React, { useState } from 'react'
import axios from 'axios'

const useApi = () => {
  const [allData,setData] = useState('')
  const [loading,setLoading]= useState(false)
  const [err,setError] = useState('')
  const postData = async(url,content)=>{
    setLoading(true)
    try {
        const res = await axios.post(url,content)
        setData(res.data)
        setLoading(false)
    } catch (error) {
        setError(error.response.data.message || error.data.message)
        setLoading(false)
        console.log(error)
    }
  }
  return{
    allData,
    loading,
    postData,
    errors:err
  }
}

export default useApi
