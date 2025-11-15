"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Home, Star } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InterviewComplete({ interviewId }) {
  const [feedback, setFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        let query = supabase.from("interview-feedback").select("*");
        if (interviewId) query = query.eq("interview_id", interviewId).limit(1);
        else query = query.order("created_at", { ascending: false }).limit(1);

        const { data, error } = await query;
        if (error) throw error;
        if (!data || data.length === 0) return;

        const record = data[0];
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
          username: record.userName || "Unnamed Candidate",
          interview_id: record.interview_id || "N/A",
          rating: fb.rating || {},
          summary: fb.summary || fb.summery || "No feedback summary provided.",
          recommendation: fb.recommendation || fb.Recommendation || "No",
          recommendationMsg: fb.recommendationMsg || fb.RecommendationMsg || "No recommendation message.",
        });
      } catch (err) {
        console.error("Error fetching interview feedback:", err.message);
        setErrorMessage(err.message);
      }
    };
    fetchFeedback();
  }, [interviewId]);

  if (errorMessage) return <div className="p-6 text-center text-red-600 font-semibold">{errorMessage}</div>;
  if (!feedback) return null;

  const { username, rating, summary, recommendation, recommendationMsg } = feedback;
  const { technicalSkills = 0, communication = 0, problemSolving = 0, experience = 0 } = rating;

  const totalScore = technicalSkills + communication + problemSolving + experience;
  const ratingValues = [technicalSkills, communication, problemSolving, experience].filter(v => v > 0);
  const average = ratingValues.length > 0 ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1) : "N/A";

  const skills = [
    { label: "Technical Skills", value: technicalSkills, color: "bg-blue-500" },
    { label: "Communication", value: communication, color: "bg-purple-500" },
    { label: "Problem Solving", value: problemSolving, color: "bg-yellow-500" },
    { label: "Experience", value: experience, color: "bg-green-500" },
  ];

  return (
    <div className=" mt-5 max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-200 rounded-3xl shadow-2xl relative overflow-hidden">
      
     
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg bg-gray-50 mb-2">
          <Image src="/logo.png" alt="logo" width={80} height={80} className="object-cover" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-900">
          <span className="text-blue-800">Inter</span>
          <span className="text-blue-400">Vox</span>
        </h1>
        <p className="text-gray-600 mt-1">AI-Powered Interview Platform</p>
      </div>

      {/* Candidate Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 relative z-10">
        <h2 className="text-xl font-bold text-gray-700">Candidate Name: {username}</h2>
        <div className="bg-white px-5 py-2 rounded-2xl shadow-md flex items-center gap-2 font-bold text-lg">
          <Star className="text-yellow-400 w-5 h-5" /> {average} / 10
        </div>
      </div>

      {/* Total Score */}
      <div className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center mb-6 relative z-10">
        <span className="font-semibold text-indigo-700">Total Score</span>
        <span className="font-bold text-gray-900 text-xl">{totalScore} / 40</span>
      </div>

      {/* Skills */}
      <div className="mb-8 relative z-10">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">Skills Evaluation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-gray-700 mb-1 font-medium">
                <span>{skill.label}</span>
                <span>{skill.value}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <motion.div
                  className={`${skill.color} h-3 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.value / 10) * 100}%` }}
                  transition={{ duration: 1 + idx * 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 relative z-10">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Performance Summary</h3>
        <p className="bg-white p-4 rounded-2xl shadow-md text-gray-700 text-sm leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Recommendation */}
      <div
        className={`p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${
          recommendation.toLowerCase() === "yes"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        } relative z-10`}
      >
        <div>
          <h4 className={`font-semibold flex items-center gap-2 mb-1 ${recommendation.toLowerCase() === "yes" ? "text-green-700" : "text-red-700"}`}>
            {recommendation.toLowerCase() === "yes" ? <><CheckCircle className="w-5 h-5" /> Recommended for Hire</> : <><XCircle className="w-5 h-5" /> Not Recommended</>}
          </h4>
          <p className={`text-sm ${recommendation.toLowerCase() === "yes" ? "text-green-700" : "text-red-700"}`}>
            {recommendationMsg}
          </p>
        </div>

        {recommendation.toLowerCase() === "yes" && (
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" /> Proceed to Offer
          </button>
        )}
      </div>

      {/* Dashboard Button */}
      <div className="flex justify-center mt-8 relative z-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
        >
          <Home className="w-5 h-5" /> Go to Dashboard
        </button>
      </div>
    </div>
  );
}
