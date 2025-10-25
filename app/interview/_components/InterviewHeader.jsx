import React from "react";
import Image from "next/image";

function InterviewHeader() {
  return (
    <div className="flex items-center gap-3 py-4 px-6 bg-blue-800 shadow-sm ">
      {/* Logo */}
      <div className="w-16 h-16 overflow-hidden">
        <Image
          src="/logo.png"
          alt="logo"
          width={90}
          height={90}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold tracking-wide">
        <span className="text-indigo-300">Inter</span>
        <span className="text-blue-400">Vox</span>
      </h1>
    </div>
  );
}

export default InterviewHeader;
