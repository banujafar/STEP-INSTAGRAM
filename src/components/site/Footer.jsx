import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 p-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Instagram Clone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
