"use client"

import React from "react";
import {ArrowLeft} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function CreateInterview() {
  const router=useRouter();
  return (
    <div className="mt-10 px-10 ">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={()=> router.back()} className="cursor-pointer"/>
        <h2 className="font-bold text-2xl">Create New Interview</h2>


      </div>
    </div>
  );
}
