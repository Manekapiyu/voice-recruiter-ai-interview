import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className=" flex ">
     <Image src="/logo.jpg" alt="logo" width={85} height={85} />
               <h1 className="text-2xl font-semibold tracking-wide ">
                 <span className="text-indigo-900">Inter</span>
                 <span className="text-blue-400">Vox</span>
               </h1>
    </div>
  )
}

export default InterviewHeader