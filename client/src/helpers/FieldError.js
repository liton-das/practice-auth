import React from 'react'

// generate error 
    const fieldError=(fields,inputFields=[])=>{
      let err = {}
      inputFields.forEach((key)=>{
        if(!fields[key] || fields[key].trim === ''){
            err[key] = `${key.replace('_',' ')} field is required!`
        }
      })
      return Object.keys(err).length > 0 ? err : null
    }

export default fieldError
