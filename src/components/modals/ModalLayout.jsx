import React from "react";
import { handleDeleteModal } from "../../utils/modal";
import { useNavigate, useParams } from "react-router";

const ModalLayout = ({ children }) => {
  const navigate = useNavigate();
  const { username } = useParams();
  return (
    <>
    {children}
      <div
        className="w-full h-full fixed bg-black/40 top-0 left-0 flex items-center justify-center cursor-pointer"
        onClick={() => {
          handleDeleteModal();
        }}
      ></div>
    </>
  );
};

export default ModalLayout;
