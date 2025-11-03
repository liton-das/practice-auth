import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { GoGraph } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
const Navbar = () => {
    const [accordian,setAccordian]=useState(false)
    // const handleAccordian function
    const handleAccordian=()=>{
        setAccordian(!accordian)
    }
  return (
    <>
      <nav className="w-[252px] h-screen shadow-2xl bg-white">
        <NavLink to={"/"} className={"pt-12 pl-5 pr-[107px] flex items-center gap-4 text-[20px]"}>
          <GoGraph />
          DashBoard
        </NavLink>
        <p className="mt-[51px]  pl-10 text-[14px] mb-[34px] font-inter">Admin Panel</p>
        <div className="container px-6 mb-[23px] cursor-pointer ">
          <div className="px-6 mb-[23px]">
         
              <div onClick={handleAccordian} className="flex items-center justify-between">
                <p>Products </p>
                <IoIosArrowForward className={`mr-[51px] ${accordian ?'transform-[rotate(90deg)]':'mr-[51px] transform-[rotate(-360deg)]'}`} />
              </div>
            {
                accordian && 
                <>
                <Link to={"#"} className="text-sky-600 text-[13px] mt-2 block font-semibold">
                  All Product
                </Link>
                <Link to={"#"} className="text-sky-600 text-[13px] mt-2 block font-semibold">
                  All Category
                </Link>
                <Link to={"#"} className="text-sky-600 text-[13px] mt-2 block font-semibold">
                  Add Product
                </Link>
                <Link to={"#"} className="text-sky-600 text-[13px] mt-2 block font-semibold">
                  Add Category
                </Link>
              </>
            }
              
        
          </div>
          <div className="px-6 mb-[23px]">
            <div className="flex items-center justify-between">
              <p>Orders </p>
              <IoIosArrowForward className="mr-[51px]" />
            </div>
            {/* <Link to={'#'} className='text-[14px] block font-semibold'>
                        All Product
                    </Link> */}
          </div>
          <div>
            <div className="flex px-6 mb-[23px] items-center justify-between">
              <p>Clients </p>
              <IoIosArrowForward className="mr-[51px]" />
            </div>
            {/* <Link to={'#'} className='text-[14px] block font-semibold'>
                        All Product
                    </Link> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar
