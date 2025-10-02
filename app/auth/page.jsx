import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      {/* Login Card */}
      <div className="mt-16 flex flex-col items-center border rounded-2xl shadow-lg p-8 bg-white w-full max-w-md">
        
        {/* Logo + Brand Name */}
        <div className="flex items-center mb-2">
          <Image
            src="/logo.jpg"
            alt="Intervoicr Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h1 className=" text-3xl font-semibold tracking-wide">
            <span className="text-indigo-900">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
        </div>

        {/* Login Illustration + Info */}
        <div className="flex flex-col items-center ">
          <Image
            src="/login.png"
            alt="login"
            width={350}
            height={200}
            className="rounded-2xl bg-blue-50 pl-8 pr-8 pt-2 pb-2"
          />
          <h2 className="text-2xl font-bold text-center mt-4">
            Welcome to InterVox
          </h2>
          <p className="text-gray-500 text-center mt-1">
            Sign in with Google Authentication
          </p>
          <Button className="mt-4 w-full bg-blue-500 hover:bg-indigo-600 text-white">Login with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
