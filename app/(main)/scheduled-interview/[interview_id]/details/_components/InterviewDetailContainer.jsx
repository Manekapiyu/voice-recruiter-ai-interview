"use client";

import React from "react";
import { Clock, Calendar, MessageCircle, ArrowLeft } from "lucide-react";
import moment from "moment";
import Link from "next/link";

function InterviewDetailContainer({ interviewDetail }) {
  if (!interviewDetail) {
    return (
      <div className="p-6 bg-white rounded-2xl mt-5 shadow-md border border-blue-100">
        <p className="text-gray-500 text-center">No interview details available.</p>
      </div>
    );
  }

  return (
    <div className="relative p-6 bg-gradient-to-br from-blue-50 to-white text-gray-800 rounded-2xl mt-5 shadow-md border border-blue-100">

      <div className="absolute top-4 right-4">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-blue-700 border border-blue-300 px-3 py-1 rounded-lg hover:bg-blue-900 hover:text-white not-only:transition">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-600">
            {interviewDetail?.jobPosition || "Untitled Role"}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
          <h2 className="text-xs text-gray-500 uppercase mb-1">Duration</h2>
          <div className="flex items-center gap-2 text-blue-700 font-semibold">
            <Clock className="h-4 w-4" />
            {interviewDetail?.duration || "N/A"}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
          <h2 className="text-xs text-gray-500 uppercase mb-1">Created On</h2>
          <div className="flex items-center gap-2 text-blue-700 font-semibold">
            <Calendar className="h-4 w-4" />
            {interviewDetail?.created_at
              ? moment(interviewDetail?.created_at).format("MMM DD, YYYY")
              : "N/A"}
          </div>
        </div>

        {interviewDetail?.type && (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
            <h2 className="text-xs text-gray-500 uppercase mb-1">Type</h2>
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <Clock className="h-4 w-4" />
              {JSON.parse(interviewDetail?.type)[0]}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h2 className="font-semibold text-blue-800 text-lg mb-2">Job Description</h2>
        <p className="text-gray-700 bg-white p-4 rounded-xl border border-blue-100 shadow-sm leading-relaxed">
          {interviewDetail?.jobDescription || "No description provided."}
        </p>
      </div>

    </div>
  );
}

export default InterviewDetailContainer;
