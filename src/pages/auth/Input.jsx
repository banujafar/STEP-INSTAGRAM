import classNames from "classnames";
import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
const Input = ({ value = "text", label, ...props }) => {
  const [field, meta, helpers] = useField(props);
    const [type, setType] = useState(value)


    const changeType = useCallback(() => {
        setType(prev => prev === 'password' ? 'text': 'password')
    }, [setType])
  return (
    <label className="relative flex h-9 ">
      <input 
      type={type}

      className={classNames("outline-none border bg-[#fafafa] rounded focus:border-gray-500 cursor-auto w-full text-gray-600 px-2 text-sm transition",{
        "pt-3": field?.value
      })} 
      
      {...props}
      {...field} />
      <span className={classNames("absolute cursor-auto  -translate-y-1/2  left-2 text-gray-400 transition-all",{
        "top-2.5 text-xs": field?.value,
        "top-1/2 text-sm": !field?.value
      })}>{label}</span>

      {field?.value && value === 'password' &&(

      <span onClick={changeType} className="absolute right-2 h-6 top-1/2 -translate-y-1/2 w-6 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full">
        {type === 'password' ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20}/>}
      </span>
      )}
    </label>
  );
};

export default Input;
