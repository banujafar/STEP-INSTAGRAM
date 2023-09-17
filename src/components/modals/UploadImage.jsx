import React, { useCallback, useRef, useState } from "react";

import ModalHeader from "./ModalHeader";
import { useDispatch } from "react-redux";
import { useAddPost } from "../../utils/addPost";
import {  setBase64Image } from "../../store/addPostSlice";
const UploadImage = () => {
 
  const {base64Image} = useAddPost()
  const dispatch = useDispatch()
  const fileRef = useRef();

  const handleUploadImage = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const res = reader?.result
        dispatch(setBase64Image(res))
    };
    reader.readAsDataURL(file);
    
  }, [dispatch, setBase64Image]) 


  const handleClick = useCallback(() => {
    fileRef?.current.click();
  }, [fileRef?.current])
    
  return (
    <div className="flex flex-col w-1/3 bg-white">
      <ModalHeader label={"UPLOAD"} isNext={base64Image} />
      <div className="h-[400px] flex flex-col items-center justify-center ">
        <input
          type="file"
          accept="image/*"
          onChange={e => dispatch(handleUploadImage(e))}
          ref={fileRef}
          className="hidden"
        />

        {base64Image ? (
          <img onClick={handleClick} src={base64Image} alt="Image" className="w-full h-full object-cover cursor-pointer" />
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="bg-blue-500 text-white  px-4 py-3 text-xl font-medium rounded-md border-blue-500  border hover:bg-white hover:text-blue-500 transition"
          >
            Upload an Image
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
