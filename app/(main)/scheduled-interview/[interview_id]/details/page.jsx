"use client";

import Provider, { useUser } from "@/app/provider";
import WelcomeContainer from "@/app/(main)/dashboard/_components/WelcomeContainer";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);

  useEffect(() => {
    if (user && interview_id) {
      getInterviewDetails();
    }
  }, [user, interview_id]);

  const getInterviewDetails = async () => {
    try {
      console.log("Fetching for user:", user?.email, "Interview ID:", interview_id);

      const { data, error } = await supabase
        .from("Interviews")
        .select("jobPosition, duration, jobDescription, questionList ,interview_id, created_at, userEmail")
        .eq("userEmail", user?.email)
        .eq("interview_id", interview_id)
        .single();

      if (error) {
        console.error("Supabase Error:", error.message);
        return;
      }

      console.log("Interview fetched:", data);
      setInterviewDetail(data);
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
     <Provider>
          <div className=" px-10">
            <WelcomeContainer />
    <div className='mt-8'>
      <h2 className='font-semibold text-2xl text-cyan-950'>Interview Details..</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
    </div>
    </div>
    </Provider>
  );
}

export default InterviewDetail;
