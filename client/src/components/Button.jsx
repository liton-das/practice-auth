import React from "react";

const Button = ({type,btnText}) => {
  return (
    <>
      <button
        type={type}
        className="w-full cursor-pointer py-3 bg-linear-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-pink-700 transition-all shadow-lg"
      >
        {btnText}
      </button>
    </>
  );
};

export default Button;
