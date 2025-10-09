"use client"

import React, { useState } from "react";
import {ArrowLeft} from 'lucide-react';
import { useRouter } from "next/navigation";
import { Progress } from "@radix-ui/react-progress";

export default function CreateInterview() {
  const router=useRouter();
  const [step,setStep]=useState(1);
  return (
    <div className="mt-10 px-10 ">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={()=> router.back()} className="cursor-pointer"/>
        <h2 className="font-bold text-2xl">Create New Interview</h2>
        


      </div>
      <progress
  value={ step * 33.33}
  max={100}
  className="my-5 w-full h-3 rounded-lg overflow-hidden"
/>

      
    </div>
  );
}
