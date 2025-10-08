import React from "react";
import {ArrowLeft} from 'lucide-react';

export default function CreateInterview() {
  return (
    <div className="p-8 text-2xl font-semibold">
      <div className="flex gap-5">
        <ArrowLeft/>
        <h2 className="">Create New Interview</h2>


      </div>
    </div>
  );
}
