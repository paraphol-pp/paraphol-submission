import mongoose from "mongoose";

export async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    console.log("[DB] MongoDB connected");
    
  } catch (error) {
    console.error("[DB] MongoDB connection failed:", error);
    process.exit(1);
  }
}
