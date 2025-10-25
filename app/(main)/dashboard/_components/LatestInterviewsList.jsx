"use client";
import React, { useState } from "react";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  return (
    <div className="mt-5 pt-5 bg-blue-50 pl-3 border border-blue-300 rounded-lg">
      <h2 className="font-bold text-2xl">Previously Created Interviews</h2>

      {interviewList?.length == 0 && (
        <div className="p-5 flex flex-col gap-3 items-center bg-blue-100 mt-3">
          <Video className="h-12 w-12 text-primary" />
          <h2> You don't have any interview created!</h2>
           <Link href="/dashboard/create-interview">
          <Button>+ Create New Interview</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
