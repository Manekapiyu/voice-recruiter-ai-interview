import React from "react";
import { Video  } from "lucide-react";
import { Phone } from "lucide-react";

const CreateOptions = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white boarder border-gray-200 rounded-lg">
        <Video className="p-3 text-primary bg-blue-50 rounded-lg h-14 w-14" />
        <h2>Create New Interview</h2>
        <p>Quickly create and schedule your next AI interview session.</p>
      </div>
      <div className="bg-white boarder border-gray-200 rounded-lg">
        <Phone className="p-3 text-primary bg-blue-50 rounded-lg h-14 w-14" />
        <h2>Create Phone Screening Call</h2>
        <p>Quickly create and schedule your next Phone Screening Call session.</p>
      </div>
    </div>
  );
};

export default CreateOptions;
