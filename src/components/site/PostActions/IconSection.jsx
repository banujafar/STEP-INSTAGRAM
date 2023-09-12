import React from "react";

const IconSection = ({ icons }) => (
  <div className="flex justify-start flex-col">
    <div className="flex items-center space-x-4">
      {icons.map(({ icon,count }, index) => (
        <button className="flex items-center text-gray-600" key={index}>
          {icon}
         {count>=0&&<span className="text-white ml-2">{count&&count}</span>}
        </button>
      ))}
    </div>
  </div>
);

export default IconSection;
