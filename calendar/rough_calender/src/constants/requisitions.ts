// export type ApprovalMember = {
//   name: string;
//   status: "Approved" | "Rejected" | "Pending";
//   image: string;
// };

// export type Requisition = {
//   jobTitle: string;
//   location: string;
//   hiringManager: string;
//   requisitionOwner: string;
//   planDate: string;
//   headCount: string;
//   status: "Waiting for Approval" | "Completed" | "Rejected";
//   approvers: ApprovalMember[];
//   hrList: string[]; // ✅ HR list to show in dropdown
// };

// export const requisitions: Requisition[] = [
//   {
//     jobTitle: "Junior Designer",
//     location: "Chennai",
//     hiringManager: "xyz",
//     requisitionOwner: "abc",
//     planDate: "02-05-2025",
//     headCount: "2/3",
//     status: "Waiting for Approval",
//     approvers: [
//       { name: "Ravi", status: "Approved", image: "/avatars/ravi.png" },
//       { name: "Meera", status: "Pending", image: "/avatars/meera.png" },
//     ],
//     hrList: ["Vidhya", "Aparna", "Indrajith"],
//   },
//   {
//     jobTitle: "Senior Engineer",
//     location: "Bangalore",
//     hiringManager: "Ram",
//     requisitionOwner: "Sunil",
//     planDate: "10-06-2025",
//     headCount: "1/2",
//     status: "Completed",
//     approvers: [
//       { name: "Anu", status: "Approved", image: "/avatars/anu.png" },
//       { name: "Ravi", status: "Approved", image: "/avatars/ravi.png" },
//     ],
//     hrList: ["Vidhya", "Indrajith"],
//   },
//   {
//     jobTitle: "Marketing Analyst",
//     location: "Hyderabad",
//     hiringManager: "Priya",
//     requisitionOwner: "Ramesh",
//     planDate: "12-06-2025",
//     headCount: "1/1",
//     status: "Rejected",
//     approvers: [
//       { name: "Sonia", status: "Rejected", image: "/avatars/sonia.png" },
//     ],
//     hrList: ["Aparna"],
//   },
//   {
//     jobTitle: "QA Tester",
//     location: "Pune",
//     hiringManager: "Geetha",
//     requisitionOwner: "Kumar",
//     planDate: "15-06-2025",
//     headCount: "0/2",
//     status: "Waiting for Approval",
//     approvers: [
//       { name: "Sanjay", status: "Pending", image: "/avatars/sanjay.png" },
//     ],
//     hrList: ["Indrajith", "Aparna"],
//   },
//   {
//     jobTitle: "UX Researcher",
//     location: "Delhi",
//     hiringManager: "Divya",
//     requisitionOwner: "Sneha",
//     planDate: "18-06-2025",
//     headCount: "1/1",
//     status: "Completed",
//     approvers: [
//       { name: "Ravi", status: "Approved", image: "/avatars/ravi.png" },
//     ],
//     hrList: ["Vidhya"],
//   },
//   {
//     jobTitle: "Software Intern",
//     location: "Chennai",
//     hiringManager: "Mohan",
//     requisitionOwner: "Devi",
//     planDate: "20-06-2025",
//     headCount: "0/1",
//     status: "Waiting for Approval",
//     approvers: [
//       { name: "Sundar", status: "Pending", image: "/avatars/sundar.png" },
//     ],
//     hrList: ["Indrajith"],
//   },
//   {
//     jobTitle: "Backend Developer",
//     location: "Kochi",
//     hiringManager: "Naveen",
//     requisitionOwner: "Sita",
//     planDate: "22-06-2025",
//     headCount: "1/3",
//     status: "Completed",
//     approvers: [
//       { name: "Meera", status: "Approved", image: "/avatars/meera.png" },
//     ],
//     hrList: ["Aparna", "Vidhya"],
//   },
//   {
//     jobTitle: "Frontend Developer",
//     location: "Noida",
//     hiringManager: "Arjun",
//     requisitionOwner: "Rekha",
//     planDate: "25-06-2025",
//     headCount: "3/3",
//     status: "Rejected",
//     approvers: [
//       { name: "Ramesh", status: "Rejected", image: "/avatars/ramesh.png" },
//     ],
//     hrList: ["Indrajith"],
//   },
//   {
//     jobTitle: "HR Generalist",
//     location: "Mumbai",
//     hiringManager: "Sneha",
//     requisitionOwner: "Lakshmi",
//     planDate: "28-06-2025",
//     headCount: "1/2",
//     status: "Waiting for Approval",
//     approvers: [
//       { name: "Geetha", status: "Pending", image: "/avatars/geetha.png" },
//     ],
//     hrList: ["Aparna", "Vidhya"],
//   },
//   {
//     jobTitle: "DevOps Engineer",
//     location: "Trivandrum",
//     hiringManager: "Karthik",
//     requisitionOwner: "Harini",
//     planDate: "30-06-2025",
//     headCount: "2/2",
//     status: "Completed",
//     approvers: [
//       { name: "Sanjay", status: "Approved", image: "/avatars/sanjay.png" },
//     ],
//     hrList: ["Indrajith", "Aparna"],
//   },
// ];




// export interface ApprovalMember {
//   name: string;
//   status: string;
//   image?: string;
// }

// export interface Requisition {
//   jobTitle: string;
//   location: string;
//   hiringManager: string;
//   requisitionOwner: string;
//   planDate: string;
//   startDate: string;
//   headCount: string;
//   visa: string;
//   skills: string[];
//   experience: string;
//   certifications: string[];
//   status: string;
//   hrName: string; // <- New field to filter dropdown
//   approvers: ApprovalMember[];
// }

// export const requisitions: Requisition[] = [
//   {
//     jobTitle: "Junior Designer",
//     location: "Chennai",
//     hiringManager: "xyz",
//     requisitionOwner: "abc",
//     planDate: "02-05-2025",
//     startDate: "04-05-2025",
//     headCount: "2/3",
//     visa: "Work visa",
//     skills: ["Java", "Angular"],
//     experience: "3+ Years",
//     certifications: ["AWS"],
//     status: "Waiting for Approval",
//     hrName: "Vidhya",
//     approvers: [
//       { name: "Rakesh", status: "Pending" },
//       { name: "Meena", status: "Approved" },
//     ],
//   },
//   {
//     jobTitle: "Senior Developer",
//     location: "Bangalore",
//     hiringManager: "mno",
//     requisitionOwner: "def",
//     planDate: "05-06-2025",
//     startDate: "10-06-2025",
//     headCount: "1/2",
//     visa: "H1B",
//     skills: ["React", "Node.js"],
//     experience: "5+ Years",
//     certifications: ["GCP"],
//     status: "Completed",
//     hrName: "Aparna",
//     approvers: [
//       { name: "Suresh", status: "Approved" },
//       { name: "Deepa", status: "Rejected" },
//     ],
//   },
//   {
//     jobTitle: "DevOps Engineer",
//     location: "Hyderabad",
//     hiringManager: "pqr",
//     requisitionOwner: "ghi",
//     planDate: "01-07-2025",
//     startDate: "10-07-2025",
//     headCount: "0/1",
//     visa: "Work visa",
//     skills: ["Docker", "Kubernetes"],
//     experience: "4+ Years",
//     certifications: ["Azure"],
//     status: "Open",
//     hrName: "Indrajith",
//     approvers: [
//       { name: "Bhavya", status: "Pending" },
//     ],
//   },
//   // Add more data if needed
// ];




// // src/constants/requisitions.ts

export type ApprovalStatus = "Approved" | "Rejected" | "Waiting";

export interface ApprovalMember {
  name: string;
  status: ApprovalStatus;
  image: string; // Add image URL here
}

export interface Requisition {
  jobTitle: string;
  location: string;
  status: "Waiting for Approval" | "Completed" | "Rejected";
  hiringManager: string;
  requisitionOwner: string;
  planDate: string;
  headCount: string;
  contractType: string;
  plannedStartDate: string;
  reason: string;
  experience: string;
  visa: string;
  certifications: string;
  skills: string;
  approvers: ApprovalMember[];
}

export const requisitions: Requisition[] = [
  {
    jobTitle: "Junior Designer",
    location: "Chennai",
    status: "Waiting for Approval",
    hiringManager: "xyz",
    requisitionOwner: "abc",
    planDate: "02-05-2025",
    headCount: "2/3",
    contractType: "Full-time",
    plannedStartDate: "04-05-2025",
    reason: "Expansion",
    experience: "3+ Years",
    visa: "Work visa",
    certifications: "AWS",
    skills: "Java, Angular",
    approvers: [
      { name: "Vidhya", status: "Approved", image: "https://i.pravatar.cc/150?u=venkatesh" },
      { name: "Aparna", status: "Rejected", image: "https://i.pravatar.cc/150?u=srini" },
      { name: "Indrajith", status: "Waiting", image: "https://i.pravatar.cc/150?u=zaki" },
    ],
  },
  {
    jobTitle: "UI Developer",
    location: "Bangalore",
    status: "Completed",
    hiringManager: "Aarti",
    requisitionOwner: "Sunil",
    planDate: "10-06-2025",
    headCount: "1/2",
    contractType: "Contract",
    plannedStartDate: "15-06-2025",
    reason: "Backfill",
    experience: "2+ Years",
    visa: "Not Required",
    certifications: "Figma",
    skills: "React, Tailwind",
    approvers: [
      { name: "Aditi", status: "Approved", image: "https://i.pravatar.cc/150?u=aditi" },
      { name: "Dev", status: "Approved", image: "https://i.pravatar.cc/150?u=dev" },
    ],
  },
  {
    jobTitle: "Backend Engineer",
    location: "Hyderabad",
    status: "Rejected",
    hiringManager: "Ravi",
    requisitionOwner: "Kiran",
    planDate: "20-07-2025",
    headCount: "0/1",
    contractType: "Full-time",
    plannedStartDate: "01-08-2025",
    reason: "New Project",
    experience: "5+ Years",
    visa: "Work visa",
    certifications: "Java, Spring",
    skills: "Java, Microservices, MySQL",
    approvers: [
      { name: "Rekha", status: "Rejected", image: "https://i.pravatar.cc/150?u=rekha" },
      { name: "Aman", status: "Waiting", image: "https://i.pravatar.cc/150?u=aman" },
    ],
  },
];