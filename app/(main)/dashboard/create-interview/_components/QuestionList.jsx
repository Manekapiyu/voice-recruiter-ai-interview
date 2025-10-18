import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/provider";
import { supabase } from "services/supabaseClient";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });
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
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        { ...formData, questionList: questionList, userEmail: user?.email },
      ])
      .select();

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
            <Button onClick={onFinish}>Finish</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;
