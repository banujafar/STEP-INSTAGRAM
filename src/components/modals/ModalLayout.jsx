import React from "react";

const ModalLayout = ({ children }) => {
  return (
    <div className="w-full h-full fixed z-50 bg-black/40 top-0 left-0 flex items-center justify-center">
      {children}
    </div>
  );
};

export default ModalLayout;
