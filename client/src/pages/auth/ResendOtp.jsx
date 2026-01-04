import React, { useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios'
import getToastMsg from '../../helpers/toastMsg'
import { useNavigate } from 'react-router'

const ResendOtp = () => {
    const [inputData,setInputData]=useState()
    const [loading,setLoading] = useState(false)
    const navigate=useNavigate()

  // handleInput
  const handleInput=(e)=>{
    setInputData(e.target.value)
  }
  console.log(inputData)
    // handleSubmit function 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const resendData= await axios.post(`http://localhost:4000/auth/resendOtp`,{email:inputData})
          getToastMsg.success(resendData.data.message)
          navigate('/verify-otp')
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 mb-10">
            Resend Otp
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input onChange={handleInput} className='w-full py-[7px] rounded-[5px] outline-none border border-slate-300 px-[15px]' type="email" placeholder='please provide your valid email' />
            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <Button btnText={"Loading>>>>>>Loading<<<<<<"} type={"submit"} />
              ) : (
                <Button btnText={"Verify"} type={"submit"} />
              )}
            </div>
          </form>
          <div className="flex justify-between items-center mt-3">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 font-semibold hover:underline">
                Register Here
              </a>
            </p>
            <p className="text-center text-sm text-gray-600">
              Forgot Password?{" "}
              <a href="/reset_password" className="text-indigo-600 font-semibold hover:underline">
                Reset Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResendOtp
