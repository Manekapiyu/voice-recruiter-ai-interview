"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, User, XCircle } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";

export default function InterviewComplete({ interviewId }) {
  const [feedback, setFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        let query = supabase.from("interview-feedback").select("*");

        if (interviewId) {
          query = query.eq("interview_id", interviewId).limit(1);
        } else {
          query = query.order("created_at", { ascending: false }).limit(1);
        }

        const { data, error } = await query;

        if (error) throw error;
        if (!data || data.length === 0) return;

        const record = data[0];

        // Parse feedback JSON (safe parse)
        let parsedFeedback = record.feedback;
        if (typeof parsedFeedback === "string") {
          try {
            parsedFeedback = JSON.parse(parsedFeedback);
          } catch {
            parsedFeedback = {};
          }
        }

        const fb = parsedFeedback.feedback || {};

        setFeedback({
          username: record.username || "Unnamed Candidate",
          interview_id: record.interview_id || "N/A",
          rating: fb.rating || {},
          summary: fb.summary || "No feedback summary provided.",
          recommendation: fb.Recommendation || "No",
          recommendationMsg: fb.RecommendationMsg || "No recommendation message.",
        });
      } catch (err) {
        console.error("Error fetching interview feedback:", err.message);
        setErrorMessage(err.message);
      }
    };

    fetchFeedback();
  }, [interviewId]);

  // ❌ Don't show "No feedback available" message — just show nothing until data comes
  if (!feedback) return null;

  const {
    userName,
    rating,
    summary,
    recommendation,
    recommendationMsg,
  } = feedback;

  const {
    technicalSkills = 0,
    communication = 0,
    problemSolving = 0,
    experience = 0,
  } = rating;

  const average = (
    (technicalSkills + communication + problemSolving + experience) /
    4
  ).toFixed(1);

  const RatingBar = ({ label, value }) => (
    <div className="flex items-center justify-between gap-3">
      <div className="w-48 text-sm font-medium text-gray-700">{label}</div>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-blue-600 rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        ></div>
      </div>
      <span className="w-10 text-sm font-semibold text-blue-700 text-right">
        {value}/10
      </span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blue-400 shadow-xl rounded-3xl p-4 border border-gray-100 mt-2 ">
      {/* Header */}
       <div className="flex flex-col items-center text-center mb-2 ">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md  bg-gray-50 ">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
                  <span className="text-blue-800">Inter</span>
                  <span className="text-blue-400">Vox</span>
                </h1>
                <p className="text-gray-500 mt-1">AI-Powered Interview Platform</p>
              </div>

      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userName}
          </h1>
        </div>
        <div className="bg-blue-50 text-blue-700 font-bold text-xl rounded-2xl px-6 py-2 border border-blue-300 shadow-sm">
          {average} <span className="text-sm text-gray-500">/10</span>
        </div>
      </div>

      {/* Skills Evaluation Section */}
<div className="mb-8">
  <h2 className="font-semibold text-blue-950 text-lg mb-4">
    Skills Evaluation
  </h2>

  {/* 2-column layout for skills */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
    {/* Technical Skills */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Technical Skills</span>
        <span className="text-blue-600">{technicalSkills}/10</span>
      </div>
      <div className="w-full bg-gray-300 rounded-2xl h-2">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(technicalSkills / 10) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Communication */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Communication</span>
        <span className="text-blue-600">{communication}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(communication / 10) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Problem Solving */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Problem Solving</span>
        <span className="text-blue-600">{problemSolving}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(problemSolving / 10) * 100}%` }}
        ></div>
      </div>
    </div>

    {/* Experience */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Experience</span>
        <span className="text-blue-600">{experience}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-800 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(experience / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  </div>
</div>


      {/* Summary */}
      <div className="mb-8">
        <h2 className="font-semibold text-blue-950 text-lg mb-1">
          Performance Summary
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-300">
          {summary}
        </p>
      </div>

      {/* Recommendation */}
      <div
        className={`p-4 rounded-xl flex items-center justify-between ${
          recommendation === "Yes"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div>
          <h3
            className={`font-semibold flex items-center gap-2 ${
              recommendation === "Yes" ? "text-green-700" : "text-red-700"
            }`}
          >
            {recommendation === "Yes" ? (
              <>
                <CheckCircle className="w-5 h-5" /> Recommended for Hire
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" /> Not Recommended
              </>
            )}
          </h3>
          <p
            className={`text-sm mt-1 ${
              recommendation === "Yes" ? "text-green-700" : "text-red-700"
            }`}
          >
            {recommendationMsg}
          </p>
        </div>

        {recommendation === "Yes" && (
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow transition">
            <CheckCircle className="w-5 h-5" />
            Proceed to Offer
          </button>
        )}
      </div>
    </div>
  );
}
