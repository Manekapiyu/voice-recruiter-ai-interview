"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient"; // ✅ corrected import path
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData ,onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading,setSaveLoading]=useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  // ✅ Generate AI Questions
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", formData);

      if (!result?.data?.message) {
        throw new Error("No valid response from AI model.");
      }

      console.log("AI Raw Message:", result.data.message);

      const message = result.data.message;

      // Split message into questions (basic parsing)
      const formattedQuestions = message
        .split(/\n\d+\.\s+/)
        .filter((q) => q.trim() !== "")
        .map((q) => ({ question: q.trim(), type: formData?.type || "General" }));

      setQuestionList(formattedQuestions);
    } catch (e) {
      console.error("Error:", e);
      toast.error("Server Error, Try Again!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveloading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
      setSaveLoading(false);

      onCreateLink({
        interview_id,
      })

    console.log(data);

    if (error) toast.error(`Error saving interview: ${error.message}`);
    else toast.success("Interview saved successfully!");
  };

  return (
    <div>
      {loading ? (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      ) : (
        <>
          {questionList.length > 0 && (
            <QuestionListContainer questionList={questionList} />
          )}
          <div className="mt-10 flex justify-end">
            <Button onClick={()=>onFinish()} disable={saveLoading}>
              {saveLoading&&<Loder2 className='animate-spin'/>}
              Create Interview Link and Finish</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;
