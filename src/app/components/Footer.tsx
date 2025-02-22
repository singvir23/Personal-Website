import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-12 bg-[#fdfdfd] border-t border-gray-200">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 text-sm">
          © {currentYear} Viraaj Singh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;