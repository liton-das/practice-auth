import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaMapMarkerAlt } from "react-icons/fa";
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

    // handleChange function 
    const handleChange=(e)=>{
        setInputField((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    console.log(inputField)
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 mb-10">
          Register Account
        </h2>

        <form className="space-y-6">
          {/* Username */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaUser className="text-indigo-600" /> Username
            </label>
            <input
                onChange={handleChange}
              type="text"
              name='userName'
              value={inputField.userName}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaEnvelope className="text-indigo-600" /> Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name='email'
              value={inputField.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaPhoneAlt className="text-indigo-600" /> Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={inputField.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600" /> Address
            </label>
            <textarea
               onChange={handleChange}
               name="address"
               value={inputField.address}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none shadow-sm"
              rows="2"
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaLock className="text-indigo-600" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={inputField.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaLock className="text-indigo-600" /> Confirm Password
            </label>
            <input
                name="confirm_password"
              value={inputField.confirm_password}
              onChange={handleChange}
              type="password"
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer py-3 bg-linear-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all shadow-lg"
            >
              Create Account
            </button>
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
