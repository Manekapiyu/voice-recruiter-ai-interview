"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "@radix-ui/react-progress";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import QuestionListContainer from "./_components/QuestionListContainer";
function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormDate] = useState();
  const onHandleInputChange = (field, value) => {
    setFormDate((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("FormData", formData);
  };

  const onGoToNext = () => {
  if (
    !formData?.jobPosition ||
    !formData?.jobDescription ||
    !formData?.duration ||
    !formData?.type
  ) {
    toast.error("Please enter all details!");
    return;
  }
  setStep(step + 1);
};


  return (
    <div className="mt-10 px-10 ">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <progress
        value={step * 33.33}
        max={100}
        className="my-5 ml-10  w-4xl h-3 rounded-lg overflow-hidden"
      />
      {step == 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={() => onGoToNext()}
        />
      ) : step == 2 ? (
        <QuestionList  formData={formData}/>
      ) : null}
    </div>
  );
}

export default CreateInterview;
