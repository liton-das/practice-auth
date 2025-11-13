import React from 'react'
import { NavLink } from 'react-router'
// import CategoryLists from '../pages/categories/CategoryLists'
const Bradcumb = () => {
  return (
    <div className="w-full mb-2">
      <div className="bg-white  border border-slate-200 shadow-2xs py-5 px-3">
        <NavLink
          to={"/"}
          className={({ isActive }) => {
           return  `${isActive ? "text-sky-500" : "text-black"}`;
          }}
        >
          Home
        </NavLink> <span>/</span>
        <NavLink
          to={"/all-category"}
          className={({ isActive }) => {
           return `${isActive ? "text-sky-500" : "text-black"}`;
          }}
        >
          All Category
        </NavLink>
      </div>
    </div>
  );
}

export default Bradcumb
