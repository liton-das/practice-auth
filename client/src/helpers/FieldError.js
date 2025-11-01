import React from 'react'

// generate error 
    const fieldError=(fields,inputFields=[])=>{
      let err = {}
      inputFields.forEach((key)=>{
        if(!fields[key] || fields[key].trim === ''){
            err[key] = `${key.replace('_',' ')} field is required!`
        }
      })
      if(fields.password && fields.confirm_password && fields.password !== fields.confirm_password){
        err.confirm_password = 'Passwords do not match!'
      }
      return Object.keys(err).length > 0 ? err : nulls
    }

export default fieldError
