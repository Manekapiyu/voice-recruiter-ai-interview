'use client';

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Clock, Loader2Icon, Mic, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation"; 
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Vapi from '@vapi-ai/web';
import TimerComponent from './_components/TimeComponent';
import axios from 'axios';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const { interview_id } = useParams();
  const router = useRouter();

  const [activeUser, setActiveUser] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);

  // Initialize Vapi once
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  console.log("VAPI Key:", process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  // Listener functions
  const handleMessage = (message) => {
    console.log(message?.message);
    if (message?.conversation) setConversation(JSON.stringify(message.conversation));
  };

  const handleCallStart = () => {
    console.log("Call has started.");
    toast('Call started.. Good luck!');
  };

  const handleCallEnd = () => {
    console.log("Call has ended.");
    toast('Interview Ended');
    setActiveUser("user");
    generateFeedback();
  };

  const handleSpeechStart = () => {
    console.log("Assistant speech has started.");
    setActiveUser("ai");
  };

  const handleSpeechEnd = () => {
    console.log("Assistant speech has ended.");
    setActiveUser("user");
  };

  const handleVapiError = (err) => {
    console.error("Vapi error:", err);
    toast.error("Vapi encountered an error: " + (err?.message || JSON.stringify(err)));
  };

  const startCall = () => {
    // Safely build question list
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map(q => q?.question)
      .filter(Boolean)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "playht", voiceId: "jennifer" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Ask one question at a time from the provided list:
Questions: ${questionList}
Be friendly, concise, and engaging. Provide hints if needed and wrap up after 5-7 questions.
`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);

    // Attach listeners
    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("error", handleVapiError); // ✅ fixed error listener
  };

  // Cleanup listeners on unmount
  useEffect(() => {
    if (interviewInfo) startCall();

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("error", handleVapiError); // ✅ properly remove listener
    };
  }, [interviewInfo]);

  const stopInterview = () => {
    try {
      vapi.stop();
      toast("Interview Ended");
    } catch (err) {
      console.error("Failed to stop Vapi:", err);
    }
  };

  const generateFeedback = async () => {
    try {
      const result = await axios.post('/api/ai-feedback', { conversation });
      const finalContent = result.data.content.replace('```json', '').replace('```', '');
      const { data } = await supabase
        .from('interview-feedback')
        .insert([{
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback: JSON.parse(finalContent),
          recommended: false
        }])
        .select();
      console.log(data);
      router.replace(`/interview/${interview_id}/completed/`);
    } catch (err) {
      console.error("Feedback generation error:", err);
    }
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <TimerComponent isRunning={isRunning} />
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] p-20 rounded-lg border flex flex-col gap-3 items-center justify-center relative'>
          {activeUser === "ai" && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border-4 border-blue-500 opacity-50 animate-ping z-0"></span>
          )}
          <Image src='/ai-avatar.png' alt='ai' width={100} height={100} className='w-[90px] h-[90px] rounded-full object-cover border-2 border-blue-300 shadow-md p-4 bg-blue-100' />
          <h2>AI Voice Agent</h2>
        </div>

        <div className='bg-white h-[400px] p-20 rounded-lg border flex flex-col gap-3 items-center justify-center relative'>
          {activeUser === "user" && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border-4 border-blue-500 opacity-50 animate-ping z-0"></span>
          )}
          <Image src='/useravatar.jpg' alt='user' width={100} height={100} className='w-[90px] h-[90px] rounded-full object-cover border-2 border-blue-300 shadow-md bg-blue-100' />
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
        <Mic className='h-12 w-12 p-3 bg-blue-400 text-white rounded-full cursor-pointer' />
        {!loading ? (
          <Phone className='h-12 w-12 p-3 bg-red-400 text-white rounded-full cursor-pointer' onClick={stopInterview} />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview In Progress ....</h2>
    </div>
  );
}

export default StartInterview;
