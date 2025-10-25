"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  //  Generate AI Questions
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      if (!formData || Object.keys(formData).length === 0) {
        throw new Error("Invalid form data.");
      }

      const result = await axios.post("/api/ai-model", formData);

      if (!result?.data?.message) {
        throw new Error("No valid response from AI model.");
      }

      console.log("AI Raw Message:", result.data.message);

      // Format questions from AI response
      const formattedQuestions = result.data.message
        .split(/\n\d+\.\s+/)
        .filter((q) => q.trim() !== "")
        .map((q) => ({
          question: q.trim(),
          type: formData?.type || "General",
        }));

      setQuestionList(formattedQuestions);
    } catch (e) {
      console.error("Error generating questions:", e);
      toast.error("Server Error: Unable to generate questions. Try again!");
    } finally {
      setLoading(false);
    }
  };

  //  Save Interview to Supabase
  const onFinish = async () => {
    if (!questionList.length) {
      toast.error("No questions to save!");
      return;
    }

    setSaveLoading(true);
    try {
      const interview_id = uuidv4();

      const { data, error } = await supabase
        .from("Interviews")
        .insert([
          {
            ...formData,
            questionList,
            userEmail: user?.email,
            interview_id,
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      toast.success("Interview saved successfully!");
      onCreateLink(interview_id);
      console.log("Saved Interview:", data);
    } catch (err) {
      console.error("Error saving interview:", err);
      toast.error(`Error saving interview: ${err.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2 className="animate-spin" />
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
            <Button onClick={onFinish} disabled={saveLoading}>
              {saveLoading && <Loader2 className="animate-spin mr-2" />}
              Create Interview Link and Finish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;
