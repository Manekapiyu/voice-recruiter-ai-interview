"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Home } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InterviewComplete({ interviewId }) {
  const [feedback, setFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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
          summary: fb.summary || fb.summery || "No feedback summary provided.",
          recommendation:
            fb.recommendation || fb.Recommendation || "No",
          recommendationMsg:
            fb.recommendationMsg || fb.RecommendationMsg || "No recommendation message.",
        });
      } catch (err) {
        console.error("Error fetching interview feedback:", err.message);
        setErrorMessage(err.message);
      }
    };

    fetchFeedback();
  }, [interviewId]);

  if (!feedback) return null;

  const { username, rating, summary, recommendation, recommendationMsg } = feedback;

  const {
    technicalSkills = 0,
    communication = 0,
    problemSolving = 0,
    experience = 0,
  } = rating;

  const ratingValues = [technicalSkills, communication, problemSolving, experience].filter(
    (v) => v > 0
  );
  const average =
    ratingValues.length > 0
      ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
      : "N/A";

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blue-400 shadow-xl rounded-3xl p-4 border border-gray-100 mt-2">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-2">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md bg-gray-50">
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
        </div>
        <div className="bg-blue-50 text-blue-700 font-bold text-xl rounded-2xl px-6 py-2 border border-blue-300 shadow-sm">
          {average} <span className="text-sm text-gray-500">/10</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-blue-950 text-lg mb-4">Skills Evaluation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {["Technical Skills", "Communication", "Problem Solving", "Experience"].map(
            (label, idx) => {
              const value =
                label === "Technical Skills"
                  ? technicalSkills
                  : label === "Communication"
                  ? communication
                  : label === "Problem Solving"
                  ? problemSolving
                  : experience;
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>{label}</span>
                    <span className="text-blue-600">{value}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-800 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(value / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-blue-950 text-lg mb-1">Performance Summary</h2>
        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-300">
          {summary}
        </p>
      </div>

      <div
        className={`p-4 rounded-xl flex items-center justify-between ${
          recommendation.toLowerCase() === "yes"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div>
          <h3
            className={`font-semibold flex items-center gap-2 ${
              recommendation.toLowerCase() === "yes" ? "text-green-700" : "text-red-700"
            }`}
          >
            {recommendation.toLowerCase() === "yes" ? (
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
              recommendation.toLowerCase() === "yes" ? "text-green-700" : "text-red-700"
            }`}
          >
            {recommendationMsg}
          </p>
        </div>

        {recommendation.toLowerCase() === "yes" && (
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow transition">
            <CheckCircle className="w-5 h-5" />
            Proceed to Offer
          </button>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
        >
          <Home className="w-5 h-5" />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
