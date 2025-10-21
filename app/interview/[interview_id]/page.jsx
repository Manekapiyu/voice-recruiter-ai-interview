"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState("");
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
        .single();

      if (error) {
        console.error("Error fetching interview details:", error);
        toast.error("Failed to load interview details.");
      } else {
        setInterviewData(data);
      }
    } catch (e) {
      console.error(e);
      toast.error("Incorrect Interview Link");
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
        setInterviewInfo(data);
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
    <div className="p-10 md:px-20 lg:px-40 xl:px-64 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center border rounded-2xl p-6 bg-white shadow-md">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={85}
            height={85}
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="text-indigo-900">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
        </div>

        <h2 className="mt-2 text-gray-600">AI-Powered Interview Platform</h2>

        <Image
          src="/Interview.png"
          alt="interview"
          width={500}
          height={500}
          className="w-[400px] my-6"
        />

        {/* Interview Info */}
        <h2 className="font-bold text-xl text-gray-800">
          {interviewData?.jobPosition || "Loading Interview..."}
        </h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" />
          {interviewData?.duration
            ? `${interviewData.duration} Minutes`
            : "--"}
        </h2>

        {/* Input Field */}
        <div className="w-full md:w-2/3 mt-6">
          <h3 className="font-medium text-gray-700 mb-2">
            Enter your full name
          </h3>
          <Input
            placeholder="e.g. Jeni Smith"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl mt-6 shadow-sm w-full md:w-2/3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Info className="text-blue-600 w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Before you begin
            </h2>
            <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>

        {/* Join Button */}
        <div className="w-full md:w-2/3">
          <Button
            className="mt-6 w-full font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading || !userName}
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
