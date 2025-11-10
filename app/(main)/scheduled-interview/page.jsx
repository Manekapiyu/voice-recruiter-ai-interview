"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import WelcomeContainer from "../dashboard/_components/WelcomeContainer";
import Provider from "@/app/provider";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]); 

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(`jobPosition, jobDescription,type,questionList, duration, interview_id,created_at, 
        interview-feedback(userEmail,userName,feedback,created_at)`)
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(result);
    setInterviewList(result.data || []); 
  };

  return (
    <Provider>
      <div className="mt-2 px-10">
        <WelcomeContainer />
        <div>
          <h2 className="font-bold text-lg mt-5">
            Interview List With Candidate FeedBack
          </h2>

          {interviewList.length === 0 && (
            <div className="p-5 flex flex-col gap-3 items-center bg-blue-100 mt-3">
              <Video className="h-12 w-12 text-primary" />
              <h2>You don't have any interview created!</h2>
              <Link href="/dashboard/create-interview">
                <Button>+ Create New Interview</Button>
              </Link>
            </div>
          )}

          {interviewList.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {interviewList.map((interview, index) => (
                <InterviewCard
                  interview={interview}
                  key={index}
                  viewDetail={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Provider>
  );
}

export default ScheduledInterview;
