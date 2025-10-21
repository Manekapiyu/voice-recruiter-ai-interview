"use client";

import React, { useState } from "react";  
import InterviewHeader from "./_components/interviewHeader";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState(null);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div className="bg-secondary min-h-screen">
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  );
}

export default InterviewLayout;
