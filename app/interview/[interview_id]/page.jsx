'use client';

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter, useParams } from "next/navigation";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState(""); 
  const [userEmail, setUserEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

 const GetInterviewDetails = async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from("Interviews")
      .select("jobPosition, jobDescription, duration, type")
      .eq("interview_id", interview_id)
      .maybeSingle();

    if (error) {
      console.error("Supabase error fetching interview details:", error);
      toast.error("Failed to load interview details.");
    } else if (!data) {
      console.warn("No interview found for ID:", interview_id);
      toast.error("Invalid interview link or data not found.");
    } else {
      setInterviewData(data);
    }
  } catch (e) {
    console.error("Unexpected error:", e);
    toast.error("Something went wrong while loading interview.");
  } finally {
    setLoading(false);
  }
};


  const onJoinInterview = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interview_id)
        .single();

      if (error) {
        console.error("Error joining interview:", error);
        toast.error("Unable to join interview.");
      } else {
        console.log("Interview joined:", data);
        toast.success(`Welcome ${userName}! Starting your interview...`);
        setInterviewInfo({
          userName: userName,
          userEmail: userEmail,
          interviewData: data, 
        });
        router.push(`/interview/${interview_id}/start`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while joining.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-blue-500 rounded-3xl shadow-2xl p-8 transition-all hover:shadow-3xl">

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md mb-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
            <span className="text-blue-800">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
          <p className="text-gray-600 mt-1">AI-Powered Interview Platform</p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/Interview.png"
            alt="interview"
            width={350}
            height={350}
            className="rounded-xl"
          />
        </div>

        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-blue-900">
            {interviewData?.jobPosition || "Loading Interview..."}
          </h2>
          <p className="flex items-center justify-center gap-2 text-gray-500 mt-2">
            <Clock className="h-4 w-4 text-blue-500" />
            {interviewData?.duration
              ? `${interviewData.duration} Minutes`
              : "--"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <Input
              placeholder="e.g. Jeni Smith"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <Input
              placeholder="e.g. jeni@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full rounded-xl border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-800"
            />
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl mt-8 shadow-sm">
          <div className="bg-blue-100 p-3 rounded-full">
            <Info className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2 bg-blue-300/30 inline-block px-2 rounded">
              Before you begin
            </h3>
            <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <Button
              className="mt-8 w-full py-3 text-lg font-semibold bg-blue-800 hover:bg-blue-500  text-white justify-center rounded-xl flex items-center gap-2" 
            disabled={loading || !userName || !userEmail}
            onClick={onJoinInterview}
          >
            {loading && <Loader2Icon className="animate-spin w-5 h-5" />}
            {!loading && <Video className="w-5 h-5" />}
            {loading ? "Loading..." : "Join Interview"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Interview;
