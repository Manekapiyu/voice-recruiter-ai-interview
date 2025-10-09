import React from "react";
import { Video, Phone } from "lucide-react";
import Link from "next/link";

const CreateOptions = () => {
  const options = [
    {
      icon: <Video className="h-10 w-10 text-blue-600" />,
      title: "Create New Interview",
      desc: "Quickly create and schedule your next AI interview session.",
      bg: "from-blue-50 to-white",
      href: "/dashboard/create-interview",
    },
    {
      icon: <Phone className="h-10 w-10 text-green-600" />,
      title: "Create Phone Screening Call",
      desc: "Quickly create and schedule your next Phone Screening Call session.",
      bg: "from-green-50 to-white",
      href: "/dashboard/create-phone-call",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {options.map((opt, i) => (
        <Link
          href={opt.href}
          key={i}
          className={`bg-gradient-to-b ${opt.bg} border border-gray-200 rounded-2xl p-6 flex flex-col items-start gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
        >
          <div className="p-3 bg-white rounded-full shadow-sm">{opt.icon}</div>
          <h2 className="text-lg font-semibold text-gray-800">{opt.title}</h2>
          <p className="text-sm text-gray-500">{opt.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default CreateOptions;
