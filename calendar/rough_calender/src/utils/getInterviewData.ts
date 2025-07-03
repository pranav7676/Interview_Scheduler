// src/utils/getInterviewData.ts
import data from '../constants/data.json';

interface Interview {
  id: string;
  candidate: {
    name: string;
    email: string;
    avatar: string;
  };
  jobId: string;
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  workMode: string;
  experience: string;
  salary: string;
  phone: string;
  location: string;
  skills: string[];
  interviewer: string;
  datetime: string;
  round: string;
  mode: string;
  status: string;
}

// Group interviews by date
export const interviewData: Record<string, Interview[]> = data.reduce(
  (acc: Record<string, Interview[]>, interview: Interview) => {
    const dateKey = interview.datetime.split('T')[0]; // "YYYY-MM-DD"
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(interview);
    return acc;
  },
  {}
);
