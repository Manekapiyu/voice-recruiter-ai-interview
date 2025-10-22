"use client";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormContainer({ onHandleInputChange ,GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const exists = interviewType.includes(type.title);
    if (!exists) {
      setInterviewType((prev) => [...prev, type.title]);
    } else {
      const updated = interviewType.filter((item) => item !== type.title);
      setInterviewType(updated);
    }
  };

  return (
    <div className="p-6 m-5 bg-blue-50/40 rounded-lg shadow-sm">
      {/* Job Position */}
      <div>
        <h2 className="text-base font-medium text-gray-900">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-base font-medium text-gray-900">Job Description</h2>
        <Textarea
          placeholder="Enter detailed job description"
          className="h-[200px] mt-2 "
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-base font-medium text-gray-900">
          Interview Duration
        </h2>
        <Select onValueChange={(value) => onHandleInputChange("duration", value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 Min</SelectItem>
            <SelectItem value="15">15 Min</SelectItem>
            <SelectItem value="30">30 Min</SelectItem>
            <SelectItem value="45">45 Min</SelectItem>
            <SelectItem value="60">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-6">
        <h2 className="text-base font-medium text-gray-900 mb-2">
          Interview Type
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-100/50 transition ${
                interviewType.includes(type.title) &&
                "bg-blue-50 text-primary border-blue-400"
              }`}
              onClick={() => AddInterviewType(type)} // ✅ uses toggle handler
            >
              <type.icon className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                {type.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex justify-end" onClick={()=>GoToNext()}>
        <Button>
          Generate Question <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
