import React from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

function Interview() {
  return (
    <div className='p-20 md:px-20 lg:px-30 xl:px-64 mt-5 bg-white'>
      <div className='flex flex-col items-center justify- center border rounded-xl p-4'>
        <div className="flex items-center space-x-3">
          <Image src="/logo.jpg" alt="logo" width={85} height={85} className="rounded-lg" />
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="text-indigo-900">Inter</span>
            <span className="text-blue-400">Vox</span>
          </h1>
        </div>
        <h2 className='mt-2'>AI-Powered Interview Patform</h2>
        <Image src={'/Interview.png'} alt='interview' width={500} height={500}
          className='w-[450px] my -6' />

        <h2 className='font-bold text-xl'>Full Stack Developer Interview</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' />30 Minutes</h2>

        <div className='w-3xl mt-4'>
          <h2>Enter your full name</h2>
          <Input placeholder='e.g. Jeni Smith' />
        </div>

        <div className="flex gap-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl mt-6 shadow-sm w-xl items-center">
          {/* Icon Section */}
          <div className="bg-blue-100 p-3 rounded-full">
            <Info className="text-blue-600 w-6 h-6" />
          </div>

          {/* Text Section */}
          <div className="flex flex-col ">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Before you begin</h2>

            <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Interview