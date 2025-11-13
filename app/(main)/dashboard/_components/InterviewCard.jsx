"use client";
import React from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Copy, ArrowRight, Users, Clock, Calendar, Link as LinkIcon } from "lucide-react"; 
import Link from "next/link"; 
function InterviewCard({ interview, viewDetail = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Interview link copied!");
  };

  return (
    <div className="group relative mt-2 mb-2 pb-4 mr-2 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-200 hover:border-blue-300 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 text-blue-700 rounded-xl font-semibold">
            <span>{moment(interview?.created_at).format("DD")}</span>
            <span className="text-xs">{moment(interview?.created_at).format("MMM")}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
              {interview?.jobPosition || "Untitled Role"}
            </h2>
            <p className="text-sm text-gray-500">
              {moment(interview?.created_at).format("YYYY")}
            </p>
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copyLink}
        >
          <Copy className="w-4 h-4 text-blue-600" />
        </Button>
      </div>

      <div className="my-3 border-t border-gray-200"></div>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Duration: {interview?.duration || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span>{interview["interview-feedback"]?.length || 0} Candidates</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>Created: {moment(interview?.created_at).fromNow()}</span>
        </div>
      </div>

      <div className="mt-5">
        {viewDetail ? (
          <Button
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white"
            onClick={copyLink}
          >
            <Copy className="w-4 h-4" />
            Copy Interview Link
          </Button>
        ) : (
          
          <Link href={`/scheduled-interview/${interview?.interview_id}/details`}>
            <Button
              className="w-full flex items-center justify-center gap-2 bg-blue-200 text-blue-700 border-blue-400 hover:bg-blue-900 hover:text-white"
              variant="outline"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
