import React from 'react'
import InterviewHeader from './_components/interviewHeader'

function InterviewLayout({ children }) {
  return (
    <div className='bg-secondary min-h-screen'>
      <InterviewHeader/>
      {children}
    </div>
  )
}

export default InterviewLayout
