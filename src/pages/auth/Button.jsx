import classNames from "classnames";
import React from "react";

const Button = ({disabled, children }) => {

  return (
    <button
      disabled={disabled}
      type="submit"
      className={classNames(
        "bg-[#0095F6]    text-white font-medium  disabled:bg-opacity-80  rounded-md w-full h-9 mt-2",
        {
          "hover:bg-blue-500": !disabled,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
