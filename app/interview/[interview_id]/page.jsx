import React from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { List, TypeOutline, Clock} from "lucide-react";

function Interview () {
  return (
    <div className='p-10 md:px-28 lg:px-48 xl:px-64 mt-5'>
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
        className='w-[450px] my -6'/>

        <h2 className='font-bold text-xl'>Full Stack Developer Interview</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>30 Minutes</h2>
        </div>


  
   </div>
  )
}

export default Interview