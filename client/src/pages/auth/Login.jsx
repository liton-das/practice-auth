import React, { useEffect, useState } from 'react'

import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from '../../components/Button';
import InputGroup from '../../components/InputGroup';
import fieldError from '../../helpers/FieldError';
import useApi from '../../hooks/useApi';
import getToastMsg from '../../helpers/toastMsg';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
const INITIAL_DATA = {
    email:'',
    password:''
}
const Login = () => {
  const [inputField,setInputField]=useState({...INITIAL_DATA})
      const [error,setError]=useState('')
      const {postData,allData,errors,loading,token} = useApi()
      const navigator = useNavigate()
      // handleChange function 
      const handleChange=(e)=>{
          setInputField((prev)=>({
              ...prev,
              [e.target.name]:e.target.value
          }))
          setError('')
      }
      // handle submit function 
      const handleSubmit = (e)=>{
        e.preventDefault()
        const isError = fieldError(inputField,[
          'email',
          'password'
        ])
        if(isError){
          setError(isError)
        }else{
          // send form data to the server 
          postData('http://localhost:4000/auth/login',inputField)
          navigator('/')
          setError('')
          setInputField(INITIAL_DATA)
        }
      }
    useEffect(()=>{
      if(errors){
        getToastMsg.error(errors)
      }else{setInterval
        getToastMsg.success(allData.message)
        
      }
      if(allData.accessToken){
        Cookies.set('token', token)
      }
    },[allData,errors,token])
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 mb-10">
            Login Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputGroup
              error={error.email}
              autoComplete={"email"}
              icon={<FaEnvelope className="text-indigo-600" />}
              name={"email"}
              onChange={handleChange}
              value={inputField.email}
              type={"email"}
              placeholder={"Enter your email"}
              text={"User Name"}
            />
            <InputGroup
              error={error.password}
              autoComplete={"password"}
              icon={<FaLock className="text-indigo-600" />}
              name={"password"}
              onChange={handleChange}
              value={inputField.password}
              type={"password"}
              placeholder={"Enter your password"}
              text={"Password"}
            />
            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <Button btnText={"Loading>>>>>>Loading<<<<<<"} type={"submit"} />
              ) : (
                <Button btnText={"Login Account"} type={"submit"} />
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
  );
}

export default Login
