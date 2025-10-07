"use client";

import React from "react";
import { useUser } from "@/provider";
import Image from "next/image";

function WelcomeContainer() {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
      <div className='bg-gray-100 p-5 rounded-2xl flex justify-between items-ccenter'>
        <div>
      <h2 className="text-lg font-bold">Welcome Back, {user.name}</h2>
      <h2 className="text-gray-500"> AI-Powered Interview Assistant: Practice, Improve, and Land Your Dream Job </h2>
    </div>
    {user && <Image src={user?.picture} alt='useravatar' width={50} height={50}/>}
    </div>
  );
}

export default WelcomeContainer;
