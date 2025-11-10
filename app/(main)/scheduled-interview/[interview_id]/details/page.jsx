"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUser } from "@/app/provider";
import InterviewDetailContainer from './_components/InterviewDetailContainer';

function InterviewDetail () {
    const { interview_id}= useParams();
    const {user} = useUser();
    const[interviewDetail,setInterviewDetail]= useState();

    useEffect(()=>{
         user&&GetInterviewDetails()
  },[user])

    const GetInterviewDetails = async()=>{
         const result = await supabase
              .from("Interviews")
              .select("jobPosition, duration, interview_id, interview-feedback(userEmail)")
               .eq("userEmail", user?.email)
              .eq('interview_id', interview_id)

              setInterviewDetail(result?.data[0])

              console.log(result);
              
    }

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail}/>
    </div>
  )
}

export default InterviewDetail
