import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import fieldError from "../../helpers/FieldError";
import axios from 'axios'
import useApi from "../../hooks/useApi";
const INITIAL_DATA = {
    userName:'',
    email:'',
    phone:'',
    password:'',
    confirm_password:'',
    address:''
}
const RegistrationForm = () => {
    const [inputField,setInputField]=useState({...INITIAL_DATA})
    const [error,setError]=useState('')
    const {postData,allData,loading}=useApi()
    // handleChange function 
    const handleChange=(e)=>{
        setInputField((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
        setError('')
    }
    // handle submit function 
    const handleSubmit =async (e)=>{
      e.preventDefault()
      const isError = fieldError(inputField,[
        'userName',
        'email',
        'phone',
        'address',
        'password',
        'confirm_password'
      ])
      if(isError){
        setError(isError)
        console.log('fields error',isError)
      }else{
        // set data to the server 
        postData(``)
        setError('')
        console.log('Form submitted successfully:',inputField)
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 mb-10">
          Register Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup error={error.userName} autoComplete={'userName'} icon={<FaUser className="text-indigo-600" />} name={'userName'} onChange={handleChange} type={'text'} value={inputField.userName} placeholder={'Enter your username'}  text={'User Name'}/>
          <InputGroup error={error.email} autoComplete={'email'} icon={<FaEnvelope className="text-indigo-600" />} name={'email'} onChange={handleChange} value={inputField.email} type={'email'} placeholder={'Enter your email'}  text={'User Name'}/>
          <InputGroup error={error.phone} autoComplete={'phone'} icon={<FaPhoneAlt className="text-indigo-600" />} name={'phone'} onChange={handleChange} value={inputField.phone} type={'tel'} placeholder={'Enter your phone number'}  text={'User Name'}/>
          <InputGroup error={error.address} autoComplete={'address'} icon={<FaMapMarkerAlt className="text-indigo-600" />} name={'address'} onChange={handleChange} value={inputField.address} type={'text'} placeholder={'Enter your address'}  text={'Address'}/>
          <InputGroup error={error.password} autoComplete={'password'} icon={<FaLock className="text-indigo-600" />} name={'password'} onChange={handleChange} value={inputField.password} type={'password'} placeholder={'Enter your password'}  text={'Password'}/>
          <InputGroup error={error.confirm_password} autoComplete={'confirm_password'} icon={<FaLock className="text-indigo-600" />} name={'confirm_password'} onChange={handleChange} value={inputField.confirm_password} type={'password'} placeholder={'Enter your confirm_password'}  text={'Confirm Password'}/>
          {/* Submit Button */}
          <div className="pt-4">
            <Button btnText={'Create Account'} type={'submit'}/>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
export default RegistrationForm;
