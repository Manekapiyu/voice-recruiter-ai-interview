"use client";
import React, { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { useUser } from "@/app/provider";
import WelcomeContainer from "../dashboard/_components/WelcomeContainer";
import Provider from "@/app/provider";

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user?.email]);

  const GetInterviewList = async () => {
    console.log("Fetching for:", user?.email);
    const { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email);

    if (error) console.error("Supabase error:", error);
    else console.log("Fetched interviews:", Interviews);

    setInterviewList(Interviews || []);
  };

  return (
    <Provider>
      <div className="mt-2 px-10">
        <WelcomeContainer />
        <div className="mt-5 pt-5 bg-blue-50 pl-3 border border-blue-300 rounded-lg">
          <h2 className="font-bold text-2xl">Previously Created Interviews</h2>

          {interviewList?.length === 0 && (
            <div className="p-5 flex flex-col gap-3 items-center bg-blue-100 mt-3">
              <Video className="h-12 w-12 text-primary" />
              <h2>You don't have any interview created!</h2>
              <Link href="/dashboard/create-interview">
                <Button>+ Create New Interview</Button>
              </Link>
            </div>
          )}

          {interviewList?.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {interviewList.map((interview, index) => (
                <InterviewCard interview={interview} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Provider>
  );
}

export default AllInterview;
