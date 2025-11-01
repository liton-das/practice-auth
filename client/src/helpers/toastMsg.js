import React from 'react'
import { Slide, toast } from 'react-toastify';
const option = {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Slide,
}

const toastMsg = (msg,type) => {
  switch (type) {
    case 'success':
        toast.success(msg,option)
        break;
    case 'error':
        toast.error(msg,option)
        break;
    case 'info':
        toast.info(msg,option)
        break;
    case 'warning':
        toast.warning(msg,option)
        break;
        default:
            break;
      }
}
const getToastMsg={
    success : (msg)=>toastMsg(msg,'success'),
    error:(msg)=>toastMsg(msg,'error'),
    info:(msg)=>toastMsg(msg,'info'),
    warn:(msg)=>toastMsg(msg,'warning')
}
export default getToastMsg
