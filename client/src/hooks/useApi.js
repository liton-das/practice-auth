import React, { useState } from 'react'
import axios from 'axios'

const useApi = () => {
  const [allData,setData] = useState([] || '')
  const [loading,setLoading]= useState(false)
  const postData = async(url,content)=>{
    setLoading(true)
    try {
        const res = await axios.post(url,content)
        setData(res.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
  }
  return{
    allData,
    loading,
    postData
  }

}

export default useApi
