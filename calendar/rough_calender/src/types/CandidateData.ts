export interface CandidateData {
    id: string;
    jobId: string;
    interviewer: string;
    datetime: string;
    round: string;
    mode: string;
    status: string;
    candidate: {
        name: string;
        email: string;
        avatar: string;
    };
    [key: string]: any;
}
  