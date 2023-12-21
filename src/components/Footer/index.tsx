import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[150px] flex items-center justify-center bg-eldar-grey">
      <Image src="/imgs/logo.png" alt="footer" width="120" height="120" />
    </footer>
  );
};

export default Footer;
