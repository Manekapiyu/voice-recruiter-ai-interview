import { LayoutDashboard, Calendar, List, WalletCards, Settings } from "lucide-react";

export const SideBarOptions = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'Scheduled Interview',
    icon: Calendar, 
    path: '/scheduled-interview'
  },
  {
    name: 'All Interview',
    icon: List,
    path: '/all-interview'
  },
  {
    name: 'Billing',
    icon: WalletCards,
    path: '/billing'
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings' 
  },
];

import { Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, CrownIcon } from "lucide-react";

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

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.

Your task is to generate ONLY a JSON array of concise, high-quality interview questions for the given role.

DO NOT include explanations, introductions, or any text outside the JSON array.

Job Title: {{jobTitle}}

Job Description:
{{jobDescription}}

Interview Duration: {{duration}}

Interview Type: {{type}}

 Format your response **strictly** as valid JSON:
{
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Experience | Problem Solving | Leadership"
    }
  ]
}

Guidelines:
- Analyze the job description and tailor questions to the {{type}} interview.
- Adjust the number and complexity of questions to fit the {{duration}}.
- Each question should be clear, direct, and relevant to the {{jobTitle}} role.
- Avoid repetition or generic filler questions.
- DO NOT include any text outside the JSON (no comments, no introductions, no explanations).

Goal: Produce a clean, valid JSON list of interview questions suitable for immediate API parsing or UI display.
`;
