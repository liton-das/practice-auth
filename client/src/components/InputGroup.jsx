import React from 'react'
// import { FaUser } from 'react-icons/fa';

const InputGroup = ({autoComplete,icon,text,onChange,type,value,placeholder,name,error}) => {
  return (
    <>
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          {icon} {text}
        </label>
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
        <p className='text-base text-red-500'>{error?error :''}</p>
      </div>
    </>
  );
}

export default InputGroup
