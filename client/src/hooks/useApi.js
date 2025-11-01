import React, { useState } from 'react'
import axios from 'axios'

const useApi = async(url,content) => {
  const [allData,setData] = useState('')
  const [loading,setLoading]= useState(false)

    setLoading(true)
    try {
        const res = await axios.post(url,content)
        setData(res.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
  return{
    allData,
    loading
  }

}

export default useApi
