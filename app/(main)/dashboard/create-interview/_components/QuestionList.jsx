import React, { useEffect } from 'react'

function QuestionList({formData}) {

  useEffect(() => {
      if (formData){
        GenerateQuestionList();
      }
    }, [formData]);

  const GenerateQuestionList=()=>{
    

  }
  return (
    <div>QuestionList</div>
  )
}

export default QuestionList