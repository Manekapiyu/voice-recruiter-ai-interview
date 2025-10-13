import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const[questionList,setQuestionList]=useState();

  useEffect(() => {
    if (formData) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const result = await axios.post("/api/ai-model", { ...formData });

          console.log(result.data.content);
          const Content=JSON.parse(result.data.content);
          setQuestionList(Content);
          setLoading(false);


        } catch (e) {
          toast.error("Server Error, Try Again!");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [formData]);

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
