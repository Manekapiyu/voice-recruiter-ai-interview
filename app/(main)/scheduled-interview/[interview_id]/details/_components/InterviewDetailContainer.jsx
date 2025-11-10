import React from 'react'


function InterviewDetailContainer ({InterviewDetail}) {
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
      <h2>{InterviewDetail?.jobPosition}</h2>
    </div>
  )
}

export default InterviewDetailContainer
