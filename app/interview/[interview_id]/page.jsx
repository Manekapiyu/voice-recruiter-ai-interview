"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Clock, Info, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';

function Interview() {

  const{interview_id}= useParams();
  console.log(interview_id)

  useEffect(()=>{
    
  })

  const  GetInterviewDetails=async()=>{
    let { data: Interviews, error } = await supabase
  .from('Interviews')
  .select("jobPosition","jobDescription","duration","type")
  .eq('interview_id', interview_id)
  

  }
  
  return (
    <div className="p-10 md:px-20 lg:px-40 xl:px-64 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center border rounded-2xl p-6 bg-white shadow-md">

        <div className="flex items-center space-x-3">
          <Image src="/logo.jpg" alt="logo" width={85} height={85} className="rounded-lg" />
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

       
        <h2 className="font-bold text-xl text-gray-800">Full Stack Developer Interview</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" /> 30 Minutes
        </h2>

    
        <div className="w-full md:w-2/3 mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Enter your full name</h3>
          <Input placeholder="e.g. Jeni Smith" className="w-full" />
        </div>

        <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl mt-6 shadow-sm w-full md:w-2/3">  
          <div className="bg-blue-100 p-3 rounded-full">
            <Info className="text-blue-600 w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Before you begin</h2>
            <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <Button className="mt-6 w-full font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Video className="w-5 h-5" />
            Join Interview
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Interview
