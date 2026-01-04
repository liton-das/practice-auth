import React, { useEffect, useState } from 'react'

import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from '../../components/Button';
import InputGroup from '../../components/InputGroup';
import fieldError from '../../helpers/FieldError';
import Cookies from 'js-cookie'
import axios from 'axios';
import getToastMsg from '../../helpers/toastMsg';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/featurs/UserSlice';
import { jwtDecode } from 'jwt-decode';
const INITIAL_DATA = {
    email:'',
    password:''
}
const Login = () => {
      const [inputField,setInputField]=useState({...INITIAL_DATA})
      const [error,setError]=useState('')
      const [loading,setLoading] = useState(false)
      const navigate = useNavigate()
      const dispatch = useDispatch()
      // handleChange function 
      const handleChange=(e)=>{
          setInputField((prev)=>({
              ...prev,
              [e.target.name]:e.target.value
          }))
          setError('')
      }
      // handle submit function 
      const handleSubmit = async(e)=>{
        setLoading(true)
        e.preventDefault()
        let isError={}
        if(!inputField.email){
          isError.email = `${inputField.email} is required!`
        }
        if(!inputField.password){
          isError.password = `${inputField.password} is required!`
        }
        const isValid = Object.keys(isError).length != 0 ? isError:null
        if(isValid){
          setError(isValid)
          setLoading(false)
          return
        }
        try {
            const userData = await axios.post(`http://localhost:4000/auth/login`,inputField) 
            const user = await userData.data
            const userToken=Cookies.set('token',user.accessToken)
            
            dispatch(addUser(userToken))
            getToastMsg.success(user.message)
            setLoading(false)
            setInputField(INITIAL_DATA)
            navigate('/')
        }catch (err) {
          getToastMsg.error(err.response.data.message)
          setLoading(false)
        }
      }
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
