import React from 'react'

import { FaEnvelope, FaLock } from "react-icons/fa";
const Login = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-lg p-10 transition-transform hover:scale-[1.02] duration-300">
              <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 mb-10">
                Login Your Account
              </h2>
      
              <form className="space-y-6">         
                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-indigo-600" /> email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  />
                </div>
                {/* Password */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaLock className="text-indigo-600" /> Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
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
                Don't have an account?{' '}
                <a href="/register" className="text-indigo-600 font-semibold hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </div>
    </>
  )
}

export default Login
