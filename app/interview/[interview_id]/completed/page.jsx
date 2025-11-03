"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/services/supabaseClient";

function InterviewComplete({ interviewId }) {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        let query = supabase.from("interview_feedback").select("*");

        // If interviewId given → fetch that one; else → fetch latest record
        if (interviewId) {
          query = query.eq("id", interviewId).single();
        } else {
          query = query.order("created_at", { ascending: false }).limit(1).single();
        }

        const { data, error } = await query;
        if (error) throw error;

        setCandidate(data);
      } catch (err) {
        console.error("Error fetching interview feedback:", err.message);
      }
    };

    fetchCandidate();
  }, [interviewId]);

  if (!candidate) {
    return (
      <div className="text-center mt-20 text-gray-500 font-medium">
        No feedback record found.
      </div>
    );
  }

  // Safely extract fields
  const {
    name = "Unknown Candidate",
    position = "Not Specified",
    technical = 0,
    communication = 0,
    problem_solving = 0,
    experience = 0,
    summary = "No summary provided.",
    recommended = false,
    recommendation_msg = "No recommendation provided.",
  } = candidate;

  const average = (
    (Number(technical) + Number(communication) + Number(problem_solving) + Number(experience)) /
    4
  ).toFixed(1);

  const RatingBar = ({ label, value }) => (
    <div className="flex items-center justify-between gap-3">
      <div className="w-40 text-sm font-medium text-gray-700">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 bg-blue-600 rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        ></div>
      </div>
      <span className="w-10 text-sm font-semibold text-blue-600 text-right">
        {value}/10
      </span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
        <div className="bg-blue-50 text-blue-700 font-bold text-xl rounded-full px-5 py-3 shadow-sm">
          {average} <span className="text-sm text-gray-500">/10</span>
        </div>
      </div>

      {/* Skill Ratings */}
      {(technical || communication || problem_solving || experience) > 0 && (
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-gray-800">Skills Assessment</h2>
          <RatingBar label="Technical Skills" value={technical} />
          <RatingBar label="Communication" value={communication} />
          <RatingBar label="Problem Solving" value={problem_solving} />
          <RatingBar label="Experience" value={experience} />
        </div>
      )}

      {/* Summary */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-2">Performance Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
          {typeof summary === "object" ? JSON.stringify(summary) : summary}
        </p>
      </div>

      {/* Recommendation */}
      <div
        className={`p-4 rounded-xl flex items-center justify-between ${
          recommended
            ? "bg-green-50 border border-green-200"
            : "bg-yellow-50 border border-yellow-200"
        }`}
      >
        <div>
          <h3
            className={`font-semibold ${
              recommended ? "text-green-800" : "text-yellow-800"
            }`}
          >
            {recommended ? "Recommended for Hire" : "Not Recommended"}
          </h3>
          <p
            className={`text-sm mt-1 ${
              recommended ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {typeof recommendation_msg === "object"
              ? JSON.stringify(recommendation_msg)
              : recommendation_msg}
          </p>
        </div>

        {recommended && (
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow transition">
            <CheckCircle className="w-5 h-5" />
            Proceed to Offer
          </button>
        )}
      </div>
    </div>
  );
}

export default InterviewComplete;
