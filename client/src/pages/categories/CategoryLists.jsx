import React, { useEffect, useState } from "react";
import Item from "antd/es/list/Item";
import useApi from "../../hooks/useApi";
import axios from "axios";
import getToastMsg from "../../helpers/toastMsg";
import CategorySelekton from "../../components/CategorySelekton";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router";
const CategoryLists = () => {
  const [allCategories, setCategories] = useState();
  const [searchParams]=useSearchParams()
  console.log(searchParams.get("hello"))
  const user = Cookies.get("token");
  // get All categories
  const getCategories = async () => {
    try {
      const categorys = await axios.get(`http://localhost:4000/category/allCategories`,{
        params:{
          limit:2,
          page:1,
        },
        headers: {
          Authorization: `${user}`
        }
      });
      const allCategories = await categorys.data;
      setCategories(allCategories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  console.log(allCategories);
  return (
    <div className="w-[1144px] flex ml-2 flex-col px-[22px]" >
      {allCategories?.map((item) => (
        <div key={item._id} className="w-[1092px] bg-white shadow-2xl rounded-lg px-6 py-3 mb-2 flex justify-between items-center">
          {/* Right side div */}
          <div className="flex items-center gap-2.5">
            {/* category image */}
            <div className="w-[60px] h-[60px] rounded-full bg-slate-200 overflow-hidden">
              <img className="w-full h-full" src={item?.categoryImage} alt="img" />
              
            </div>
            <h1>{item?.categoryName}</h1>
          </div>
          {/* Left side div */}
          <div className="flex items-center gap-2.5">
            {/* admin approval */}
            <button className="cursor-pointer px-[9px] py-[7px] rounded-[5px] flex justify-center items-center bg-green-500 text-white">Status</button>
            <div className="flex items-center gap-[18px]">
              <button className="cursor-pointer px-[9px] py-[7px] rounded-[5px] flex justify-center items-center bg-green-500 text-white">edit</button>
              <button className="cursor-pointer px-[9px] py-[7px] rounded-[5px] flex justify-center items-center bg-rose-500 text-white">delete</button>
            </div>
          </div>
        </div>
      ))}
      {/* <div>
        <div>1</div>
        <div>2</div>
      </div> */}
    </div>
  );
};

export default CategoryLists;
