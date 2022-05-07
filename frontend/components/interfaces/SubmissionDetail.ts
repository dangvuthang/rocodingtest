export interface studentId {
  _id: string;
  fullName: string;
  email: string;
  photoUrl: string;
  role: string;
}

export interface recordId {
  attendanceDate: string;
  evidence: string[];
  numberOfCheats: number;
  testId: string;
  userId: string;
  _id: string;
}
export interface SubmissionDetail {
  _id: string;
  submissionTime: Date;
  content: string;
  testId: string;
  studentId: studentId;
  recordId: recordId;
}
