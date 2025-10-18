import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function QuestionListContainer({ questionList }) {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl text-gray-800">Generated Interview Questions</h2>

      <div className="space-y-5">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="relative border-l-4 border-blue-500 bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
          >
            {/* Small timestamp top right */}
            <span className="absolute top-3 right-4 text-xs text-gray-400">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>

            {/* Question content */}
            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`### Q${index + 1}: ${item.title || ""}\n\n${item.question}`}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
