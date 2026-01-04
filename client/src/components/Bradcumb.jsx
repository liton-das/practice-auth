import React from 'react'
import { NavLink } from 'react-router'
import UserProfile from './UserProfile';
// import CategoryLists from '../pages/categories/CategoryLists'
const Bradcumb = () => {
  return (
    <div className="w-[1111px] bg-white  border border-slate-200 shadow-2xs py-5 px-3 flex justify-between">
      <div className="w-full">
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
        </NavLink> <span>/</span>
        <NavLink
          to={"/all-products"}
          className={({ isActive }) => {
           return `${isActive ? "text-sky-500" : "text-black"}`;
          }}
        >
          All Products
        </NavLink>
      </div>
      <div>
        <UserProfile/>
      </div>
    </div>
  );
}

export default Bradcumb
