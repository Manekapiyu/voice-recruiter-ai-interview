"use client";

import React from "react";
import { useUser } from "@/app/provider";

import Image from "next/image";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-gray-100/50 p-5 rounded-2xl flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">
          Welcome Back, {user?.name || "Guest"}
        </h2>
        <h3 className="text-gray-500 text-sm">
          AI-Powered Interview Assistant: Practice, Improve, and Land Your Dream Job
        </h3>
      </div>
      {user?.picture && (
        <Image
          src={user.picture}
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default WelcomeContainer;
