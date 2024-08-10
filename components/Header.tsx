import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div
      className="min-w-full min-h-screen grid place-items-center bg-[url('/header.jpg')] bottom-0 bg-center bg-no-repeat md:bg-fixed bg-cover -z-10"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
      }}
    >
      <div className="text-center text-white">
        <h1 className="mt-24 mx-auto text-8xl z-0">Ideas</h1>
        <h2 className="text-3xl mb-20">Where all our great things begin</h2>
      </div>
    </div>
  );
};

export default Header;
