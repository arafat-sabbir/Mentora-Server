import { Types } from 'mongoose';

export interface TPdfnote {
  title: string;
  pdfUrl: string;
  lectureId: Types.ObjectId; // reference to Lecture
}

