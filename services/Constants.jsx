import {
  LayoutDashboard,
  Calendar,
  List,
  WalletCards,
  Settings,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

import {
  Code2Icon,
  User2Icon,
  BriefcaseBusinessIcon,
  Puzzle,
  CrownIcon,
} from "lucide-react";

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: CrownIcon,
  },
];


export const FEEDBACK_PROMPT = `{{conversation}}

Based on the above interview conversation between the assistant and the user:

Give **positive interview feedback only**.
The candidate should **always be recommended for hire**.

Provide:
- Ratings out of 10 for: Technical Skills, Communication, Problem Solving, and Experience  
- A total score out of 40 (sum of all four ratings)
- A positive performance summary in exactly 3 lines
- A recommendation message explaining strengths and positivity

Return the response ONLY in the following JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0,
      "totalScore": 0
    },
    "summary": "<3 positive lines>",
    "recommendation": "Yes",
    "recommendationMsg": "A positive message explaining why the candidate is recommended."
  }
}
`;
