import mongoose from "mongoose";

export interface TCourse {
  title: string;
  description: string;
  price: number;
  thumbnail: string; // image URL or file path
  createdBy: mongoose.Types.ObjectId; // reference to User (admin)
  isActive: boolean;
}

