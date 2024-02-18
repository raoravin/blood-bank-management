import React from 'react'

const inputtype = ({labelText,inputType,htmlfor, value,onChange,name}) => {
  return (
    <div>
        <label className='mb-2' htmlFor={htmlfor}>{labelText}</label>
        <input 
        className='form-control'
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
         />
    </div>
  )
}
 
export default inputtype