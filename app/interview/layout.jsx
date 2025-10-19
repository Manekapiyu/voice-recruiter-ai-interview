import React from 'react'
import InterviewHeader from './_components/interviewHeader'

function InterviewLayout({ children }) {
  return (
    <div>
      <InterviewHeader/>
      {children}
    </div>
  )
}

export default InterviewLayout
