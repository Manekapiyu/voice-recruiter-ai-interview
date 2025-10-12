import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("./api/ai-model", {
        ...formData,
      });
      console.log(result.data);
    } catch (e) {
      toast("Server Error,Try Again!");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div>
          <Loader2Icon className="animate-spin" />
          <div>
            <h2></h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
