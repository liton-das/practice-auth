import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router";
import moment from "moment"
const CategoryLists = () => {
  const [allCategories, setCategories] = useState();
  const [searchParams]=useSearchParams()
  const [status,setStatus]=useState()
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
  // handleStatus function
  const handleStatus=(e)=>{
    setStatus(e.target.value)
  }
  // adminApproval
  const adminApproval=async(id)=>{
    
    await axios.patch(`http://localhost:4000/category/updateCategory`,
      {
        categoryId:id,
        updateStatus:status
      },
      {
      headers: {
          Authorization: `${user}`
        }
    })
    getCategories();
  }
  useEffect(() => {
    getCategories();
  }, []);
  console.log(allCategories);
  return (
    <div className="w-[1090px] flex bg-slate-100 pt-3  flex-col px-[18px]">
      {allCategories?.map((item) => (
        <div
          key={item._id}
          className="w-full bg-white shadow-2xl rounded-lg px-6 py-3 mb-2 flex justify-between items-center"
        >
          {/* Right side div */}
          <div className="flex items-center gap-8">
            {/* category image */}
            <div className="flex items-center gap-2.5">
              <div className="w-[60px] h-[60px] rounded-full bg-slate-200 overflow-hidden">
                <img className="w-full h-full" src={item?.categoryImage} alt="img" />
              </div>
            <h1>{item?.categoryName}</h1>
            </div>
            <div className="flex items-center gap-8">
              <h1 className={`font-semibold ${item.adminApproval == 'approved' ? 'text-green-500':'text-red-500'}`}>{item?.adminApproval}</h1>
              <h1 className="text-base font-semibold text-sky-700">{moment(item.createdAt).fromNow()}</h1>
            </div>
          </div>
          {/* Left side div */}
          <div className="flex items-center gap-2.5">
            {/* admin approval */}
            <div>
            </div>
            <select onChange={handleStatus}   className="border border-slate-200 outline-none px-2 py-[7px] rounded-[5px] ">
              <option>Select Status</option>
              <option value={'approved'}>Approved</option> 
              <option className="bg-red-500 text-white" value={'cancel'}>Cancel</option>
            </select >
            <div className="flex items-center gap-[18px]">
              <button onClick={()=>adminApproval(item._id)} className="cursor-pointer px-[9px] py-[7px] rounded-[5px] flex justify-center items-center bg-green-500 text-white">
                edit
              </button>
              <button className="cursor-pointer px-[9px] py-[7px] rounded-[5px] flex justify-center items-center bg-rose-500 text-white">
                delete
              </button>
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
