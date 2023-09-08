import { useField } from "formik";
import React, { useCallback, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
const SearchInput = ({clearSearchValue, ...props}) => {
  const [field] = useField(props);




  return (
    <label className="relative h-9 block ">
      <span className="absolute h-9 w-9 flex items-center justify-center text-gray-500">
        <AiOutlineSearch size={22} />
      </span>
      <input
        type="text"
        className="h-full outline-none px-10 border border-gray-400 rounded bg-gray-100"
        {...field}
        {...props}
      />
      {field?.value && (
        <span onClick={clearSearchValue} className="absolute h-6 w-6 cursor-pointer flex items-center justify-center bg-red-500 text-white  rounded-full right-2 top-1/2 -translate-y-1/2">
          <IoMdClose size={16} />
        </span>
      )}
    </label>
  );
};

export default SearchInput;
