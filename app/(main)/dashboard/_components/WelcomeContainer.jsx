"use client";

import React from "react";
import { useUser } from "@/app/provider";

import Image from "next/image";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-gradient-to-r from-[#f0f4ff] to-blue-600 p-5 rounded-2xl flex justify-between items-center">

      <div>
        <h2 className="text-lg font-bold text-[#0f172a]
">
          Welcome Back, {user?.name || "Guest"}
        </h2>
        <h3 className="text-[#475569] text-sm">
          AI-Powered Interview Assistant: Practice, Improve, and Land Your Dream Job
        </h3>
      </div>
      {user?.picture && (
        <Image
          src={user.picture}
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full ring-2 ring-white"
        />
      )}
    </div>
  );
}

export default WelcomeContainer;
