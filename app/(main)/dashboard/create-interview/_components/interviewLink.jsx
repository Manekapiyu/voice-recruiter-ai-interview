import React from 'react'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function InterviewLink (interview_id,formData) {
    const GetInterviewUrl=()=>{
        const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+ interview_id
        return url

    }
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image src={'/check.png'} alt='check'
        width={100}
        height={100}
        className='w-[50px h-[90px]'
        />
        <h2 className='font-bold text-lg mt-4'> Your AI Interview is Ready Now!</h2><br/>
        <p className='mt-3'>Share this link with your candidates to start the interview process</p>

        <div className='w-full p-7 mt-6 rounded-xl bg-gray-100'>
            <div className='flex justify-between items-center '>
                <h2>Interview Link</h2>
                <p className='p-1 px-2  text-primary bg-blue-50'>Valid for 30 Days</p>

                
            </div>
            <div className='mt-3 flex gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disable={true}/>
                    <Button>Copy Link</Button>
                </div>
        </div>
    </div>
  )
}

export default InterviewLink;