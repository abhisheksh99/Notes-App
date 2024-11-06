import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-700 text-center text-white py-4 w-full fixed bottom-0">
      <p>&copy; {currentYear}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
