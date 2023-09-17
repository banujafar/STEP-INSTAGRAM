import React, { useEffect, useRef } from "react";
import { handleDeleteModal } from "../../utils/modal";
import { useDispatch } from "react-redux";
import { clearData } from "../../store/addPostSlice";


const ModalLayout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('click', (e) => {

      if (e.target.classList.value.includes('modal-layout')){
        handleDeleteModal()
        dispatch(clearData())
      }
    })
  }, [])
  return (
    <>
    
      <div
        className="w-full h-full fixed bg-black/40 top-0 left-0 flex items-center justify-center modal-layout  z-50"
        
      >
        {children}
      </div>
    </>
  );
};

export default ModalLayout;
