import React from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'

function Interview () {
  return (
    <div className='p-10 md:px-28 lg:px-48 xl:px-64 mt-10'>
      <div className='flex justify- center border rounded-xl'>
        <div className=" flex ">
             <Image src="/logo.jpg" alt="logo" width={85} height={85} />
                       <h1 className="text-2xl font-semibold tracking-wide ">
                         <span className="text-indigo-900">Inter</span>
                         <span className="text-blue-400">Vox</span>
                       </h1>
            </div>


        </div>

  
   </div>
  )
}

export default Interview